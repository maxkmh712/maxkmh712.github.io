---
layout: single
title: "[ PROJECT ] AI 포토부스 서비스 구조와 사용 기술"
typora-root-url: ../
categories: [PROJECT]
tag: [redis, AWS SQS]
author_profile: true # 연락처 정보 숨기기
search: true
toc: true
---

![real-photobooth](/images/2024-09-10-photobooth-structure/real-photobooth.png)

## 1. AI 포토부스 서비스 비즈니스 로직

이전 회사에서 마지막으로 진행했던 프로젝트였던 만큼 애착이 가기도 했고 간단하지만 중요한 기술들이 꽤 쓰였던 프로젝트여서 구조를 복기하면서 사용했던 기술에 대해 다시 한 번 학습해보고자 한다. 먼저 비즈니스 로직은 다음과 같다.

1. 사용자가 포토부스에서 결제를 하면 프론트는 즉시 프록시 서버에 결제된 AI 필터 이미지 변환 `사전 요청`을 보낸다.
2. 프록시 서버는 필터에 맞는 EC2 인스턴스를 켜놓는다.
3. 사용자가 포토부스에서 이제 사진을 찍으면 프론트는 이 변환할 사진을 S3에 직접 업로드한다.
4. 프론트는 1에서 보낸 `사전 요청`의 리턴값을 바탕으로 다시 프록시 서버에 AI 필터 이미지 변환 `본 요청`을 보낸다.
5. 그럼 프록시 서버는 이미지 변환 작업 목록을 필터별 SQS로 전송한다.
6. AI를 생성하는 제너레이터 서버는 각각 필터에 맞는 큐를 읽어서 이미지를 변환한다.
7. 제너레이터 서버는 이미지 변환을 완료하면 그 결과물을 S3에 업로드한다.
8. 또한 제너레이터는 이미지 변환을 완료한 사실을 redis를 통해 publish한다.
9. 프록시 서버는 redis의 특정 채널면 subscribe하여 메세지를 조회하여 완료된 사실을 인지한다.
10. 마지막으로 프록시 서버는 이미지 변환 결과값을 프론트에 전달한다.

## 2. 주된 사용 기술 및 스택

1. Proxy 서버로서의 AWS EC2

   - Client에서 직접적으로 요청을 보내는 서버
   - Client에서 받은 요청을 DB에 저장 및 Generator로 넘겨주는 역할
   - Client가 결제 완료 후 보내는 요청에 따라 Generator의 인스턴스를 키는 역할
   - Generator가 이미지 변환 완료 이후 Generator의 인스턴스를 끄는 역할
   - 이미지 변환 완료 이후 변환된 결과물을 Client에 내려줌

2. AWS SQS

   - 이미지 변환 요청 큐를 저장
   - Generator에서 SQS에 쌓인 변환 요청 큐를 순서대로 처리
   - Proxy Server가 Client에서 이미지 변환 요청을 받으면 SQS에 메세지 추가
   - Generator가 SQS를 Polling 하고 있고, 새 메세지가 있을 경우 이미지 변환 처리 시작

3. AI 이미지 변환 Generator 서버로서의 AWS EC2

   - generator는 SQS의 메시지를 consume하여 이미지 변환을 수행하는 EC2 Instance
   - SQS는 long polling 방식으로 구현되어 있으며, generator는 메시지가 queue에 있으면 바로 receive하여 처리 시작
   - 메시지를 receive하면, 해당 메시지는 다른 consumer가 못읽는 상태가 됨 (in flight)
     - visibility timeout이 기본적으로 있고, 해당 시간동안 delete되지 않으면 다시 visible한 상태가 됨.
   - generator는 GPU를 사용하고 인프라 비용이 비싸서 평소 Stop되어 있다가 Proxy Server에 의해 켜고 끈다.
   - 각 컨셉별로 스펙이 달라서 비용 최적화를 위해 다른 스펙의 인스턴스 사용 ⇒ 클라우드 환경에서는 컨셉별로 인스턴스가 다름
     - 각자 다른 queue에서 메시지를 읽어와서 처리하도록 분리
     - 업체별 인프라 분리를 위해 다른 queue 사용
     - 환경별, 업체별, 이미지 컨셉별로 SQS 큐 하나를 사용하는 형태
   - 이미지 변환 완료 후 새로운 요청이 없다면 5분 뒤에 꺼진다.
   - 변환 완료된 이미지를 S3에 저장한다.
   - 또한, 완료된 정보를 redis를 통해 publish 한다.

4. AWS S3

   - private bucket에 이미지 저장

   - 클라이언트 단에서 프록시 서버를 거쳐서 S3 bucket에 업로드 할 경우 비효율적이라고 판단하여 직접 이미지를 업로드하고 조회할 수 있도록 구현
   - 이때 presigned URL을 사용해서 클라이언트는 이 주소만 프록시서버에서 받는 것으로 설계

5. redis

   - 레디스 사용 이유 : 제너레이터가 이미지 변환을 완료했을때 proxy 서버가 이를 알 수 있는 방법은 크게 아래와 같이 2가지가 있었다.

     1. 프록시에서 제너레이터를 읽는 방법
     2. 제너레이터에서 프록시에게 알림을 주는 방법이었다.

     첫번째 방법의 경우 폴링과 같은 기술을 써야하는데, 이는 좋지 않은 방법이라고 판단했고, 그래서 두번째 방법을 선택했다. 이미지 변환 요청이 들어오고, SQS에 이미지 변환 요청 메세지를 추가하면 제너레이터가 SQS를 폴링하고 있다가 메세지 수신 후 이미지 변환한다. 제너레이터가 이미지 변환을 완료하면 redis에 처리 완료메세지를 pub한다 ([redis pub/sub 기능](https://lucas-owner.tistory.com/60)) 프록시 서버는 해당 requestId에 해당하는 redis를 sub 하고 있다가 메세지를 받아서 client에 응답을 내려준다.

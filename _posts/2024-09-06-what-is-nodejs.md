---
layout: single
title: "[ NODE.JS ] Node.js란 무엇인가?"
typora-root-url: ../
categories: [📌 NODE.JS]
tag: [Node.js, 비동기 I/O, 이벤트기반, 싱글스레드, NPM, V8엔진]
author_profile: false # 연락처 정보 숨기기
sidebar: # 사이드바 네이게이션 수정
  # nav: "docs" # /_data/navigation.yml의 docs를 의미
  nav: "counts"
search: true

---

![node](/images/2024-09-06-first/node-5622136.png)

## 1. Node.js란?

- Node.js는 Javascript를 브라우저 밖에서도 실행할 수 있게 만들어주는 서버이자 Javascript 런타임 환경이다.
- Javascript가 원래 웹 브라우저에서만 동작하던 언어였지만, Node.js 덕분에 서버에서도 Javascript를 사용할 수 있게 되었다.
- Node.js는 `비동기`와 `이벤트` 기반 프로그래밍 모델을 활용하여 빠르고 확장 가능한 애플리케이션을 만들 수 있도록 도와준다.
- Node.js는 `Chrome V8 Javascript 엔진`을 기반으로 하며, C++로 작성된 런타임 환경을 제공해준다.



## 2. Node.js의 중요 개념들

1. 비동기 I/O (Asynchronous I/O)
   - Node.js는 비동기 I/O 방식을 사용하여 서버가 블로킹 없이 작업을 처리할 수도 있도록 해주며, 다수의 I/O 작업을 동시에 처히할 수 있게 해준다.

2. 이벤트 기반 (Event-driven)

   - Node.js는 이벤트 기반 아키텍처를 사용하여 서버가 발생하는 여러 이벤트에 반응할 수 있게 한다.
   - Node.js의 이벤트 기반 모델은 주로 이벤트 루프(Event Loop)와 이벤트 처리기(Event Handler)를 통해 작동한다.
   - 이벤트 루프를 통해 비동기 작업을 관리하고 실행하는데, 작업이 완료되면 등록된 콜백 함수를 호출하여 특정 이벤트에 반응하는 형태로 동작한다.

3. 싱글 스레드 (Single-threaded)

   - Node.js는 싱글 스레드로 동작하지만, 비동기 I/O와 이벤트 루프를 활용하여 동시에 여러 작업을 처리할 수 있다.
   - 보통 서버는 멀티스레드 기반의 동기 방식을 사용하는데, Node.js는 싱글 스레드 기반의 비동기 방식을 사용한다.
   - Node.js는 내부적으로 libuv라는 라이브러리를 사용하여 비동기 I/O 작업을 멀티스레드로 처리할 수 있는 구조를 제공한다

4. NPM (Node Package Manager)

   - NPM은 세계에서 가장 큰 패키지 레지스트리 중 하나로, 오픈 소스 패키지를 쉽게 설치하고 관리할 수 있게 해준다.
   - NPM으로 의존성 관리, 버전 관리 등 패키지와 관련된 다양한 기능을 제공하여 개발 환경을 효율적으로 유지할 수 있게 해준다.

5. V8 엔진

   - Node.js는 구글의 V8 엔진을 사용하여 Javascript를 컴파일 하여 머신 코드로 변환하고, 매우 빠르게 실행한다.
   - V8 엔진은 C++로 작성되었고, Node.js가 Javascript를 서버 측에서 고속으로 처리할 수 있도록 지원한다.

6. 모듈 시스템 (CommonJS)

   - Node.js는 CommonJS 모듈 시스템을 사용하여 코드의 모듈화를 지원한다.
   - 모듈 시스템은 코드를 작은 단위로 나누어 관리할 수 있게 하며, 각 모듈은 독립적으로 작동하면서도 서로 필요한 기능을 공유할 수 있다.

   

## 3. Node.js의 장점

1. 비동기 및 이벤트 기반 아키텍처
   - Node.js는 비동기 I/O와 이벤트 기반 처리를 통해 작업을 빠르게 처리하고, 동시에 많은 클라이언트 요청을 효율적으로 관리할 수 있다.
   - 이벤트 루프가 비동기 작업을 처리하므로 블로킹이 발생하지 않고, 서버의 응답 속도가 빠르다
2. 빠른 실행 속도
   - Node.js는 구글의 V8 JavaScript 엔진 위에서 동작하며, 이 엔진은 JavaScript를 기계어로 빠르게 컴파일하여 실행 속도를 극대화한다
   - 서버의 응답 시간이 빠르고, 대규모 트래픽 처리에서도 좋은 성능을 유지할 수 있다
3. 같은 언어로 프론트엔드와 백엔드 개발
   -  Node.js는 JavaScript를 사용하므로 프론트엔드와 백엔드 모두 동일한 언어로 개발할 수 있다는 점에서, 전체 스택의 개발 프로세스가 빨라지고, 코드의 일관성과 재사용성이 증가한다.
4. 높은 확장성
   - Node.js는 비동기 처리와 가벼운 스레드 모델 덕분에 수많은 클라이언트 요청을 효과적으로 처리할 수 있으며, 멀티플 마이크로서비스 구조에도 적합하다.
5. 실시간 애플리케이션에 적합 
   - Node.js는 실시간으로 데이터를 주고받아야 하는 애플리케이션에서 뛰어난 성능을 제공하고, WebSocket과 같은 양방향 통신을 자연스럽게 처리할 수 있다.
6. 가벼운 서버와 빠른 시작
   - Node.js는 가벼운 런타임 환경을 제공하며, 서버가 매우 빠르게 시작할 수 있다. 이는 CI/CD 파이프라인에서도 유리하며, 서버 시작 시간에 민감한 환경에서 큰 장점이 될 수 있다.
   - 빠른 시작과 종료로 인해 개발, 테스트, 배포 과정이 효율적이고, 리소스 소비가 적은 편이다
7. JSON과의 뛰어난 호환성
   - Node.js는 JavaScript 기반이기 때문에 JSON 데이터 형식과 자연스럽게 호환되기 때문에 RESTful API와의 데이터 교환에 유리하다.
   - 데이터를 서버와 클라이언트 간에 쉽게 주고받을 수 있어, 특히 API 개발에서 유용
8. 스트리밍 데이터 처리에 강함
   - Node.js는 요청-응답 객체를 스트림으로 취급하여 파일을 스트리밍하는 등의 작업을 효율적으로 수행할 수 있다.
   - 대용량 데이터를 처리하거나, 스트리밍 애플리케이션을 구축할 때 성능을 극대화할 수 있다.

## 4. Node.js의 단점

1. 싱글 스레드의 한계
   - Node.js는 기본적으로 싱글 스레드로 동작하며, 이벤트 루프와 비동기 I/O를 통해 동시성을 관리한다.
   - 이 구조는 I/O 처리에는 매우 효율적이지만, CPU를 많이 사용하는 작업에는 취약하다. 복잡한 연산이나 블로킹 연산이 발생하면 전체 서버의 성능에 부정적인 영향을 미칠 수 있다.
   - CPU 집약적인 작업이 많은 애플리케이션에서는 성능이 저하될 수 있으며, 멀티스레드 환경에서의 병렬 처리가 필요할 경우 Node.js는 최선의 선택이 아니다.
2. 콜백 지옥 (Callback Hell) 및 비동기 코드 관리 어려움
   - Node.js는 비동기 처리로 인해 콜백 패턴을 많이 사용한다. 
   - 잡한 비동기 로직을 처리할 때, 중첩된 콜백 함수들이 많아지면 코드의 가독성이 떨어지고, 유지보수가 어려워지는 이른바 "콜백 지옥" 문제가 발생할 수 있다. 
   - 코드가 비직관적으로 변하고, 디버깅이나 에러 처리가 복잡해질 수 있다.
   - 이 문제는 `async/await`이나 `Promise`를 사용하여 어느 정도 해결할 수 있지만, 여전히 비동기 코드의 복잡성은 높은 편이다.
3. 상대적으로 낮은 성능의 멀티스레딩
   - Node.js는 기본적으로 싱글 스레드이지만, 멀티스레드 작업을 지원하는 `worker_threads` 모듈이 있긴하다. 그러나 이 기능은 Java, Go 등 전통적인 멀티스레드 언어에 비해 상대적으로 성능이 낮고 복잡하게 구현된다.
4. 중복된 작업 처리
   - Node.js의 비동기 처리 모델은 이벤트 루프에 크게 의존하며, 작업이 큐에 쌓이는 구조이다. 이로 인해 큐가 과부하가 될 경우 응답 지연이나 성능 저하가 발생할 수 있다.
   - 대규모 트래픽이 몰리거나 작업량이 급증할 때 성능 문제가 발생할 수 있어, 서버가 일관된 성능을 유지하기 어렵다.
5. 타입 안정성 부족
   - Node.js는 JavaScript 기반이기 때문에 정적 타입 언어의 타입 안정성이 부족하여 대규모 애플리케이션 개발 시 버그가 발생하기 쉽고, 유지보수가 어려워질 수 있다.
   - TypeScript를 사용하여 타입 안정성을 강화할 수 있지만, 기본적으로 JavaScript의 동적 타이핑의 한계가 존재한다.



## 5. Node.js 사용이 권장되는 서비스

1. 실시간 애플리케이션 (Real-time Applications)
   - 이유 : Node.js의 이벤트 기반 비동기 처리는 빠른 응답 시간을 요구하는 실시간 애플리케이션에 매우 적합하다. 웹소켓과 같은 양방향 통신이 필요할 때 특히 유리하다.
   - 예시 : 채팅 앱, 실시간 협업 도구, 게임 서버 등
2. API 서버 및 마이크로서비스 (API Servers & Microservices)
   - 이유 : Node.js는 비동기 I/O와 경량 구조 덕분에 요청을 빠르게 처리하며, 많은 수의 동시 연결을 효율적으로 관리할 수 있다.
   - 예시 : RESTful API, GraphQL 서버, 소규모 서비스 간의 통신 등
3. 데이터 스트리밍 애플리케이션 (Data Streaming Applications)
   - 이유 : Node.js는 큰 데이터를 작은 청크로 나누어 전송하는 스트리밍 방식에 최적화되어 있어, 데이터 스트리밍 시 효율적이다.
   - 예시 : 파일 전송 서비스, 비디오 스트리밍.
4. IoT 애플리케이션 (Internet of Things)
   - 이유 : Node.js는 경량성과 비동기 특성을 활용하여 IoT 기기와의 통신을 효율적으로 처리한다.
   - 예시 : 센서 데이터 수집 서버, 스마트 디바이스 관리.



## 6. Node.js 사용이 권장되지 않는 서비스

1. CPU 집약적인 작업 (CPU-Intensive Tasks)
   - 이유 : Node.js는 싱글 스레드로 동작하기 때문에 CPU를 많이 사용하는 작업에서는 성능이 저하될 수 있다. 이러한 작업은 멀티스레드 지원이 강력한 Python, C++, Java와 같은 언어가 더 적합하다.
   - 예시 : 이미지 또는 비디오 처리, 복잡한 수학적 계산, 머신 러닝 모델 훈련.
2. 복잡한 트랜잭션이 많은 대규모 시스템 (Complex, High-Volume Transaction Systems)
   - 이유 : 싱글 스레드로 동작하기 때문에 트랜잭션이 복잡하거나 보안이 중요한 환경에서 성능이 떨어질 수 있다. Java와 같은 언어는 강력한 멀티스레드 관리와 트랜잭션 관리 기능을 제공하여 이러한 시스템에 더 적합하다.
   - 예시 : 은행 시스템, 대규모 결제 처리 시스템.
3. 대규모 파일 처리 및 버퍼링이 필요한 애플리케이션 (Large File Processing & Buffering)
   - 이유 : Node.js는 비동기 I/O를 사용하지만, 대규모 파일을 처리할 때 메모리 사용이 비효율적일 수 있다. 이러한 작업에는 Rust, C++와 같은 저수준 언어가 더 효율적이다.
   - 예시 : 비디오 인코딩, 대용량 파일 업로드 서버
4. 복잡한 멀티스레드 작업이 필요한 경우 (Complex Multithreaded Workloads)
   - 이유 : Node.js는 기본적으로 싱글 스레드로 동작하기 때문에 복잡한 멀티스레드 작업이 필요한 경우, Java, Go, C++ 등의 멀티스레드 관리가 강력한 언어가 더 적합하다.
   - 예시 : 병렬 처리, 고성능 데이터 분석.
5. 블로킹 작업이 많은 서비스 (Services with Heavy Blocking Operations)
   - 이유 : Node.js의 비동기 특성이 무색해질 정도로 블로킹 작업이 많다면, 서버 전체 성능이 저하될 수 있다.
   - 예시 : 동기식 데이터베이스 호출, 블로킹 파일 I/O.
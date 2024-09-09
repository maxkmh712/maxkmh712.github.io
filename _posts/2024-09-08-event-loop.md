---
layout: single
title: "[ NODE.JS ] Node.js 구조와 동작원리"
typora-root-url: ../
categories: [📌 NODE.JS]
tag: [V8엔진, Libuv, 이벤트루프, 이벤트큐]
author_profile: false # 연락처 정보 숨기기
sidebar: # 사이드바 네이게이션 수정
  # nav: "docs" # /_data/navigation.yml의 docs를 의미
  nav: "counts"
search: true
---

![node_js_event_loop_system_328ebcac21](/images/2024-09-08-event-loop/node_js_event_loop_system_328ebcac21.webp)

## 1. Node.js 구조

1. V8 엔진

   - 역할 : Node.js의 핵심 엔진으로, 자바스크립트 코드를 고성능의 네이티브 머신 코드로 컴파일하여 실행한다.
   - 특징 : 구글에서 개발한 오픈 소스 자바스크립트 엔진이며, 크롬 브라우저에서도 사용된다. V8은 자바스크립트를 빠르게 실행하기 위해 Just-In-Time (JIT) 컴파일러를 사용하여 코드를 런타임에 네이티브 코드로 변환한다.

2. Libuv 라이브러리

   - 역할 : Node.js의 비동기 I/O 모델을 지원하는 라이브러리로, 이벤트 루프와 스레드 풀을 제공하여 비동기 작업을 관리한다.
   - 특징 : Libuv는 비동기 네트워킹, 파일 시스템 작업, DNS, 타이머 등 다양한 I/O 작업을 처리한다. 이벤트 루프와 비동기 작업을 위한 스레드 풀(Thread Pool)을 포함하고 있어, 싱글 스레드로 작동하는 Node.js가 비동기적으로 여러 작업을 처리할 수 있게 한다. 이벤트 드리븐 아키텍처를 지원하며, 크로스 플랫폼으로 윈도우, 리눅스, macOS 등 다양한 운영체제에서 동일한 비동기 I/O 기능을 제공

3. 이벤트 루프 (Event Loop)

   - 역할 : Node.js의 핵심 메커니즘으로, 비동기 작업들을 관리하고 실행 순서를 결정합니다. Call Stack과 Event Queue 사이의 작업을 조율하며, 비동기 작업이 완료되었을 때 이를 Call Stack으로 옮겨 실행합니다.

   - 작동 원리

     1. Timers : `setTimeout`, `setInterval`과 같은 타이머 콜백을 실행한다.

     2. Pending Callbacks : 지연된 콜백들을 처리한다.

     3. Poll : 새로운 I/O 이벤트를 가져와 처리하고, 적절한 콜백을 실행한다.

     4. Check : `setImmediate` 콜백을 실행한다.
     5. Close Callbacks : 닫기 이벤트(`close` 콜백)들이 처리된다.

4. 이벤트 큐 (Event Queue)
   - 역할 : Node.js의 이벤트 루프와 밀접하게 관련된 개념으로,  타이머(`setTimeout`, `setInterval`), I/O 작업(파일 시스템, 네트워크 요청 등), `Promise`의 `.then()` 메서드 등 비동기적으로 처리되는 모든 작업의 콜백을 대기시킨다. 또한, 이벤트 루프가 Call Stack이 비어 있을 때마다 이벤트 큐에서 가장 오래된 콜백을 가져와 실행한다.
   - 특징 : FIFO 구죄고, 싱글 스레드 기반으로 모든 콜백이 순차적으로 실행된다. 이벤트 루프가 이벤트 큐를 계속 확인하며, Call Stack이 비어 있을 때 이벤트 큐에서 작업을 가져와 처리한다. 
5. 바인딩 (Bindings)
   - 역할 : Node.js와 C/C++로 작성된 라이브러리 간의 상호작용을 지원하는 메커니즘
   - 특징 : Node.js는 네이티브 성능을 제공하기 위해 V8과 Libuv 외에도, 특정 작업을 고속으로 수행할 수 있는 C/C++로 작성된 네이티브 모듈들을 사용한다. 예를 들어 파일 시스템 작업이나 네트워크 작업은 C/C++ 코드를 통해 더 빠르게 처리된다.
6. 워커스레드 (Worker Threads)
   - 역할 :  Node.js 10.5.0 버전부터 도입된 모듈로 복잡한 계산, 이미지 처리, 암호화, 압축 등과 같이 CPU를 많이 사용하는 작업을 메인 스레드에서 분리하여 별도의 스레드에서 처리하게 한다. 기본적으로 싱글 스레드로 동작하는 Node.js의 한계를 보완하여, 멀티스레드 처리를 가능하게 한다.
   - 특징 : Node.js의 기존 비동기 모델과 달리, 워커 스레드는 실제로 여러 스레드를 사용하여 동시 작업을 처리할 수 있다. 각 워커는 독립된 V8 인스턴스를 사용하여 실행된다. 즉, 메모리와 변수는 워커 간에 공유되지 않으며, 서로 데이터를 주고받을 때는 메시지 기반 통신을 사용한다.



## 2. Event Loop 동작원리 ✍🏻

![eventloop](/images/2024-09-08-event-loop/eventloop.png)

1. 모든 함수 호출은 Call Stack에 LIFP 구조로 쌓인다.
2. 비동기 함수는 Call Stack에 들어오는 즉시 Background로 보내진다.
3. Background에서 처리가 완료되면, Callback 함수는 Event Queue에 FIFO 구조로 쌓인다.
4. Event Loop는 Call Stack이 비어있는지 수시로 확인한다.
5. Call Stack이 비어있을 경우, Event Loop는 Event Queue에서 Callback 함수를 shift 한다.
6. shift 된 Callback 함수는 Call Stack으로 옮겨진 후 실행된다.



---







참조

```
https://reliasoftware.com/blog/node-js-event-loop

```


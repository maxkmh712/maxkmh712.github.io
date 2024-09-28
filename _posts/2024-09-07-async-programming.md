---
layout: single
title: "[ NODE.JS ] 비동기 프로그래밍"
typora-root-url: ../
categories: NODE.JS
tag: [콜백함수, Promise, async/await, 비동기]
author_profile: true # 연락처 정보 숨기기
search: true
toc: true
---

![async](/images/2024-09-07-first/async.png)

## 1. 동기 & 비동기 프로그래밍이란?

![sync](/images/2024-09-07-first/sync.png)

- 동기(Synchronous)

  - 하나의 작업이 완료될 때까지 기다리며, 그 이후에 다음 작업을 진행하는 방식
  - 코딩을 하면서 일반적으로 각 코드가 위에서 아래로 차례로 실행되는 방식이라고 할 수 있다.

- 비동기(Asynchronous)

  - 작업을 요청하고, 그 작업이 끝나는 것을 기다리지 않고 다음 작업을 진행하는 방식.
  - 요청한 작업이 완료되면 콜백, 프로미스(Promise), 혹은 async/await 패턴을 통해 결과를 처리한다.
  - 비동기는 메인스레드가 작업을 다른 곳에 인가하여 처리하게 하고, 그 작업이 완료되면 콜백 함수를 받아 실행하는 방식이다.

## 2. Node.js에서 비동기 처리 방식이 필요한 이유

Node.js는 기본적으로 싱글스레드에서 동작하기 때문에, 메인 스레드가 하나의 작업을 처리하는 동안 다른 작업을 수행할 수 없는 문제가 발생한다. 특히, 이러한 특징은 동기적인 코드 작성 시에 큰 문제가 될 수 있다. 예를 들어, 동기 방식으로 I/O 작업(예: 파일 읽기, 데이터베이스 쿼리, 네트워크 요청)을 처리하면, 메인 스레드는 해당 작업이 완료될 때까지 다른 모든 요청을 처리하지 못하고 대기 상태에 빠진다. 이로 인해 전체 애플리케이션의 성능이 급격히 저하될 수 있다.

### 비동기 처리가 없을 때 발생하는 문제들

1. 블로킹 메인 스레드
   - Node.js의 싱글스레드 이벤트 루프는 한 번에 하나의 작업만을 수행한다. 만약 비동기 처리를 하지 않고 동기적인 코드만 사용하면, I/O 작업이나 시간이 오래 걸리는 연산이 이벤트 루프를 막아버린다.
2. 성능 저하 및 사용자 경험 악화
   - 동기식 코드가 실행되는 동안 서버가 멈추거나 지연된다면, 즉각적인 응답을 기대하는 사용자 경험에 큰 악영향을 끼치게 된다. 이런 문제는 특히 대규모 트래픽을 처리하는 웹 서버에서 심각한 성능 저하로 이어질 수 있다.
3. 확장성 문제
   - Node.js의 이벤트 루프는 비동기 처리 덕분에 효율적으로 많은 클라이언트 요청을 동시에 처리할 수 있다. 동기 코드를 사용하게 되면 요청을 처리하는 데 시간이 오래 걸리며, 이를 해결하기 위해 더 많은 서버 리소스가 필요하게 되어 확장성이 떨어질 수 있다.
4. 자원 낭비
   - 동기적 I/O는 메인 스레드를 낭비하게 만든다. 예를 들어, 서버가 파일을 읽는 동안 아무런 작업도 하지 못하고 단순히 대기하게 되는데, 이는 CPU와 메모리 자원을 비효율적으로 사용하게 만든다.

## 3. Node.js에서 사용되는 비동기 처리 방식 3가지

### 1) 콜백 함수(Callback)

#### ① 콜백 함수란?

- 콜백함수란 다른 함수에 인자로 전달되어 특정 작업이 완료된 후 호출되는 함수이다.
- 콜백함수는 비동기 작업이 끝났을 때 완료를 알리기 위해 호출된다.

#### ② 콜백 함수의 동작 원리

1. 함수 A가 함수 B를 인자로 받아 호출한다.
2. 함수 B는 특정 작업을 수행한다.
3. 작업이 완료되면 함수 B가 인자로 전달된 함수 A(콜백 함수)를 호출하여 작업 결과를 전달하거나 후속 처리를 진행한다.

#### ③ 콜백 함수 사용 예시

```javascript
function processArray(arr, callback) {
  arr.forEach((element, index) => {
    setTimeout(() => {
      console.log(`처리중인 요소: ${element}`);
      callback(element);
    }, 1000 * (index + 1));
  });
}

function printElement(element) {
  console.log(`처리된 요소: ${element}`);
}

const numbers = [1, 2, 3, 4, 5];

processArray(numbers, printElement);
```

**상세 설명**

1. `processArray` 함수 정의

   - 이 함수는 배열 `arr`와 콜백 함수 `callback`을 인자로 받는다.
   - `arr.forEach()` 메서드를 사용하여 배열의 각 요소를 반복하면서, 각 요소에 대해 1초 간격으로 콜백 함수를 호출한다.

2. `processArray` 함수 호출
   - `processArray(numbers, printElement);`를 호출하여 `numbers` 배열 `[1, 2, 3, 4, 5]`과 `printElement`라는 콜백 함수를 전달한다.
3. 배열 요소 반복
   - `arr.forEach((element, index) => {...})`가 실행된다.
   - 이때 배열의 각 요소가 `element`로 전달되며, 요소의 인덱스는 `index`로 전달된다.
4. `setTimeout`을 통한 비동기 처리
   - 각 요소에 대해 `setTimeout`이 설정되며, 이 함수는 비동기적으로 1초씩 지연되면서 실행된다.
   - `setTimeout(() => {...}, 1000 * (index + 1));`는 인덱스에 따라 1초, 2초, 3초 등 점차적으로 지연된다. 이는 각 요소의 처리가 비동기적으로 일정 시간 이후에 실행됨을 의미한다.
5. 콜백 함수 호출
   - `setTimeout` 내부에서 `callback(element);`가 호출된다.
   - 여기서 `callback`은 `printElement` 함수이므로, `printElement`가 각 요소를 인자로 받아 실행된다.
6. 콜백 함수 `printElement` 실행
   - `printElement(element)`가 실행되어 각 요소를 출력한다.

![스크린샷 2024-09-08 오전 10.17.19](/images/2024-09-07-first/스크린샷 2024-09-08 오전 10.17.19.png)

**코드 실행 과정**

1. `processArray` 함수가 배열 `[1, 2, 3, 4, 5]`과 콜백 함수 `printElement`를 인자로 호출한다.
2. 배열의 각 요소에 대해 `setTimeout`을 통해 1초씩 지연 후 콜백 함수가 호출된다.
3. 첫 번째 요소 `1`이 1초 후 처리되고, `printElement`가 실행되어 `Processed: 1`이 출력된다.
4. 두 번째 요소 `2`는 2초 후 처리되며, `Processed: 2`가 출력된다.
5. 이 과정이 배열의 마지막 요소까지 반복된다.

#### ④ 콜백 지옥 (Callback Hell)

```javascript
function processArray(arr, callback) {
  arr.forEach((element, index) => {
    setTimeout(() => {
      console.log(`처리중인 요소: ${element}`);
      // 첫 번째 콜백 함수
      callback(element, (nextElement) => {
        setTimeout(() => {
          console.log(`추가 처리중인 요소: ${nextElement}`);
          // 두 번째 콜백 함수
          callback(nextElement, (finalElement) => {
            setTimeout(() => {
              console.log(`최종 처리중인 요소: ${finalElement}`);
              // 세 번째 콜백 함수
              callback(finalElement);
            }, 1000);
          });
        }, 1000);
      });
    }, 1000 * (index + 1));
  });
}

function printElement(element, nextCallback) {
  console.log(`처리된 요소: ${element}`);
  if (nextCallback) {
    // 다음 콜백 함수 호출
    nextCallback(element + 1);
  }
}

const numbers = [1, 2, 3, 4, 5];

processArray(numbers, printElement);
```

- 콜백 지옥이란 콜백 함수를 사용하는 코드가 여러 번 중첩되어 복잡하고 난해한 구조로 변해버리는 상황이다.
- 이 현상은 콜백 함수가 계속해서 중첩되고, 코드의 들여쓰기 깊이가 깊어지며 계단식으로 내려가는 형태로 나타난다.
- 콜백 지옥은 주로 비동기 작업을 순차적으로 처리할 때 발생한다.
- 콜백 지옥으로 인해 가독성 저하, 디버깅 및 에러 처리 복잡성 증가 등의 문제가 발생할 수 있다.
- 콜백 지옥의 해결 방법으로서 나온 것이 `Promise`와 `async/await`이다.

### 2) 프로미스 (Promise)

#### ① Promise란?

- Promise란 비동기 작업의 완료 또는 실패를 나타내는 객체이다.

- 비동기 작업의 상태와 결과를 관리하며, 비동기 작업이 끝났을 때 특정 동작을 수행하도록 예약할 수 있다.

- 콜백 지옥을 해결하기 위해 등장했으며, then/catch 메서드를 통해 비동기 흐름을 제어할 수 있다.

- Promise 객체는 생성자 함수로 만들어지며, 비동기 작업을 수행하는 함수와 `resolve`, `reject` 콜백을 인자로 받는다. `resolve`는 작업이 성공했을 때 호출되며, `reject`는 작업이 실패했을 때 호출된다.

  ```javascript
  const promise = new Promise((resolve, reject) => {
    // 비동기 작업 수행
    const success = true; // 작업의 성공 여부 예시

    if (success) {
      resolve("작업 성공"); // 성공 시 호출
    } else {
      reject("작업 실패"); // 실패 시 호출
    }
  });
  ```

#### ② Promise의 상태

1. Pending (대기중) : 초기 상태, 비동기 작업이 아직 완료되지 않은 상태.
2. Fulfilled (이행됨) : 비동기 작업이 성공적으로 완료된 상태.
3. Rejected (거부됨) : 비동기 작업이 실패한 상태

#### ③ Promise의 메서드

Promise는 상태가 변할 때, 그 결과값을 처리할 수 있도록 `.then()`, `.catch()`, `.finally()` 메서드를 제공한다.

1. `.then()`

   - `Promise`가 성공(`Fulfilled`)했을 때 실행할 콜백 함수를 등록한다.
   - `.then()`은 `Promise`를 반환하므로 체이닝이 가능하다.

   ```javascript
   promise
     .then((result) => {
       console.log(result); // 성공 시 메시지 출력
       return "다음 작업";
     })
     .then((next) => {
       console.log(next); // 체이닝으로 다음 작업 실행
     });
   ```

2. `.catch()`

   - `Promise`가 실패(`Rejected`)했을 때 실행할 콜백 함수를 등록한다.
   - 여러 `.then()`이 체이닝된 경우, 가장 가까운 `.catch()`에서 에러를 처리한다.

   ```javascript
   promise
     .then((result) => {
       throw new Error("에러 발생"); // 에러 강제 발생
     })
     .catch((error) => {
       console.error("에러 처리:", error.message); // 에러 처리
     });
   ```

3. `.finally()`

   - 성공 여부와 상관없이 `Promise`의 완료 시점에서 실행할 콜백 함수를 등록한다.
   - 주로 리소스 정리 등의 마무리 작업에 사용된다.

   ```javascript
   promise.finally(() => {
     console.log("작업이 끝났습니다."); // 작업 완료 후 실행
   });
   ```

#### ④ Promise의 사용 예시

```javascript
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { name: "John", age: 30 };
      resolve(data); // 데이터 가져오기 성공
    }, 1000);
  });
}

fetchData()
  .then((data) => {
    console.log("데이터:", data); // 작업 성공 시 실행
  })
  .catch((error) => {
    console.error("에러:", error); // 작업 실패 시 실행
  })
  .finally(() => {
    console.log("작업 완료"); // 성공 여부와 상관없이 항상 실행
  });
```

#### ⑤ Promise의 내부 동작 원리

1. Promise 생성 : `new Promise()` 생성자가 호출되면서 비동기 작업이 시작된다.
2. Pending 상태 : 비동기 작업이 진행되는 동안 `Promise`는 `Pending` 상태를 유지한다.
3. resolve 또는 reject : 작업이 완료되면 `resolve`가 호출되어 `Fulfilled` 상태로, 실패하면 `reject`가 호출되어 `Rejected` 상태로 변경된다.
4. 후속 처리 : 상태 변화에 따라 등록된 `.then()`, `.catch()`, `.finally()` 콜백이 실행된다.

#### ⑥ Promise 체이닝

`Promise`의 체이닝을 통해 비동기 작업을 순차적으로 처리할 수 있다. 여러 개의 `.then()`을 연속으로 연결하여 각 단계별로 결과를 전달받고 처리할 수 있다.

```javascript
fetchData()
  .then((data) => {
    console.log("데이터 받음:", data);
    return processData(data); // 다음 비동기 작업 호출
  })
  .then((processedData) => {
    console.log("데이터 처리 완료:", processedData);
    return saveData(processedData);
  })
  .then(() => {
    console.log("데이터 저장 완료");
  })
  .catch((error) => {
    console.error("에러 발생:", error);
  });
```

#### ⑦ Promise의 장단점

**장점**

1. 가독성 향상 : 콜백 지옥을 해결하여 코드의 가독성을 높이고, 비동기 로직을 순차적으로 이해할 수 있다.
2. 에러 처리 용이 : `.catch()`를 통해 비동기 작업의 에러를 일관되게 처리할 수 있다.
3. 비동기 흐름 제어 : 체이닝을 통해 복잡한 비동기 흐름을 간결하게 표현할 수 있다.

**단점**

1. 여전한 가독성 문제 : 콜백 지옥은 해결했지만, `.then()`, `.catch()`, `.finally()`를 계속 체이닝하면서 코드가 길어질 경우 여전히 코드가 복잡하고 가독성이 떨어질 수 있다.

   ```
   /* Promise Hell */
   fetch('https://example.com/api')
     .then(response => response.json())
     .then(data => fetch(`https://example.com/api/${data.id}`))
     .then(response => response.json())
     .then(data => fetch(`https://example.com/api/${data.id}/details`))
     .then(response => response.json())
     .then(data => console.log(data))
     .catch(error => console.error(error));
   ```

2. 에러 처리 복잡성 : `.catch()`를 사용해 에러를 처리하지만, 중간에 발생한 에러를 특정 위치에서 처리하거나, 에러 처리 흐름을 조절하는 데 있어서 코드가 지저분해질 수 있다. 또한, 여러 `.then()` 사이에 에러가 발생하면, `.catch()`로 에러가 전달되는 위치를 파악하기 어려울 수 있다.
3. 디버깅 어려움 : `romise` 체이닝에서 발생하는 에러의 스택 트레이스가 비동기적으로 처리되기 때문에, 에러가 발생한 원래 위치를 찾기가 어렵고, 이로 인해 디버깅이 까다로워질 수 있다.

Promise의 단점들을 보완하고자 나온 개념이 `async/await` 이다.

### 3) async/await

```javascript
// Promise 체이닝 코드
fetchData()
  .then((data) => processData(data))
  .then((processedData) => saveData(processedData))
  .catch((error) => console.error(error));

// async/await 코드
async function handleData() {
  try {
    const data = await fetchData();
    const processedData = await processData(data);
    await saveData(processedData);
  } catch (error) {
    console.error(error);
  }
}
```

#### ① async/await이란?

- async/await이란 Promise 기반의 코드를 더 읽기 쉽고 동기적으로 보이게 작성할 수 있는 문법이다.

- async 함수는 항상 Promise를 반환하며, 함수 내부에서 await은 Promise가 해결될 때까지 기다린다. 이는 비동기 작업을 동기적인 방식으로 처리할 수 있게 도와준다.
- async/await은 ES2017에 도입된 문법이고, Promise를 대체하기 위해 나온 것이 아니라 보완하기 위해 나온 개념이다.

#### ② async/await 사용법

- function 키워드 앞에 `async` 만 붙여주면 되고, 비동기로 처리되는 부분 앞에 `await` 만 붙여주면 된다.

- 달리 표현하자면, function 앞에 `async`를 붙여줌으로써, 함수내에서 `await`을 사용할 수 있고, 반대로 말하면 `await` 을 사용하기 위해선 반드시 function 앞에 `async`가 붙어있는지를 확인해야 한다.

  ```javascript
  function fetchData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = { name: "John", age: 30 };
        resolve(data); // 데이터 가져오기 성공
      }, 1000);
    });
  }

  // Promise 사용 예시
  fetchData()
    .then((data) => {
      console.log("데이터:", data); // 작업 성공 시 실행
    })
    .catch((error) => {
      console.error("에러:", error); // 작업 실패 시 실행
    })
    .finally(() => {
      console.log("작업 완료"); // 성공 여부와 상관없이 항상 실행
    });

  // async/await 사용
  async function handleData() {
    try {
      const data = await fetchData(); // fetchData가 resolve될 때까지 기다림
      console.log("데이터:", data); // 성공 시 데이터 출력
    } catch (error) {
      console.error("에러:", error); // 실패 시 에러 처리
    } finally {
      console.log("작업 완료"); // 성공 여부와 상관없이 항상 실행
    }
  }
  ```

  - `handleData()` 라는 새로운 비동기 함수를 선언했다. 이 함수는 `async` 키워드를 사용하여 비동기 함수로 정의되었고, `await`를 통해 비동기 작업의 완료를 기다릴 수 있다.
  - `const data = await fetchData();`부분에서 `fetchData` 함수가 `resolve`될 때까지 기다린다. 이때 `fetchData()`는 `Promise`를 반환하고, `await` 키워드는 해당 `Promise`가 해결될 때까지 코드 실행을 일시 중지시킨다.
  - 만약 `Promise`가 `reject`되면, `await`는 `reject`된 이유를 `catch` 블록으로 전달한다.
  - `try...catch` 블록을 사용하여 에러를 처리합니다. `Promise`에서 `.catch()`를 사용하는 것과 같은 역할을 하며, 에러 발생 시 `catch` 블록이 실행된다.
  - `finally` 블록은 성공 여부와 상관없이 항상 실행되며, 리소스 정리와 같은 마무리 작업을 할 때 유용하다. 이는 `.finally()` 메서드와 동일한 기능을 한다.

#### ③ 키워드 async와 await

**1) async의 리턴값은 Promise 객체이다.**

![async-return-promise](/images/2024-09-07-async-programming/async-return-promise.png)

단순히 숫자를 리턴하더라도 `fulfilled` 상태의 promise 객체로 감싸진 형태의 리턴값이 반환된다.

**2) await은 Promise 처리가 끝날때까지 기다리게 하는 역할로 동기적으로 처리할 수 있게 해준다.**

```javascript
async function getData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
  const data = await response.json();
  console.log(data):
}
```

- `getData()` async 함수 내에서 `fetch()` 비동기 함수를 호출하고, 반환된 Promise를 await 으로 처리한다. await 덕분에 함수 내 코드 실행이 일시 중지되고 동기적으로 `fetch()` 함수가 완료될 때까지 기다린다. `fetch()` 함수가 성공적으로 완료되면, 그 다음 코드가 실행된다.
- 이제 `response.json()` 함수가 호출되는데, 이때도 await으로 처리하여 성공적으로 가져와지면 data 변수에 할당한다.

#### ④ Promise.all 메소드

**기본 구조 및 동작 방식**

```javascript
Promise.all([promise1, promise2, promise3])
  .then((results) => {
    console.log(results); // 모든 Promise의 결과가 배열로 반환됨
  })
  .catch((error) => {
    console.error("에러 발생:", error); // 하나라도 실패하면 이곳으로 이동
  });
```

1. Promise 배열 입력 : `Promise.all`은 배열에 포함된 모든 `Promise`를 동시에 실행한다.
2. 병렬 처리 : 각 `Promise`가 병렬로 실행되며, 완료되기까지의 시간은 각 `Promise`의 처리 속도에 다르다.
3. 결과 수집 : 든 `Promise`가 성공하면, `then` 블록에서 각 `Promise`의 결과가 담긴 배열이 반환된다. 배열의 순서는 입력된 `Promise`의 순서를 따른다.
4. 에러 발생 시 : 하나의 `Promise`라도 `reject`되면, 즉시 `Promise.all` 전체가 `reject`되며, 가장 먼저 발생한 에러가 `catch` 블록으로 전달된다.

**사용 예시**

```javascript
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve(`Data from ${url}`); // 성공 시 데이터 반환
      } else {
        reject("URL이 없습니다."); // 실패 시 에러 발생
      }
    }, Math.random() * 2000); // 0~2초 사이의 랜덤 지연
  });
}

const promise1 = fetchData("url1");
const promise2 = fetchData("url2");
const promise3 = fetchData("url3");

Promise.all([promise1, promise2, promise3])
  .then((results) => {
    console.log("모든 데이터:", results); // 각 Promise의 결과가 배열로 반환됨
  })
  .catch((error) => {
    console.error("에러 발생:", error); // 하나라도 실패하면 에러 출력
  });

// '모든 데이터:' [ 'Data from url1', 'Data from url2', 'Data from url3' ]
```

**장단점**

1. 장점
   - 각 작업이 서로 독립적인 경우, `Promise.all`은 작업을 병렬로 수행함으로써 효율성을 극대화한다.
   - 모든 `Promise`의 결과를 한꺼번에 배열로 반환하기 때문에, 각 결과를 순서대로 관리하고 사용할 수 있다.
   - 하나의 `then` 블록으로 모든 `Promise`의 결과를 처리할 수 있어 코드가 간결하고 가독성이 높아진다.
2. 단점
   - `romise.all`에서 하나의 `Promise`라도 실패하면 전체가 실패 처리되므로, 부분적으로 성공한 작업을 개별적으로 처리하거나 로깅하기가 어렵다
   - 여러 `Promise` 중 첫 번째로 실패한 `Promise`의 에러만 잡아내기 때문에, 어떤 `Promise`가 문제를 일으켰는지 파악하기 힘들 수 있다.
   - 동시에 많은 `Promise`를 실행하면 시스템 리소스에 큰 부하가 걸릴 수 있다. 때문에 적절한 병렬 수를 관리하는 것이 중요하다.

참조

```
https://gurindernarang.medium.com/asynchronous-programming-callbacks-async-await-promises-in-js-19e294e84a79

https://inpa.tistory.com/entry/%F0%9F%8C%90-js-async#%EC%99%9C_%EC%99%84%EB%B2%BD%ED%95%9C_%EB%A9%80%ED%8B%B0_%EC%8A%A4%EB%A0%88%EB%94%A9%EC%9D%B4_%EC%95%84%EB%8B%8C%EA%B0%80

https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-%EB%B9%84%EB%8F%99%EA%B8%B0%EC%B2%98%EB%A6%AC-async-await
```

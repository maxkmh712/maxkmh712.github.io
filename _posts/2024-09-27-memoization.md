---
layout: single
title: "[ JAVASCRIPT ] Memoization"
typora-root-url: ../
categories: [JAVASCRIPT]
tag: [memoization]
author_profile: true # 연락처 정보 숨기기
search: true
toc: true
---

![memoization](/images/2024-09-27-memoization/memoization.png)

## Memoization

### 1. 개념

- memoization이란 함수의 결과를 캐싱하여 동일한 입력에 대해 계산을 반복하지 않고 캐시된 값을 반환하는 자바스크립트 최적화 기법이다.
- 재귀적으로 반복되는 함수나 큰 연산 같이 **CPU 집약적인 작업**에 메모이제이션을 사용하면 실행시간을 줄여줄 수 있다.
- API 또는 데이터베이스 사용 시 **동일한 입력에 대해 여러 번 호출**해야 하는 경우 메모이제이션은 불필요한 호출을 방지하고 성능을 향상시켜줄 수 있다.
- 메모이제이션은 **동적 프로그래밍(DP) 문제**와 같은 곳에서 이미 계산된 부분 문제들을 재사용하여 계산량을 줄여줄 수 있다.
- 위와 같은 경우 캐시 메모리에 많은 데이터를 저장할 경우 발생할 수 있는 **메모리 사용량 증가에 유의**하는 것이 좋다.



### 2. 동작 원리 & 예제

####  1) 동작원리

```javascript
function memoize(fn) {
  const cache = {};

  return function(...args) {
    const key = JSON.stringify(args); 
    // 입력값을 문자열로 변환하여 캐시 키로 사용

    if (cache[key]) {
      return cache[key];
    }
    
    const result = fn(...args);
    cache[key] = result;
    
    return result;
  };
}
```

1. 함수가 처음 호출되면 해당 함수의 결과를 저장한다.
2. 이후 같은 입력값으로 함수가 호출될 때, 이전에 저장된 결과를 반환한다.
3. 이를 통해 중복 계산을 방지하고 성능을 개선할 수 있다.

#### 2) 예제

**일반적인 Fibonacci 함수 (비효율적)**

```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

**Memoization을 적용한 Fibonacci 함수**

```javascript
function memoizedFibonacci() {
  const cache = {}; // 결과를 저장할 캐시 객체

  return function fib(n) {
    if (n in cache) {
      return cache[n]; // 이미 계산된 값이 있으면 반환
    }

    if (n <= 1) {
      return n;
    }

    // 값을 계산하고 캐시에 저장
    cache[n] = fib(n - 1) + fib(n - 2);
    return cache[n];
  };
}

const fibonacci = memoizedFibonacci();
console.log(fibonacci(10)); // 55
console.log(fibonacci(50)); // 매우 빠른 결과
```



### 3. Memoization의 장점과 단점

#### 1) 장점

- 성능 개선 : 연산 비용이 많이 드는 함수에 대해 동일한 입력값에 대해 중복 계산을 피할 수 있다.
- 시간 복잡도 개선 : Fibonacci 함수 예시에서 보듯이, 재귀적 알고리즘의 시간 복잡도를 O(2^n)에서 O(n)으로 줄일 수 있다.

#### 2) 단점

- 메모리 사용량 증가 : 함수 결과를 캐시해야 하므로, 메모리를 추가로 사용하게 된다. 캐시에 저장된 값들이 많아지면 메모리 문제가 발생할 수 있다.
- 상태 관리 : 캐시가 계속 유지되면 불필요한 메모리 사용으로 이어질 수 있다. 이를 해결하기 위해 캐시를 관리하는 방법도 고려할 수 있다.



### 4. 사용 상황

#### 1) 재귀적인 계산

- 피보나치 수열이나 팩토리얼과 같이 재귀적인 문제는 동일한 부분 문제를 여러 번 계산하게 되는데, 이때 메모이제이션을 사용하면 중복된 계산을 피하고 성능을 개선할 수 있다.

- 예시

  ```javascript
  // 사용 예시: 피보나치 수열 계산에 memoization 적용
  function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
  
  const memoizedFibonacci = memoize(fibonacci);
  
  console.log(memoizedFibonacci(10));  // 계산 후 결과 캐싱
  console.log(memoizedFibonacci(10));  // 캐시에서 결과 가져오기
  ```

#### 2) 중복된 API 호출

- 동일한 요청으로 API를 여러 번 호출해야 하는 상황에서 메모이제이션을 사용하여 결과를 캐싱할 수 있다. 이를 통해 불필요한 네트워크 요청을 줄이고, 응답 시간을 개선할 수 있다.

- 예시

  ```javascript
  const fetchUserData = memoize(async (userId) => {
    const response = await fetch(`/api/users/${userId}`);
    return response.json();
  });
  
  fetchUserData(1);  // API 호출
  fetchUserData(1);  // 캐시된 결과 반환
  ```

#### 3) 복잡한 계산을 여러 번 해야 할 때

- 기하학적인 계산, 그래프 탐색, 경로 탐색 문제 등 복잡한 수학적 계산에서 동일한 입력값에 대해 반복적으로 계산이 필요할 경우 메모이제이션을 통해 성능을 크게 개선할 수 있다.
- 예시 : 그래프 탐색 알고리즘 (최단 경로 문제, 경로 수 계산 등)

#### 4) 동적 프로그래밍(DP) 최적화

- 동적 프로그래밍(DP)에서 반복되는 부분 문제들을 메모이제이션을 통해 효율적으로 해결할 수 있다. 메모이제이션은 동적 프로그래밍의 핵심 기법 중 하나로, 재귀적으로 접근할 때 사용된다.
- 예시 : 최소 경로 문제 또는 배낭 문제 같은 DP 문제는 메모이제이션으로 계산을 줄일 수 있다.

#### 5) 복잡한 필터링 또는 검색

-  복잡한 필터링이나 검색 알고리즘을 자주 실행해야 하는 경우, 이전에 계산된 필터링 결과를 캐시해두면 성능을 향상시킬 수 있다.

### 5. Javascript에서 Memoization 적용 방법

JavaScript에서 Memoization을 직접 구현할 수도 있지만, 일반적으로 더 복잡한 상황에서는 **Lodash** 같은 라이브러리의 `_.memoize` 함수를 사용하는 것이 편리하다

```javascript
const _ = require('lodash');

const fibonacci = _.memoize(function(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(50));
```



### 6. NestJS에서 Memoization 적용 방법

#### 1-1) 기본 예시 서비스

```typescript
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ApiService {
  async fetchData(param: string): Promise<any> {
    const response = await axios.get(`https://api.example.com/data?param=${param}`);
    return response.data;
  }
}
```

이 메서드는 호출할 때마다 외부 API를 반복적으로 호출하므로 비효율적이다.

#### 1-2) Memoization 적용하기

``` typescript
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ApiService {
  private cache = new Map<string, any>(); // 캐시 저장소

  async fetchData(param: string): Promise<any> {
    if (this.cache.has(param)) {
      // 캐시가 존재하는지 확인해서 존재할 경우
      return this.cache.get(param); // 캐시된 결과 반환
    }

    const response = await axios.get(`https://api.example.com/data?param=${param}`);

    // 새로운 결과를 캐시에 저장
    this.cache.set(param, response.data);

    return response.data;
  }
}
```

#### 1-3) 캐시 만료 기능 추가하기

캐시가 오래된 데이터를 반환하는 문제를 방지하기 위해 **TTL(Time to Live)**을 추가할 수 있다. 캐시 만료 시간을 설정하여 일정 시간 후에는 데이터를 새로 가져오도록 할 수 있다.

```typescript
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ApiService {
  private cache = new Map<string, { data: any, timestamp: number }>();
  private cacheTTL = 60000; // 60초 (1분) 캐시 유효 기간

  async fetchData(param: string): Promise<any> {
    const currentTime = Date.now();

    // 캐시가 존재하고, 유효 기간이 지나지 않았는지 확인
    if (this.cache.has(param)) {
      const cached = this.cache.get(param);
      
      if (currentTime - cached.timestamp < this.cacheTTL) {
        return cached.data; // 캐시된 결과 반환
      }
    }

    const response = await axios.get(`https://api.example.com/data?param=${param}`);

    // 새로운 결과를 캐시에 저장 (타임스탬프와 함께)
    this.cache.set(param, { data: response.data, timestamp: currentTime });

    return response.data;
  }
}
```



#### 2-1) Interceptor로 Memoization 적용

```typescript
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  private cache = new Map<string, any>();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const key = request.url; // URL을 키로 캐시 관리

    if (this.cache.has(key)) {
      return of(this.cache.get(key)); // 캐시된 결과 반환
    }

    return next.handle().pipe(
      tap((response) => {
        this.cache.set(key, response); // 새로운 결과를 캐시에 저장
      }),
    );
  }
}
```

NestJS의 **인터셉터**를 사용하면, 특정 경로에 대한 응답을 메모이제이션할 수 있다. 이렇게 하면 모든 컨트롤러 메서드에 memoization 로직을 넣을 필요 없이 중앙에서 캐싱을 관리할 수  있다.

```typescript
@Controller('data')
@UseInterceptors(CacheInterceptor) // ✅ 컨트롤러에 적용
export class DataController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  async getData(): Promise<any> {
    return this.apiService.fetchData('someParam');
  }
}
```



참고

```
https://medium.com/@soyoung823/memoization-cache-f8b5930e3ee1

https://medium.com/@amitsharma_24072/understanding-memoization-in-javascript-and-its-benefits-7343102f87cc
```


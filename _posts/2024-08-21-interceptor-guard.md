---
layout: single
title: "[ NestJS ] 인터셉터와 가드의 차이점"
typora-root-url: ../
categories: [NESTJS]
tag: [Guard, Interceptor]
author_profile: true # 연락처 정보 숨기기
search: true
toc: true
toc_sticky: true
---

![nestjs_lifecycle](/images/2024-08-21-first/nestjs_lifecycle.webp)

NestJS로 개발을 하면서 요청과 응답을 효과적으로 처리하기 위해 위 생애주기의 중요성을 느끼게 되었다.
그 중 기능과 역할에 대해 혼란이 있었던 Guard와 Interceptor에 대해서 정확하게 이해하고자 한다.

## Guard

### 1. 개념

- 가드란 NestJs에서 요청이 처리되기 전, 다시 말해 컨트롤러에 진입되기 전에 권한이 있는지 확인하는 역할을 해주는 컴포넌트다. 용어 그대로 입구컷을 해주는 방패막이 역할을 해준다고 생각하면 이해가 쉽다.
- 필요한 권한이나 자격증명이 있는지를 확인해주는 역할로 보통 `인증`이나 `인가`를 위해 사용된다.
- 실행시점은 라우터 핸들러에 도달하기 전에 실행된다.

### 2. 구현

```typescript
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
```

- 가드에서 검증을 끝내면 `true`를 리턴해야 요청이 다음 단계로 진행될 수 있다. 그렇지 않으면 `false`를 반환하면 된다.
  현실 세계에서 클럽에서 입구 컷을 하는 덩치 큰 가드가 yes or no를 하는 것 같아서 재밌다.
- 가드는 `CanActive` 인터페이스를 구현하고, `@UseGuards()`라는 데코레이터를 호출하여 가드를 인자로 넣어 사용하면 된다.

```typescript
@UseGuards(Guard1, Guard2)
@Controller("cats")
export class CatsController {
  constructor(private catsService: CatsService) {}

  @UseGuards(Guard3)
  @Get()
  getCats(): Cats[] {
    return this.catsService.getCats();
  }
}
```

- 가드 실행은 `Global Guard` -> `Controller Guard` -> `Router Guard` 순으로 진행된다.
- 위 코드에서 가드 실행순서는 Guard1 -> Guard2 -> Guard3이다.

### 3. 실사용 예제

```typescript
@Injectable()
export class ApiKeyGuard extends BaseGuard {
  constructor(private readonly commonService: CommonService) {
    super();
  }

  async handleRequest(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    .
    .
    .
    if (signature !== hashedMessage) {
      throw new UnauthorizedException('INVALID API KEY');
    }

    return true;
  }
}
```

## Interceptor

### 1. 개념

- 인터셉터란 말 그대로 요청을 가로채서 특정한 기능을 수행하는 컴포넌트이다. 여기서 특정한 기능이란,
  - 메서드 실행 전/후에 추가 로직을 바인딩
  - 함수에서 반환된 결과를 변환
  - 함수에서 발생한 예외를 변환
  - 기본 기능 동작을 확장
  - 특정 조건(예: 캐싱 목적)에 따라 함수를 완전히 재정의
- 인터셉터는 요청/응답을 변환하거나 요청의 흐름을 수정하는데 사용된다. 즉 들어오는 요청과 나가는 응답을 모두 가공할 수 있는 기능이 있다.
- 인터셉터는 라우트 핸들러가 호출되기 전과 후에 총 2번 실행된다.

- 인터셉터는 AOP(Aspect-oriented programming, 관점 지향 프로그래밍)에서 영감을 받은 기술로

### 2. 구현

```typescript
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log("Before...");

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}
```

- 인터셉터는 `NestInterceptor` 인터페이스를 구현하고, `@UseInterceptors()` 라는 데코레이터를 호출하여 사용할 수 있다. 간단히 공홈에서의 예시를 가져왔다.

```typescript
@UseInterceptors(LoggingInterceptor)
export class CatsController {}
```

- 특정 컨트롤러에 적용하여 사용할 수 있다.

```typescript
const app = await NestFactory.create(AppModule);
app.useGlobalInterceptors(new LoggingInterceptor());
```

- 위와 같이 설정하여 글로벌 인터셉터로 사용할 수도 있다.

### 3. 실사용 예제

```typescript
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        timestamp: new Date().toISOString(),
        statusCode: context.switchToHttp().getResponse().statusCode,
        result: data,
      }))
    );
  }
}
```

- 다양한 사용 예제가 있을 수 있지만, 위 케이스는 리턴값에 통일성을 주기 위해 위와 같이 가공하여 사용한 인터셉터이다.

## Guard와 Interceptor의 차이점

1. 중점
   - 가드 : 접근과 인가에 초점
   - 인터셉터 : 요청과 응답 프로세스에 동작을 변환하거나 추가하는데 중점
2. 실행 시점
   - 가드 : 요청이 라우트 핸들러에 도달하기 전에 실행
   - 인터셉터 : 라우트 핸들러 전과 후 총 2번 실행
3. 사용 목적
   - 가드 : 요청에 대한 권한을 확인해야 할 필요가 있는 경우
   - 인터셉터 : 요청과 응답을 수정하거나 추가 처리를 해야 할 경우

참고

https://docs.nestjs.com/faq/request-lifecycle#guards

https://docs.nestjs.com/interceptors

https://javascript.plainenglish.io/nestjs-roadmap-for-beginners-4fee5be251b

https://jake-seo-dev.tistory.com/726

https://changhyeon.net/nestjs--life-cycle

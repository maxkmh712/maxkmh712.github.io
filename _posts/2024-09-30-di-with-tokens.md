---
layout: single
title: "[ NESTJS ] 토큰을 이용한 의존성 주입"
typora-root-url: ../
categories: [NESTJS]
tag: [di, symbol]
author_profile: true # 연락처 정보 숨기기
search: true
toc: true
---

![nestjs-logo-social](/images/2024-09-30-di-with-tokens/nestjs-logo-social.png)

## 1. 기본적인 의존성 주입(DI) 방식

NestJS에서 기본적인 의존성 주입은 보통 클래스 이름을 이용해 주입하는 방식을 사용한다. 예를 들면 아래와 같이 서비스를 만들고, 해당 서비스를 컨트롤러에서 직접 주입받아 사용한다. 여기서 'MyService'라는 클래스 이름을 사용하여 주입한다.

```typescript
@Injectable()
export class MyService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

```typescript
@Controller()
export class MyController {
  constructor(private readonly myService: MyService) {}

  @Get()
  getHello(): string {
    return this.myService.getHello();
  }
}
```



## 2. 토큰을 이용한 커스텀 프로바이더

NestJS에서는 의존성을 **토큰**을 통해 주입할 수 있는데, 이 방법은 여러 인스턴스를 관리하거나, 주입하는 의존성을 좀 더 세밀하게 제어하고 싶을 때 사용된다. 여기서는 `symbol`을 토큰으로 사용하는 방법을 예시로 들어보고자 한다.

### 1) 토큰 정의 & 프로바이더에 등록

먼저, `symbol`을 이용해 고유한 토큰을 정의한다.

```typescript
export const CUSTOM_TOKEN = Symbol('CUSTOM_TOKEN');
```

```markdown
💡 symbol이란?

JavaScript의 내장 객체로, 고유하고 변경 불가능한 원시 값(primitive value)을 생성하는 데 사용되고, 
주로 객체의 속성 키를 정의할 때 충돌을 방지하기 위해 사용된다. symbol의 특성은 아래와 같다.

1. 고유성: 각 Symbol은 항상 고유하기 때문에 키 충돌 없이 속성을 정의할 수 있다.
2. 변경 불가능성: 한 번 생성된 Symbol은 변경할 수 없기 때문에 Symbol을 사용하는 객체 속성의 안정성을 보장한다.
```



이 `CUSTOM_TOKEN`을 사용하여 `useValue`, `useClass`, `useFactory`, `useExisting`등의 프로바이더 형태로 주입할 수 있다. 

- **`useValue`**: 단순 값 (객체, 문자열 등)을 주입할 때 사용한다. 이 값은 주입된 프로바이더의 인스턴스를 생성하지 않고, 기존의 값을 그대로 제공한다.

  ```typescript
  export const CUSTOM_TOKEN = Symbol('CUSTOM_TOKEN');
  
  const customValue = { message: 'Hello, World!' };
  
  @Module({
    providers: [
      {
        provide: CUSTOM_TOKEN,
        useValue: customValue,
      },
    ],
  })
  export class CustomModule {}
  
  @Injectable()
  export class MyService {
    constructor(@Inject(CUSTOM_TOKEN) private readonly customValue: { message: string }) {}
  
    getMessage() {
      return this.customValue.message; // 'Hello, World!'
    }
  }
  ```

- **`useClass`**: 특정 클래스를 프로바이더로 사용하여 인스턴스를 생성한다. 이 방식은 주입된 클래스의 인스턴스에 대한 의존성을 제공할 수 있다.

  ```typescript
  export const CUSTOM_TOKEN = Symbol('CUSTOM_TOKEN');
  
  @Injectable()
  export class CustomService {
    getGreeting() {
      return 'Hello from CustomService!';
    }
  }
  
  @Module({
    providers: [
      {
        provide: CUSTOM_TOKEN,
        useClass: CustomService,
      },
    ],
  })
  export class CustomModule {}
  
  @Injectable()
  export class MyService {
    constructor(@Inject(CUSTOM_TOKEN) private readonly customService: CustomService) {}
  
    greet() {
      return this.customService.getGreeting(); // 'Hello from CustomService!'
    }
  }
  ```

- **`useFactory`**: 팩토리 함수를 사용하여 프로바이더의 인스턴스를 생성할 때 사용한다. 이 방식은 복잡한 생성 로직이나 동적인 인스턴스 생성을 지원한다.

  ```typescript
  export const CUSTOM_TOKEN = Symbol('CUSTOM_TOKEN');
  
  @Module({
    providers: [
      {
        provide: CUSTOM_TOKEN,
        useFactory: () => {
          return { message: 'Hello from useFactory!' };
        },
      },
    ],
  })
  export class CustomModule {}
  
  @Injectable()
  export class MyService {
    constructor(@Inject(CUSTOM_TOKEN) private readonly customValue: { message: string }) {}
  
    getMessage() {
      return this.customValue.message; // 'Hello from useFactory!'
    }
  }
  ```

- **`useExisting`**: 다른 프로바이더의 인스턴스를 재사용한다. 즉, 기존 프로바이더의 인스턴스를 참조하여 같은 인스턴스를 여러 토큰으로 주입할 수 있다.

  ```typescript
  export const BASE_SERVICE_TOKEN = Symbol('BASE_SERVICE_TOKEN');
  export const CUSTOM_TOKEN = Symbol('CUSTOM_TOKEN');
  
  @Injectable()
  export class BaseService {
    getMessage() {
      return 'Hello from BaseService!';
    }
  }
  
  @Module({
    providers: [
      {
        provide: BASE_SERVICE_TOKEN,
        useClass: BaseService,
      },
      {
        provide: CUSTOM_TOKEN,
        useExisting: BASE_SERVICE_TOKEN, // BASE_SERVICE_TOKEN의 인스턴스를 사용
      },
    ],
  })
  export class CustomModule {}
  
  @Injectable()
  export class MyService {
    constructor(@Inject(CUSTOM_TOKEN) private readonly baseService: BaseService) {}
  
    getMessage() {
      return this.baseService.getMessage(); // 'Hello from BaseService!'
    }
  }
  ```

### 2) 토큰을 통해 주입된 의존성 사용

해당 토큰을 통해 주입된 의존성을 클래스에서 사용하려면, `@Inject()` 데코레이터를 사용하여 명시적으로 주입해야 한다. 여기서 `@Inject(CUSTOM_TOKEN)` 데코레이터를 사용하여, `CUSTOM_TOKEN`에 등록된 값을 의존성으로 주입받는다.

```typescript
@Injectable()
export class MyService {
  constructor(@Inject(CUSTOM_TOKEN) private readonly customToken: any) {}

  getMessage(): string {
    return this.customToken.message;
  }
}
```

## 3. 여러 인스턴스를 주입해야 할 때

NestJS에서는 같은 클래스의 여러 인스턴스를 다룰 때, 토큰을 사용하는 것이 매우 유용하다. 예를 들어, 여러 개의 Redis 클라이언트 인스턴스를 사용해야 할 때는 각 인스턴스를 각각의 토큰으로 등록하고 주입할 수 있다. 아래와 같이 `REDIS_CLIENT_1`과 `REDIS_CLIENT_2` 토큰을 이용해 두 개의 서로 다른 Redis 클라이언트를 주입받아 사용할 수 있습니다.

```typescript
export const REDIS_CLIENT_1 = Symbol('REDIS_CLIENT_1');
export const REDIS_CLIENT_2 = Symbol('REDIS_CLIENT_2');

@Module({
  providers: [
    {
      provide: REDIS_CLIENT_1,
      useFactory: () => {
        return new Redis({ host: 'localhost', port: 6379 });
      },
    },
    {
      provide: REDIS_CLIENT_2,
      useFactory: () => {
        return new Redis({ host: 'localhost', port: 6380 });
      },
    },
  ],
  exports: [REDIS_CLIENT_1, REDIS_CLIENT_2],
})
export class RedisModule {}
```

```typescript
@Injectable()
export class MyService {
  constructor(
    @Inject(REDIS_CLIENT_1) private readonly redisClient1: Redis,
    @Inject(REDIS_CLIENT_2) private readonly redisClient2: Redis,
  ) {}

  useRedis() {
    // 두 클라이언트 사용 가능
    this.redisClient1.set('key1', 'value1');
    this.redisClient2.set('key2', 'value2');
  }
}
```

## 4. 토큰을 이용한 DI의 장점

1. 유연성 

   동일한 클래스의 여러 인스턴스를 관리할 수 있다. 예를 들어, Redis 클라이언트처럼 동일한 타입의 여러 객체가 필요할 때 각 객체를 고유한 토큰으로 구분하여 주입하기 용이하다.

2. 명시적인 의존성 관리

   특정 토큰을 사용하여 의존성을 명시적으로 정의함으로써, 코드의 가독성을 높이고 의존성 관계를 이해하기 쉽게 만든다. 특히, 큰 애플리케이션에서는 어떤 인스턴스가 주입되는지 쉽게 확인할 수 있다.

3. 재사용성

   이미 정의된 프로바이더를 재사용하거나 조합할 수 있다. `useExisting`을 사용하여 다른 프로바이더를 재사용하면, 코드 중복을 줄이고 유지보수를 쉽게 할 수 있다.

4. 유연한 생성 로직

   `useFactory`를 사용하여 인스턴스를 생성할 때, 생성 로직을 동적으로 정의할 수 있다. 이는 애플리케이션의 환경 변수나 설정에 따라 다르게 생성할 수 있게 해주며, 유연성을 높인다.

5. 다양한 타입 지원

   토큰을 사용하면 객체뿐만 아니라 원시 값, 배열, 함수 등 다양한 타입의 의존성을 주입할 수 있고, 이는 유연한 코드 작성을 가능하게 한다.

6. 컨벤션과 충돌 방지

   클래스 이름이나 인스턴스 이름이 중복되는 경우, 토큰을 사용하면 충돌을 피할 수 있다. 각 토큰은 고유하기 때문에, 서로 다른 의존성을 안전하게 주입할 수 있다.



## 5. 실제 사용 사례

이미지를 삭제하는 모듈과 서비스를 만들어 사용했던 사례이다.

1. DI 토큰 정의

   ```typescript
   export const OLD_IMAGE_DELETE = Symbol('OLD_IMAGE_DELETE');
   ```

   `Symbol`을 사용하여 고유한 토큰을 정의한다. `Symbol`은 유일성이 보장되므로, 여러 프로바이더 간의 이름 충돌을 피할 수 있다. 이 코드를 별도의 파일에 저장하여 프로젝트 구조를 깔끔하게 유지하고 어느 곳에서도 쉽게 import하여 재사용성을 높일 수 있다.

2. 토큰 등록

   ```typescript
   @Module({
     imports: [TypeOrmModule.forFeature([Image]), AwsS3Module],
     providers: [
       ImageRepository,
       {
         provide: OLD_IMAGE_DELETE_DAY,
         useValue: 10,
       },
       OldImageDeleteService
     ],
   })
   export class OldImageDeleteModule {}
   ```

   해당 모듈에 useValue를 사용하여 토큰을 주입하였다. useValue를 사용한 이유는, `OLD_IMAGE_DELETE_DAY` 토큰에 보존 기간을 의미하는 10이라는 값을 할당하고, 언제 어디서든 재사용하기 위함이다.

3. 토큰 사용

   ```typescript
   @Injectable()
   export class OldImageClearService {
     constructor(@Inject(OLD_IMAGE_DELETE_DAY) private readonly DELETE_CRITERIA_DAY: number) {}
     
       private async imagesDelete() {
       const period = `${this.DELETE_CRITERIA_DAY} days'`;
     }
   }
   ```

   `constructor`에서 `@Inject(OLD_IMAGE_DELETE)`를 사용하여 `OLD_IMAGE_DELETE` 토큰에 해당하는 값을 주입받는다.  이 경우, `10`이라는 값이 `DELETE_CRITERIA_DAY` 변수에 할당된다.

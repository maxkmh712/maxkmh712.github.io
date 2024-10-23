---
layout: single
title: "[ TYPESCRIPT ] 인터페이스"
typora-root-url: ../
categories: [TYPESCRIPT]
tag: [interface]
author_profile: true # 연락처 정보 숨기기
search: true
toc: true
toc_sticky: true

---

![typescript](/images/2024-10-23-typescript-interface/typescript.png)

## 인터페이스 개념

- 컴퓨터 과학에서의 인터페이스 : 상호 간에 정의한 약속 혹은 규칙

- 타입스크립트에서의 인터페이스 : 객체의 구조를 정의하는데 사용되는 타입의 일종, 즉 어떠한 객체를 생성 했을 때 가져야 할 속성 또는 메서드를 정의한다고 보면 된다.
- 사용 목적 : 인터페이스는 클래스와 유사해보이지만, 인터페이스는 객체 인스턴스를 생성할 수 없고, 타입 검사가 사용 목적이 된다.



## 인터페이스 기본 구조

```typescript
interface Person {
  name: string;
  age: number;
  greet(): void;
}
```

- 여기서 `Person` 이라는 인터페이스는 객체가 name과 age라는 속성을 가져야 하고, greet라는 메서드를 정의하고 있다는 뜻이다. 

```typescript
const user: Person = {
  name: "Max",
  age: 25,
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  },
};
```

- 여기서 `user` 객체는 `Person`인터페이스를 따르고 있으므로, 각각을 정확히 구현해야 한다.



## 인터페이스 주요 특징

### 1. 선택적 속성

인터페이스에서 일부 속성은 선택적으로 만들 수 있다. 이를 선택적 속성(Optional Properties)이라고 하며, 속성 이름 뒤에 `?`를 붙여 정의한다.

```typescript
interface 인터페이스_이름 {
  속성?: 타입;
}
```

```typescript
interface Car {
  brand: string;
  model: string;
  year?: number;
}

let myCar = {
  model: 'morning'
}

function test(car: Car) {
  console.log(car.mod) // Property 'mod' does not exist on type 'Car'.
}
```

- 여기서 `year`속성은 선택적이므로, 이 속성이 없는 객체도 유효하다.
- 선택적 속성의 장점은 단순히 인터페이스를 사용할 때 속성을 선택적으로 적용할 수 있다는 것 뿐만 아니라 인터페이스에 정의되어 있지 않은 속성에 대해서 인지시켜줄 수 있다는 점이다.

### 2. 읽기 전용

읽기 전용 속성(Readonly Properties)이란 인터페이스로 객체를 처음 생성할 때만 값을 할당하고 그 이후에는 변경할 수 없는 속성을 의미한다. 문법은 아래와 같이 `readonly`를 속성 앞에 붙이고, 읽기 전용 속성은 초기화된 후 값을 변경할 수 없다.

```typescript
interface Point {
  readonly x: number;
  readonly y: number;
}
```

### 3. 함수 타입

인터페이스는 함수의 타입(Function Types)도 정의할 수 있다.

```typescript
interface SumFunction {
  (a: number, b: number): number;
}

const sum: SumFunction = (a, b) => a + b;
```

### 4. 확장

인터페이스는 상속처럼 다른 인터페이스를 확장할 수 있다. `extends` 키워드를 사용한다. 콤마 `,` 를 사용하여 다중 확장 설정도 가능한다.

```typescript
interface Animal {
  name: string;
  sound(): void;
}

interface Dog extends Animal {
  breed: string;
}

const myDog: Dog = {
  name: "Buddy",
  breed: "Golden Retriever",
  sound() {
    console.log("Woof!");
  },
};
```

## 객체 선언과 관련된 타입 체킹

```typescript
interface Car {
  model: string;
  year?: number;
}

function test(car: Car) {
// ...
}

test({ modelsssss: "what" })
// Object literal may only specify known properties, and 'modelsssss' does not exist in type 'Car'.
```

- `Car` 인터페이스에는 `model`이라고 선언되어 있지만 `test()` 함수에 인자로 넘기는 객체에는 `modelsssss`라고 선언되어 있어 오탈자 점검을 요하는 오류가 발생한다.

```typescript
test({ modelsssss: "what" } as Car);
```

- 또한, 이와 같이 `as` 를 써서 타입 추론을 무시하는 방법도 있다.



## 클래스와의 관계

```typescript
class User implements Person {
  constructor(public name: string, public age: number) {}

  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
}
```

- 클래스는 인터페이스를 구현(`implements`) 할 수 있다. 이는 해당 클래스가 인터페이스에서 정의한 구조를 준수하고 있다는 것을 의미한다.
- 여기서 `User` 클래스는 `Person` 인터페이스를 구현하고 있으며, `name`, `age` 속성과 `greet` 메서드를 반드시 정의해야 한다.

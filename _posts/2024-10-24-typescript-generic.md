---
layout: single
title: "[ TYPESCRIPT ] 제네릭"
typora-root-url: ../
categories: [TYPESCRIPT]
tag: [generic]
author_profile: true # 연락처 정보 숨기기
search: true
toc: true
toc_sticky: true

---

![typescript](/images/2024-10-24-typescript-generic/typescript.png)

## 제네릭 개념

- 타입스크립트의 제네릭(Generics)이란 **코드의 타입을 변수처럼 다루는 기능**이다.

- 타입을 미리 정하지 않고 코드가 호출될 때 타입을 지정하여 더욱 유연하게 타입 안정성을 유지하면서  재사용성 높은 코드를 작성하게 해준다.
- 제네릭은 특히 함수, 클래스, 인터페이스에서 유용하게 활용된다.
- 제네릭을 사용하면 타입을 미리 특정하지 않아도 되므로 다양한 타입에서 사용할 수 있지만, 호출 시점에 타입 검사를 통해 오류를 방지할 수 있다.

## 제네릭 기본 사용법

- 제네릭은 주로 `<T>` 와 같은 타입 매개변수를 이용해 정의한다. `T`는 관용적인 식별자로 다른 이니셜을 사용해도 무방하다. 
- 가장 먼저 `<T>` 라는 코드를 함수의 이름 바로 뒤에 추가한다.
- 그리고 함수의 인자와 반환값에 모두 `T` 라는 타입을 추가한다.
- 예를 들어, 배열에서 첫번째 요소를 반환하는 `getFirst` 함수를 제네릭으로 작성하면 다음과 같다.

```typescript
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

const firstNumber = getFirst<number>([1, 2, 3]); 
// number 타입으로 사용

const firstString = getFirst<string>(["a", "b", "c"]); 
// string 타입으로 사용
```

- 위 예제에서 `T`는 호출 시점에 타입이 결정되므로 `getFirst`는 어떤 타입의 배열이든 받아서 그 타입을 반환할 수 있다.
- 설정된 타입이 아닌 다른 타입이 사용되면 컴파일 과정에서 오류 메세지를 출력한다.

```typescript
function logText<T>(text: T): T {
  console.log(text.length); 
  // Error: T doesn't have .length
  return text;
}
```

- 위 코드에서 컴파일 에러가 발생하는 이유는 `text`에 string 타입이 들어올지 number 타입이 들어올지 모른다는 점에서 `.length` 가 있다고 확신할 수 없기 때문이다. 이를 해결하기 위해서 아래들과 같이 변경할 수 있다.

```typescript
function logText<T>(text: T[]): T[] {
  console.log(text.length); 
  return text;
}

function logText<T>(text: Array<T>): Array<T> {
  console.log(text.length);
  return text;
}
```

- 차이점은 인자의 `T[]` 부분인데, 제네릭 타입이 배열이기 때문에 `length`를 허용한다.



## 클래스와 인터페이스에서의 사용

제네릭은 **클래스와 인터페이스**에서도 사용할 수 있다.

```typescript
class Storage<T> {
  private items: T[] = [];

  addItem(item: T): void {
    this.items.push(item);
  }

  getItem(index: number): T {
    return this.items[index];
  }
}

const stringStorage = new Storage<string>();
stringStorage.addItem("apple");
console.log(stringStorage.getItem(0)); // 'apple'

const numberStorage = new Storage<number>();
numberStorage.addItem(100);
console.log(numberStorage.getItem(0)); // 100
```

이 예제에서 `Storage` 클래스는 `T`라는 제네릭 타입을 사용하여 **어떤 타입의 데이터든** 저장할 수 있다.



## 제네릭 제약

제네릭의 타입을 제한하고 싶을 때는 **제약(Constraints)**을 사용할 수 있다. 예를 들어, 객체의 특정 키에 접근하는 함수를 만들 때 객체 타입에만 제네릭을 적용하고자 한다면 `extends` 키워드를 사용할 수 있다.

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "John", age: 30 };
console.log(getProperty(person, "name")); // 'John'
console.log(getProperty(person, "age")); // 30
```

여기서 `K extends keyof T`는 `key` 매개변수가 `T` 객체의 키들 중 하나여야 함을 의미한다. 이로써 `getProperty` 함수는 객체의 속성에 안전하게 접근할 수 있게 된다.



## 기본 타입 설정

제네릭 타입 매개변수에 기본값을 설정할 수도 있다. 이는 함수나 클래스가 호출될 때 타입이 명시되지 않으면 기본값을 사용하는 것이다.

```typescript
function createArray<T = string>(length: number, value: T): T[] {
  return Array(length).fill(value);
}

const stringArray = createArray(3, "hello"); // ['hello', 'hello', 'hello']
const numberArray = createArray<number>(3, 5); // [5, 5, 5]
```

여기서 `T = string`은 `createArray`가 호출될 때 타입이 명시되지 않으면 `string` 타입을 기본으로 사용하게 한다.



## 제네릭 활용 예시

제네릭을 사용하면 다양한 타입의 데이터를 하나의 함수로 변환할 수 있다.

```typescript
function transformArray<T, U>(arr: T[], transformFn: (item: T) => U): U[] {
  return arr.map(transformFn);
}

const numbers = [1, 2, 3];
const strings = transformArray(numbers, (num) => num.toString());
console.log(strings); // ['1', '2', '3']
```

이 예제는 숫자 배열을 문자열 배열로 변환한다. `transformArray` 함수는 입력 타입 `T`와 출력 타입 `U`를 받아 어떤 타입으로든 변환할 수 있다.

---
layout: single
title: "[ TYPESCRIPT ] 타입 개념과 종류"
typora-root-url: ../
categories: [TYPESCRIPT]
tag: [type]
author_profile: true # 연락처 정보 숨기기
search: true
toc: true
toc_sticky: true

---

![typescript](/images/2024-10-07-typescript-type/typescript.png)

📌 [타입스크립트 연습장](https://www.typescriptlang.org/play/?#code/PTAEHUFMBsGMHsC2lQBd5oBYoCoE8AHSAZVgCcBLA1UABWgEM8BzM+AVwDsATAGiwoBnUENANQAd0gAjQRVSQAUCEmYKsTKGYUAbpGF4OY0BoadYKdJMoL+gzAzIoz3UNEiPOofEVKVqAHSKymAAmkYI7NCuqGqcANag8ABmIjQUXrFOKBJMggBcISGgoAC0oACCbvCwDKgU8JkY7p7ehCTkVDQS2E6gnPCxGcwmZqDSTgzxxWWVoASMFmgYkAAeRJTInN3ymj4d-jSCeNsMq-wuoPaOltigAKoASgAywhK7SbGQZIIz5VWCFzSeCrZagNYbChbHaxUDcCjJZLfSDbExIAgUdxkUBIursJzCFJtXydajBBCcQQ0MwAUVWDEQC0gADVHBQGNJ3KAALygABEAAkYNAMOB4GRonzFBTBPB3AERcwABS0+mM9ysygc9wASmCKhwzQ8ZC8iHFzmB7BoXzcZmY7AYzEg-Fg0HUiQ58D0Ii8fLpDKZgj5SWxfPADlQAHJhAA5SASPlBFQAeS+ZHegmdWkgR1QjgUrmkeFATjNOmGWH0KAQiGhwkuNok4uiIgMHGxCyYrA4PCCJSAA)

# Type 개념

- 타입스크립트에서 타입이란 값이나 변수, 함수의 반환 값 등이 어떤 종류의 데이터를 가질 수 있는지를 정의하는 개념이다.

- Javascript는 동적 타입 언어 이기 때문에 변수에 어떤 타입의 값이든 할당할 수 있지만, Typescript는 정적 타입 언어로 변수가 특정 타입의 값만 가질 수 있도록 제할할 수 있다.

- Typescript는 Javascript를 포함하는 수퍼셋(Superset)이므로 Javascript가 지원하는 데이터 타입을 모두 사용할 수 있다. 뿐만 아니라 클래스, 인터페이스 등을 타입으로 설정할 수도 있다.

- Javascript는 기본 타입이 `any` 이기 때문에 Typescript에서는 `any`의 사용은 권장되지 않고, 명시적으로 타입을 설정하는 것이 권장된다.

  ```typescript
  let my_favorite_fruit; // 'any' 타입
  
  let my_favorite_sport: string;	
  
  my_favorite_sport = 'soccer';
  
  my_favorite_sport = 12345;
  // Type 'number' is not assignable to type 'string'.
  ```

- 타입을 설정할 경우 컴파일 시점에서 오류를 방지할 수 있어서 런타임 오류를 줄일 수 있고, 코드의 가독성이 향상되며, IDE의 자동 완성 기능이 강화되는 장점이 있다.

# Type 종류

## 1) primitive 타입

원시타입은 프로그래밍 언어에서 가장 기본적인 데이터 타입을 의미한다. 자바스크립트에서 사용하는 원시 타입을 그대로 타입스크립트에서 지원하며, 타입스크립트는 이를 기반으로 정적 타입을 부여하여 코드의 안정성을 향상시킨다. 

### - 주요 원시 타입

주요 원시 타입으로는 `number`, `string`, `boolean`, `null`, `undefined`, `symbol` 이 있고, 이를 명시적으로 설정한 변수 선언은 다음과 같이 작성한다.

```typescript
// 명시적으로 number 타입을 설정
let user_id:number = 12345;

// 명시적으로 string 타입을 설정
let user_name:string = '김타입';

// 명시적으로 boolean 타입을 설정
let is_active:boolean = false;

// 명시적으로 null 타입을 설정
let empty: null = null;

// 명시적으로 undefined 타입을 설정
let notAssigned: undefined = undefined;
```

## 2) null과 undefined

Javascript에서 `null`과 `undefined`는 데이터 타입이자 하나의 값이고 이는 Typescript에서도 동일하다. 두 값은 의미적으로 모두 '값이 없음'을 나타내지만 그 의미가 조금씩 다르다.

- `null` : 값이 없다는 것을 명시적으로 나타낸다.
- `undefined` : 변수나 속성이 정의도지 않았을 때를 명시적으로 나타낸다.

**tsconfig.json에서의 엄격한 null 체크**

```typescript
"strictNullChecks": true, 
/* 엄격한 null 검사 사용 */
```

위 값을 설정할 경우, 모든 데이터 타입은 `null`과 `undefined`를 할당 받을 수 없다. 다시 말해, 다른 타입들과 호환되지 않는다는 것이다. 예를 들면, `string`이나 `number` 타입에 `null`과 `undefined`를 할당할 수 없다는 것이다.

```typescript
let name: string;
let age: number;

name = "Alice";  // 정상
name = null;     // 오류: 'null' 타입은 'string'에 할당할 수 없습니다.
name = undefined;// 오류: 'undefined' 타입은 'string'에 할당할 수 없습니다.

age = 25;        // 정상
age = null;      // 오류: 'null' 타입은 'number'에 할당할 수 없습니다.
age = undefined; // 오류: 'undefined' 타입은 'number'에 할당할 수 없습니다.
```

이를 해결하고 싶을 경우, "strictNullChecks" 설정을 false로 바꾸는 방법이 있고, **유니언 타입**을 사용해서 명시해주어야 한다.

```typescript
let name: string | null | undefined;
let age: number | null | undefined;

name = "Alice";   // 정상
name = null;      // 정상
name = undefined; // 정상

age = 25;         // 정상
age = null;       // 정상
age = undefined;  // 정상
```

### 



## 3) any 타입

Javascript는 동적 타입 지정 언어이기 때문에 선언된 변수에 어떤 값이든 재할당이 가능하다. 반면에 Typescript는 명시적으로 데이터 유형을 설정하여 사용하는 정적 타입 지정 언어이기 때문에 특정 타입을 지정하여 사용하는 것이 권장된다. 하지만 때로는 타입 할당이 불분명할때 `any`를 설정할 수 있다.

```typescript
// 명시적으로 any 타입 지정
let user_id:any = 12345;

// 다른 타입으로 재할당 가능
user_id = 'abcde';

// 암시적으로 any 타입 지정
let product_id;
```

## 4) array 타입

배열 타입은 통일한 타입의 값들을 순차적으로 나열할 수 있는 데이터 구조를 정의한다. 배열 타이

### - 선언 방법

1. 배열 표기법(Array Notation)

   ```typescript
   let numbers: number[] = [1, 2, 3];
   let strings: string[] = ["hello", "world"];
   ```

2. 제네릭 배열 타입(Generic Array Type) 

   `Array<T>` 형식으로 선언할 수 있으며, 여기서 `T`는 배열 안에 들어갈 타입을 의미한다.

   ```typescript
   let numbers: Array<number> = [1, 2, 3];
   let strings: Array<string> = ["hello", "world"];
   ```

### - 특징

1. 배열의 모든 요소 타입 동일

   배열을 특정 타입으로 선언하면 그 배열의 모든 요소는 해당 타입을 따라야 한다.  다른 타입의 요소를 넣으려고 하면 컴파일 오류가 발생한다.

   ```typescript
   let numbers: number[] = [1, 2, 3];
   numbers.push("hello");
   // Argument of type 'string' is not assignable to parameter of type 'number'.

2. 빈 배열 초기화

   배열을 빈 상태로 초기화할 때에도 타입을 명시할 수 있다.

   ```typescript
   let names: string[] = [];
   names.push("Alice");
   names.push(42); 
   // Argument of type 'number' is not assignable to parameter of type 'string'.
   ```

3. 다차원 배열

   배열 안에 배열을 포함하는 다차원 배열을 정의할 수 있다.

   ```typescript
   let matrix: number[][] = [
     [1, 2, 3],
     [4, 5, 6],
     [7, 8, 9]
   ];
   ```

4. 유니언 타입을 사용한 배열

   배열의 요소들이 여러 타입을 가질 수 있도록 `유니언 타입`을 사용하여 정의할 수 있다.

   ```typescript
   let mixedArray: (number | string)[] = [1, "hello", 2, "world"];
   ```

### - 실무 예제

1. 객체 배열

   배열 안에 객체를 저장할 수 있으며, 배열의 각 객체가 특정 인터페이스를 따르도록 타입을 정의할 수 있다.

   ```typescript
   interface User {
     id: number;
     name: string;
   }
   
   let users: User[] = [
     { id: 1, name: "Alice" },
     { id: 2, name: "Bob" }
   ];
   ```

2. 배열을 반환하는 함수

   함수의 반환값을 배열 타입으로 지정할 수 있다.

   ```typescript
   function getScores(): number[] {
     return [90, 85, 88];
   }
   ```

3. 배열의 불변성

   타입스크립트에서는 배열을 **불변**으로 취급할 수도 있다. 예를 들어, `readonly` 키워드를 사용하면 배열을 수정할 수 없게 만들 수 있다.

   ```typescript
   let readonlyArray: readonly number[] = [1, 2, 3];
   readonlyArray.push(4);  
   // Property 'push' does not exist on type 'readonly number[]'.
   ```

## 5) tuple 타입

tuple 타입은 Typescript에서 고정된 크기와 타입 순서를 가진 배열을 정의하는 방법이다. 일반적인 배열과 달리, tuple은 각 요소의 타입이 다를 수 있으며, 특정한 순서로 요소들이 배열된다는 점이 특징이다. tuple은 두 개 이상의 값이 함께 묶여있지만, 각각의 값이 서로 다른 타입을 가질 수 있을 때 유용하게 사용된다. 배열은 같은 타입의 여러 값을 가질 수 있고, 길이가 가변적인 반면, 튜플은 다른 타입의 값을 고정된 순서로 가질 수 있으며, 길이가 고정된다는 점이 차이점이다.

### - 특징

1. 고정된 길이 : 튜플은 배열과 달리 길이가 고정되어 있어서, 미리 정의한 개수만큼의 요소만 가질 수 있다.
2. 고정된 타입 순서 : 튜플의 각 요소는 타입과 순서가 정해져 있어서, 요소가 순서에 맞지 않거나 타입이 일치하지 않으면 Typescript에서 오류가 발생한다.
3. 혼합 타입 지원 : 튜플의 각 요소는 서로 다른 타입을 가질 수 있다.

### - 선언 및 사용

튜플을 배열과 비슷한 방식으로 선언하지만, 요소들의 타입을 명시하여 선언한다. 각 요소는 타입과 순서를 맞춰야만 값을 할당할 수 있다.

```typescript
let tuple: [string, number];

tuple = ["hello", 10];  // 정상, 타입과 순서가 맞음

tuple = ["hello", "world"]; // Type 'string' is not assignable to type 'number'.
```

### - 요소 접근

튜플의 요소에 접근할 때는 배열과 마찬가지로 **인덱스**를 사용한다.

```typescript
console.log(tuple[0]);  // "hello"
console.log(tuple[1]);  // 10
```

### - 선택적 요소

**`?`**를 사용하여 선택적 요소(Optional Elements)를 정의할 수 있고, 이 경우 일부 요소가 생략될 수 있다. 그렇지만 순서는 고정된 순서를 따른다.

```typescript
let tupleWithOptional: [string, number?, boolean?];

tupleWithOptional = ["hello"];        // 정상
tupleWithOptional = ["hello", 10];    // 정상
tupleWithOptional = ["hello", 10, true]; // 정상
```

### - 나머지 요소

튜플에서도 나머지 요소(Rest Elements)를 사용하여 가변 길이를 허용할 수 있다. 나머지 요소는 배열처럼 동작하며, 하나 이상의 값을 가질 수 있다. 나머지 요소는 마지막에 정의되며, 배열처럼 여러 값을 받을 수 있는 특성을 가진다.

```typescript
let tupleWithRest: [string, ...number[]];

tupleWithRest = ["hello"];         // 정상
tupleWithRest = ["hello", 1, 2, 3]; // 정상, 나머지 요소로 숫자 배열을 받을 수 있음
```



## 6) symbol

symbol 타입은 ES6(ECMAScript 2015)에서 도입된 새로운 원시 타입으로 고유하고 변경 불가능한 값을 나타낸다. 주로 객체 속성의 고유한 식별자로 자주 사용되며, 자바스크립트에서 중요한 메타프로그래밍 기능을 제공한다.

### - 특징

1. 유일성 보장 : 심볼은 같은 설명을 사용해도 항상 서로 다른 유일한 값이다.
2. 변경 불가능 : 심볼은 한 번 생성되면 수정할 수 없다.
3. 객체 속성의 고유한 식별자(key)로 사용 : 일반적으로 문자열이나 숫자를 객체의 키로 사용하지만, 심볼은 고유성을 보장하기 때문에 키로 사용하면 충돌을 방지할 수 있다.

### - 생성

- 심볼은 `Symbol()` 함수를 사용해 생성할 수 있다.
- 심볼은 `new` 키워드로 생성할 수 없다.
- 이 함수는 항상 유일한 심볼 값을 반환한다.
- `Symbol()`에 전달된 문자열은 심볼 자체에 영향을 미치지 않으며, 오직 디버깅 용도나 로그 출력을 위한 설명으로만 사용된다.

```typescript
let sym1 = Symbol();           
let sym2 = Symbol("description");

console.log(sym1 === sym2); // false
```

### - 심볼을 객체 속성 키로 사용

심볼을 객체의 키로 사용하면, 해당 속성은 고유하기 때문에 다른 어떤 코드에서도 의도치 않게 이 속성을 덮어쓰거나 변경할 수 없다.

```typescript
let sym = Symbol("uniqueKey");
let obj = {
  [sym]: "value"   // 심볼을 객체의 키로 사용
};

console.log(obj[sym]); // "value"
```

💡`obj` 객체 안에서 `sym`이 대괄호 `[]` 안에 있는 이유는 **계산된 속성 이름**(computed property name)을 사용하기 위해서이다. 심볼을 객체의 키로 사용할 때, 대괄호 표기법을 통해 **변수에 저장된 심볼** 값을 객체의 속성 키로 사용할 수 있다.

일반적으로 객체의 속성 이름을 정의할 때는 점 표기법이나 문자열을 사용한다. 이 경우 속성 이름은 **문자열**로 고정되어 있으며, `key`는 문자열 "key"가 된다.

```typescript
let obj = {
  key: "value"         // 문자열 키
};

console.log(obj.key); // "value"
```

반면에 심볼이나 변수에 저장된 값을 객체의 속성 이름으로 사용할 때는 **계산된 속성 이름(Computed Property Name)**을 사용해야 한다. **계산된 속성 이름(Computed Property Name)**은 Javascript ES6부터 지원되는 속성으로 대괄호를 사용하여 동적으로 객체 속성 이름을 설정할 수 있는 문법이다. `[ ]` 안에 식을 넣고, 그 결과가 속성명으로 사용된다. 이것이 `sym`이 대괄호 안에 있는 이유이다.

```typescript
let sym = Symbol("uniqueKey");
let obj = {
  [sym]: "value"  // 계산된 속성 이름을 사용하여 sym을 속성 키로 사용
};

console.log(obj[sym]); // "value"
```

여기서 `sym`은 심볼이며, 객체 속성 키로는 **`sym`의 값**을 사용해야 한다. 만약 대괄호 없이 점 표기법을 사용한다면, 심볼이 아닌 문자열 `"sym"`이 키로 사용되게 되어 의도한 바와 다른 결과를 얻게 된다.

```typescript
let obj = {
  sym: "value"   // 문자열 "sym"이 키로 사용됨
};

console.log(obj[sym]);  // undefined, "sym"이라는 문자열 키가 아닌 심볼이 필요함
console.log(obj["sym"]); // "value"
```

### - 심볼과 일반 속성 간의 차이

심볼로 정의된 속성은 **비열거성**(non-enumerable)이다. 체에서 `for...in`이나 `Object.keys()` 같은 메서드를 사용하면 심볼로 정의된 속성은 열거되지 않는다. `Object.getOwnPropertySymbols(obj)` 메서드를 사용하면 객체에 정의된 심볼 키들을 확인할 수 있다.

```typescript
let sym = Symbol("hidden");
let obj = {
  visible: "I'm visible",
  [sym]: "You can't see me"
};

for (let key in obj) {
  console.log(key); // "visible"만 출력됨, 심볼 속성은 제외됨
}

console.log(Object.keys(obj));  // ["visible"], 심볼 속성은 제외됨
console.log(Object.getOwnPropertySymbols(obj)); // [ Symbol(hidden) ]
```

## 7) enum 타입

열거형(enum) 타입은 여러 개의 관련된 값을 하나의 그룹으로 묶어서 표현하는 방식이다. 이 값들은 상수로 취급되며, 가독성 높은 코드를 작성할 떄 유용하다.

### - 종류

1. 숫자형 열거형 (Numeric Enums)

   숫자형 열거형은 기본적으로 첫 번째 값부터 시작하여 자동으로 숫자를 할당한다. 명시적으로 값을 설정하지 않으면 첫 번째 값은 `0`부터 시작하고, 이후의 값은 순차적으로 1씩 증가한다.

   ```typescript
   enum Direction {
     Up,    // 0
     Down,  // 1
     Left,  // 2
     Right  // 3
   }
   
   console.log(Direction.Up);    // 0
   console.log(Direction.Down);  // 1
   console.log(Direction.Left);  // 2
   console.log(Direction.Right); // 3
   ```

   숫자형 열거형은 명시적으로 숫자를 할당할 수도 있다. 할당된 값 이후의 값들은 그 다음 숫자부터 자동으로 증가한다.

   ```typescript
   enum Direction {
     Up = 10,    // 10
     Down,       // 11
     Left = 20,  // 20
     Right       // 21
   }
   
   console.log(Direction.Up);    // 10
   console.log(Direction.Down);  // 11
   console.log(Direction.Left);  // 20
   console.log(Direction.Right); // 21
   
   ```

2. 문자열 열거형 (String Enums)

   문자열 열거형은 각 값에 문자열을 할당하며, 자동으로 값을 증가시키는 숫자형 열거형과 달리 명시적으로 문자열을 할당해야한다. 문자열 열거형은 주로 코드의 가독성을 높이기 위해 사용된다.

   ```typescript
   enum Direction {
     Up = "UP",
     Down = "DOWN",
     Left = "LEFT",
     Right = "RIGHT"
   }
   
   console.log(Direction.Up);    // "UP"
   console.log(Direction.Down);  // "DOWN"
   console.log(Direction.Left);  // "LEFT"
   console.log(Direction.Right); // "RIGHT"
   ```

3. 여럭형의 역방향 매핑 (Reverse Mapping)

   숫자형 열거형에서는 열거형의 **이름으로 값에 접근**할 수 있을 뿐만 아니라, **값으로도 열거형의 이름에 접근**할 수 있다.

### - `const enum`과 최적화

TypeScript는 컴파일 후에도 열거형 정보를 유지하기 때문에, 런타임에 사용하지 않는 열거형의 값을 포함하게 된다. 이를 방지하기 위해 **`const enum`**을 사용할 수 있다. `const enum`은 컴파일 시 **인라인** 처리되어 최적화된다. `const enum`을 사용하면 열거형 값을 **직접 숫자나 문자열 값으로 인라인**하여 삽입하므로 성능을 개선할 수 있다.

```typescript
const enum Direction {
  Up,
  Down,
  Left,
  Right
}

let dir = Direction.Up;   // 컴파일 결과: let dir = 0;
```

- 일반적인 `enum`과 `const enum`의 차이점

  두 방식의 차이점은 **컴파일 후에 열거형을 처리하는 방식**에 있다. 특히, **`const enum`**은 성능을 최적화하기 위해 **인라인(inline) 처리**되며, 컴파일된 JavaScript 코드에서 실제로 열거형을 정의하지 않고, **해당 값이 직접 대체**된다. 이 과정을 이해하기 위해 `enum`과 `const enum`이 컴파일될 때 어떤 차이가 있는지 알아보자

  1.  일반적인 `enum`의 컴파일 결과

     ```typescript
     // TypeScript 코드
     enum Direction {
       Up,
       Down,
       Left,
       Right
     }
     
     let dir = Direction.Up;
     ```

     ```javascript
     // 컴파일된 JavaScript 코드
     var Direction;
     (function (Direction) {
       Direction[Direction["Up"] = 0] = "Up";
       Direction[Direction["Down"] = 1] = "Down";
       Direction[Direction["Left"] = 2] = "Left";
       Direction[Direction["Right"] = 3] = "Right";
     })(Direction || (Direction = {}));
     
     var dir = Direction.Up;
     ```

     - 분석 

       JavaScript에서는 `enum`은 **객체**로 컴파일된다. 즉, `Direction`이라는 객체가 생성되고, 이 객체는 두 가지 매핑을 가지고 있다.

       1. 숫자 값으로부터 문자열 : `Direction[0] = "Up";`

       2. 문자열로부터 숫자 값 : `Direction["Up"] = 0;`

       또한, `enum`은 값을 통해 이름을 찾을 수 있고, 이름을 통해 값을 찾을 수 있는 **양방향 매핑**을 지원한다. 이 매핑을 통해 `Direction.Up`을 `0`으로 접근할 수 있고, `Direction[0]`을 통해 `Up`이라는 이름을 얻을 수 있다.

     - 문제점

       열거형은 **런타임에 객체로 정의**되므로, 컴파일 후에도 `Direction`이라는 객체가 메모리에 유지된다. 만약 이 열거형을 자주 사용하지 않는다면, 불필요한 메모리 사용과 코드 증가가 발생한다.

  2. `const enum`의 컴파일 결과

     ```typescript
     // TypeScript 코드
     const enum Direction {
       Up,
       Down,
       Left,
       Right
     }
     
     let dir = Direction.Up;
     ```

     ```javascript
     // 컴파일된 JavaScript 코드
     var dir = 0;
     ```

     - 분석

       컴파일된 JavaScript 코드에서 `Direction` 객체가 아예 존재하지 않는다. 또한, `Direction.Up`이 코드에서 사용될 때, TypeScript는 해당 값을 **직접 숫자 값으로 대체**한다. 즉, `Direction.Up`이 `0`으로 변환된 것이다. 이처럼 `const enum`은 **인라인 처리**되기 때문에 **객체를 생성하지 않고, 사용된 위치에 상수 값으로 대체**된다. 

     - 장점

       `const enum`은 런타임에 별도의 객체를 만들지 않기 때문에 메모리를 절약하고, 불필요한 코드가 줄어든다. 그렇기 때문에  자주 사용되는 열거형에서 특히 유리하다.

     - 단점 

       `const enum`은 인라인 처리되므로, 숫자로부터 이름을 찾는 **역방향 매핑(reverse mapping)**을 사용할 수 없다. 예를 들어, `Direction[0]`과 같이 값을 통해 이름을 얻는 기능은 사용할 수 없다. 열거형 객체 자체가 생성되지 않기 때문에 이 기능이 사라지는 것이다. 

     - 결론

       따라서, 만약 역방향 매핑이 필요 없고, 단순히 상수 값을 관리하는 용도로 열거형을 사용한다면, **`const enum`**을 사용하는 것이 성능 면에서 더 유리하다.

## 8) function 타입

함수 타입 (function type)은 함수의 **인자와 반환 값**의 타입을 명시하는 기능을 제공한다.

### - 기본적인 함수 타입 선언

가장 기본적인 함수 타입은 함수의 **매개변수(parameter)**와 **반환 값(return type)**의 타입을 명시한다.

```typescript
function add(a: number, b: number): number {
  return a + b;
}
```

- `add` 함수는 두 개의 `number` 타입 인자를 받아서, `number` 타입의 결과를 반환한다.
- **매개변수 타입**: `a: number`, `b: number`
- **반환 타입**: `number`

### - 선택적 매개변수

선택적 매개변수는 **`?`**를 이용해 정의하며, 함수 호출 시 전달되지 않을 수 있다.

```typescript
function greet(name: string, greeting?: string): string {
  if (greeting) {
    return `${greeting}, ${name}!`;
  }
  return `Hello, ${name}!`;
}

console.log(greet("John"));           // "Hello, John!"
console.log(greet("John", "Hi"));     // "Hi, John!"
```

- `greeting` 매개변수는 **선택적(optional)**이며, 호출할 때 전달되지 않아도 된다.
- 선택적 매개변수는 **필수 매개변수 뒤**에 와야 하며, 기본적으로 `undefined`로 처리된다.

### - 기본 매개변수

함수에 기본 값을 지정하여, 매개변수가 전달되지 않으면 기본 값을 사용할 수 있다.

```typescript
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

console.log(greet("John"));           // "Hello, John!"
console.log(greet("John", "Hi"));     // "Hi, John!"
```

- `greeting` 매개변수에 기본 값 `"Hello"`가 설정되어 있어, 값을 전달하지 않으면 기본 값을 사용한다.

### - 나머지 매개변수

나머지 매개변수는 가변 길이의 인자를 배열로 받을 수 있도록 해준다.

```typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, cur) => acc + cur, 0);
}

console.log(sum(1, 2, 3));   // 6
console.log(sum(4, 5, 6, 7)); // 22
```

- `...numbers: number[]`는 여러 개의 `number` 인자를 받아서 배열로 처리한다.

- 나머지 매개변수는 배열로 다루어지며, 여러 개의 인자를 한꺼번에 처리할 때 유용하다.

### - **noImplicitAny** 설정

`tsconfig.json`에 설정된 `noImplicitAny` 설정 값이 `true`일 경우, 명시적으로 타입 설정을 하지 않아 암묵적인 any 사용시 다음과 같은 컴파일 오류를 출력한다.

```typescript
// Parameter 'id' implicitly has an 'any' type.
// Parameter 'name' implicitly has an 'any' type.
function setInfo(id, name) {
  return { id, name };
}

let product_one = setInfo(120912, '스노우보드');
```

## 9) void 타입

`void`는 **값이 없는 경우** 또는 **아무것도 반환하지 않는 함수**를 나타내는 타입이다. 주로 함수의 **반환 타입**으로 사용되며, **함수가 아무것도 반환하지 않는다는** 것을 명시적으로 표현한다.

### - 사용

```typescript
function logMessage(message: string): void {
  console.log(message);
}

const result = logMessage("Hello, TypeScript!");  // result의 타입은 void
console.log(result); // undefined
```

- `logMessage` 함수는 인자로 받은 문자열을 콘솔에 출력할 뿐, 아무 값도 반환하지 않는다.
- 이 경우 함수의 반환 타입은 `void`로 정의되어 있으며, TypeScript는 이 함수가 값을 반환하지 않을 것을 예상한다.
- `logMessage` 함수는 값을 반환하지 않으므로, 함수 호출 결과는 **`undefined`**이다.
- 함수 자체가 `void` 타입이기 때문에 **결과 값을 사용하지 않는 것이** TypeScript에서 권장된다.

### - undefined와의 차이

```typescript
function returnUndefined(): undefined {
  return undefined; // 명시적으로 undefined 반환
}

function returnNothing(): void {
  // 아무것도 반환하지 않음
}

```

- **`void`**: 아무 값도 반환하지 않는 함수의 반환 타입으로, 함수가 명시적으로 값을 반환하지 않을 때 사용된다.
- **`ndefined`**: 자바스크립트에서 값이 정의되지 않은 상태를 나타내는 값으로, 명시적으로 `undefined`를 반환하거나, 값을 반환하지 않은 함수의 결과는 `undefined`일 수 있다.

### - any와의 차이

- **`any`**: 모든 타입을 허용하는 타입으로, 어떤 값이든 담을 수 있다. 반환값을 특정하지 않은 함수는 `any`로 반환될 수 있지만, 이는 코드 안전성 측면에서 문제가 될 수 있
- **`void`**: 반환값이 없음을 명시하며, 어떤 값도 허용하지 않는다. `void`를 사용하는 것은 함수가 **아무것도 반환하지 않는다는 의도**를 분명히 나타내는 안전한 선택이다.



## 10) union 타입

유니온 타입은 **하나 이상의 타입을 허용**하는 타입을 정의하는 방법이다. 특정 값이나 변수에 여러 타입 중 하나를 가질 수 있게 하는 타입을 의미하는 것이다. 

### - 사용

유니온 타입은 **`|` (파이프) 기호**를 사용하여 여러 타입을 나열한다.

```typescript
let value: string | number;

value = "hello"; // OK
value = 42;      // OK
value = true;    // Error: 'boolean' 타입은 할당할 수 없음
```

배열에서도 유니온 타입을 사용할 수 있다.

```typescript
let values: (string | number)[] = ["hello", 42, "world", 100];
```

### - 타입 가드

유니온 타입을 사용할 때, 특정 변수의 **실제 타입**을 구분하여 처리할 필요가 있을 때, Typescript에서는 타입 가드(Type Guard)를 사용하여 해결할 수 있다. **`typeof`** 연산자를 사용하여 런타임 시 변수의 타입을 확인하고, 해당 타입에 따라 다른 동작을 수행할 수 있다.

```typescript
function printId(id: string | number): void {
  if (typeof id === "string") {
    console.log("Your ID (string) is: " + id.toUpperCase()); // string 타입 전용 메서드 사용 가능
  } else {
    console.log("Your ID (number) is: " + id); // number 타입으로 동작
  }
}

printId(101);          // "Your ID (number) is: 101"
printId("abc123");     // "Your ID (string) is: ABC123"
```

### - union & null, undefined

TypeScript에서 `null`과 `undefined`도 유니온 타입을 사용하여 명시할 수 있다. 예를 들어, 함수가 값을 반환하지 않을 수도 있는 경우 반환 타입에 `null` 또는 `undefined`를 추가할 수 있다.

```typescript
function getUser(id: number): string | null {
  if (id === 0) {
    return null;
  }
  return "John Doe";
}

let user = getUser(0); // user의 타입은 string 또는 null
```



## 11) object 타입

`object` 타입은 비원시 값을 나타내는 타입으로, 객체를 가리키는 타입이다. 즉, 객체, 배열, 함수 등 **원시 타입이 아닌 모든 값**을 포함한다. `object` 타입을 사용하면 객체가 아닌 값(예: `number`, `string`, `boolean`, `symbol`, `null`, `undefined`)은 허용되지 않는다. `object` 타입은 객체를 가리키며, 객체의 구조에 대한 구체적인 정보를 제공하지 않고, **기본적으로 객체임을 나타내는** 범용적인 타입이다.

### - 사용

```typescript
let obj: object;

obj = { name: "Alice", age: 30 };  // OK
obj = [1, 2, 3];                  // OK, 배열도 객체이므로 허용됨
obj = function() { return "hi"; }; // OK, 함수도 객체이므로 허용됨

obj = "string";                    // Error: 'string'은 객체가 아님
obj = 42;                          // Error: 'number'는 객체가 아님
```

- `object` 타입은 원시 타입을 제외한 모든 값(배열, 함수, 객체 등)을 가질 수 있다.
- 문자열, 숫자, 불리언 등의 원시 타입은 허용되지 않는다.

### - `Object`, `object`, `{ }`의 차이

1. Object 타입

   - JavaScript의 **최상위 객체** 타입이다.
   - 원시 타입을 포함한 모든 값을 포함할 수 있다.

   ```typescript
   let obj: Object = "hello";  // OK, 'string'도 Object의 하위 타입
   obj = 42;                   // OK, 'number'도 Object의 하위 타입
   ```

2. object 타입

   - 가장 기본적인 객체 타입이다.
   - 원시 값은 허용되지 않지만, 객체의 구체적인 구조에 대한 정보를 제공하지 않는다.

   ```typescript
   let obj: object = { name: "Alice" };  // OK
   obj = [1, 2, 3];                      // OK
   ```

3. 빈 객체 { } 타입

   - 빈 객체 타입으로 사실상 모든 값을 허용한다.
   - { }는 객체뿐만 아니라 모든 값(원시 값 포함)을 허용하는 방식으로 동작한다.

   ```typescript
   let obj: {} = { name: "Alice" };  // OK
   obj = 42;                         // OK
   obj = "hello";                    // OK
   ```

### - 객체의 구체적인 타입 정의

object 타입은 객체의 구체적인 속성을 알 수 없기 때문에, TypeScript에서는 객체의 구조를 명시적으로 정의하는 방식으로 사용하는 경우가 많다. **인터페이스**나 **타입 별칭**을 사용하여 객체의 속성과 그 타입을 정의할 수 있다.

1. 인터페이스를 사용한 객체 타입 정의

   ```typescript
   interface Person {
     name: string;
     age: number;
   }
   
   let person: Person = { name: "Alice", age: 30 }; // OK
   ```

2. 타입 별칭을 사용한 객체 타입 정의

   ```typescript
   type Car = {
     brand: string;
     year: number;
   };
   
   let car: Car = { brand: "Toyota", year: 2022 }; // OK
   ```

### - object 타입의 실용성

`object` 타입은 구체적인 객체 구조를 알 필요가 없고, 단순히 **객체임을 확인**할 때 사용된다. 지만, 대부분의 경우에는 **인터페이스나 타입 별칭을 사용**해 객체의 구체적인 구조를 정의하는 것이 더 실용적이다.

```typescript
function processObject(obj: object): void {
  console.log(obj);
}

processObject({ key: "value" }); // OK
processObject([1, 2, 3]);        // OK
processObject("string");         // Error, 'string'은 객체가 아님
```

- `processObject` 함수는 `object` 타입을 매개변수로 받기 때문에, 객체나 배열은 허용되지만, 원시 값은 허용되지 않는다.



## 12) never 타입

**`never` 타입**은 **절대 발생하지 않는 값**을 나타내는 타입이다. 즉, **어떤 값도 절대로 반환되지 않는 상황**을 표현할 때 사용된다. `never`는 함수가 정상적으로 값을 반환하지 않거나, 실행이 끝나지 않는 경우에 주로 사용된다.

### - 오류를 던지는 함수

함수가 실행 중에 **예외를 던져서 종료**되면, 그 함수는 정상적으로 값을 반환하지 않고, 이때 그 함수는 `never` 타입을 반환한다고 정의할 수 있다.

```typescript
function throwError(message: string): never {
  throw new Error(message);  // 함수가 값을 반환하지 않고 예외를 던짐
}
```

`throwError` 함수는 `never` 타입을 반환한다. 이 함수는 실행 중에 예외를 던지기 때문에, **정상적으로 값을 반환하는 일이 없으므로** `never` 타입이 적절하다.

### - 무한루프에 빠지는 함수

함수가 **무한 루프에 빠져 끝없이 실행**된다면, 그 함수도 `never` 타입을 반환한다. 이는 실행이 끝날 일이 없기 때문에 어떤 값도 반환되지 않음을 의미하는 것이다.

```typescript
function infiniteLoop(): never {
  while (true) {
    // 무한 반복이므로 종료되지 않음
  }
}
```

### - 타입 체크에서 불가능한 상황

타입스크립트의 **타입 좁히기** 과정에서, 모든 가능한 경우가 다 처리된 후에도 남는 상황을 처리할 때 `never` 타입을 사용할 수 있다. 이런 경우는 **불가능한 상태를 명시**할 때 사용된다.

```typescript
type Shape = { kind: "circle", radius: number } | { kind: "square", sideLength: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
      throw new Error(`Unexpected shape: ${shape}`);
  }
}
```

- `getArea` 함수에서는 `Shape`의 모든 가능한 경우 (`circle`, `square`)를 처리한다.
- 만약 새로운 `Shape` 타입이 추가되거나, `switch`문에서 처리되지 않는 경우가 발생하면 `default` 구문에서 해당 경우를 처리하는데, 이때 `shape` 변수는 이미 **처리된 모든 가능한 경우를 제외한 나머지 상황**에서 `never` 타입이 된다.
- 이렇게 하면 **실수로 새로운 타입이 추가되었을 때 해당 타입을 처리하지 않는 경우**를 컴파일 시점에 잡아낼 수 있다.

### - 다른 타입과의 차이점

1. `void` 타입과의 차이점
   - `void` : **값을 반환하지 않는 함수**에 사용되지만, 이는 함수가 **정상적으로 실행을 마치고** 아무 값도 반환하지 않는 경우에 사용된다.
   - `never` : 정상적으로 함수가 끝나지 않거나, **오류가 발생하여 반환될 수 없는 경우**에 사용된다. 
2. `undefined` 타입과의 차이점
   - `undefined` : 값이 존재하지 않음을 나타낸다.
   - `never` :  실행이 종료되지 않는 상황에서만 사용된다.

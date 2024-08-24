---
layout: single
title: "[ 백엔드 ] RESTful API"
typora-root-url: ../
categories: [📌 BACKEND]
tag: [REST API]
author_profile: false # 연락처 정보 숨기기
sidebar: # 사이드바 네이게이션 수정
  # nav: "docs" # /_data/navigation.yml의 docs를 의미
  nav: "counts"
search: true

---

![restapi](/images/2024-08-23-first/restapi.png)

# 1. REST의 개념

- REST(Representational State Transfer)는 웹의 기존 기술과 프로토콜을 기반으로 설계된 아키텍처 스타일이다.
- 클라이언트와 서버 간의 통신을 간단하고 확장 가능하게 만드는 것을 목적으로 한다.
- RESTful API는 이러한 "REST 원칙을 따르는 API"라는 뜻으로 API가 REST 원칙에 충실하게 설계되었음을 강조할 때 사용된다.
- **REST API**는 RESTful한 API를 포함하지만 더 넓게 사용될 수 있는 용어이고, 두 개가 흔히 혼용되지만, 엄밀하게 구분하자면 RESTful API가 좀 더 엄격한 REST 준수성을 나타낸다.



# 2. REST의 6가지 기본 원칙

1. 클라이언트-서버 구조(Client-Server Architecture)

   - 설명: 클라이언트와 서버를 분리하여, 클라이언트는 사용자 인터페이스를 담당하며 자원을 요청하는 쪽이고 서버는 자원을 저장하여 제공하고 및 비즈니스 로직을 처리한다.

   - 이점: 이러한 분리로 인해 클라이언트와 서버가 독립적으로 확장될 수 있다.

2. 무상태(Stateless)

   - 설명: 각 요청은 완전하고 독립적이며, 서버는 클라이언트의 상태를 저장하지 않는다. 모든 정보(인증 정보 등)는 각 요청에 포함되어야 한다.
   - 이점: 서버의 확장성과 신뢰성을 높이며, 요청을 쉽게 캐싱하거나 로드 밸런싱할 수 있다.

3. 캐시 가능(Cacheable)

   - 설명: 클라이언트는 서버 응답을 캐시할 수 있어야 하며, 서버는 응답이 캐시 가능한지 여부를 명시해야 한다.
   - 이점: 네트워크 트래픽을 줄이고 성능을 향상시킨다.

4. 계층화(Layered System)

   - 설명: RESTful 시스템은 계층화될 수 있다. 클라이언트는 직접 서버와 통신하는지 또는 중간 계층(프록시, 게이트웨이 등)을 통해 통신하는지 알 수 없다.
   - 이점: 시스템의 유연성과 확장성을 높여 보안 계층 또는 로드 밸런싱 계층 등을 추가할 수 있다.

5. 인터페이스 일관성(Uniform Interface)

   - 설명: RESTful API는 일관된 인터페이스를 제공해야 하며, 리소스(URL), HTTP 메서드, 상태 코드 등의 사용이 일관되어야 한다.
   - 이점: API 설계와 사용이 간단하고 직관적이며, 여러 클라이언트가 쉽게 상호작용할 수 있다.

6. 요구에 따른 코드 전송(Code on Demand) (선택적)

   - 설명: 필요에 따라 클라이언트는 서버로부터 코드를 다운로드하여 실행할 수 있다
   - 이점: 클라이언트의 기능을 확장할 수 있지만, 이 원칙은 선택 사항이다.



# 3. REST API URI 네이밍 원칙

1. 명사를 사용하여 자원을 표현해라

   - 문서(Document)

     ```
     http://api.example.com/device-management/managed-devices/{device-id}
     http://api.example.com/user-management/users/{id}
     http://api.example.com/user-management/users/admin
     ```

     - 문서 자원 = 단일 개념 (ex.객체 인스턴스, 데이터베이스 레코드 등)
     - 단수를 사용해서 문서 자원을 표현해라 (device-management, user-management)

   - 컬렉션(Collection)

     ```
     /user-management/users
     /user-management/users/{id}/accounts
     ```

     - 서버가 관리하는 리소스 디렉토리
     - 클라이언트에 의해 새로운 리소스 추가가 요청될 수 있다 (POST 사용)
     - 복수를 사용해라 (users)

   - 스토어(Store)

     ```
     /song-management/users/{id}/playlists
     ```

     - 클라이언트가 관리하는 리소스 저장소
     - 클라이언트는 API를 이용하여 자원을 넣거나 가져올 수 있고 삭제할 수 있다.
     - 복수를 사용해라 (playlists)

   - 컨트롤러(Controller)

     ```
     http://api.example.com/cart-management/users/{id}/cart/checkout  http://api.example.com/song-management/users/{id}/playlist/play
     ```

     - 문서, 컬렉션, 스토어로 해결하기 어려운 추가 프로세스 실행
     - 특정 자원을 가리키는 것이 아니라 실행인만큼 예외적으로 동사 사용 (checkout, play)

2. 일관성이 핵심이다

   - 슬래시(/)를 사용하여 계층 관계를 나타내라

     ```
     /device-management
     /device-management/managed-devices
     /device-management/managed-devices/{id}
     /device-management/managed-devices/{id}/scripts
     /device-management/managed-devices/{id}/scripts/{id}
     ```

   - URI 마지막에 슬래시(/)를 사용하지 마라

     ```
     http://api.example.com/device-management/managed-devices/ 
     
     http://api.example.com/device-management/managed-devices         /*This is much better version*/
     ```

   - URI 가독성을 위해 언더바(_)를 사용하지 말고 하이픈(-)을 사용해라

     ```
     http://api.example.com/devicemanagement/manageddevices/
     
     http://api.example.com/device-management/managed-devices 	
     /*This is much better version*/
     ```

     애플리케이션 글꼴에 따라 일부 브라우저나 화면에서는 언더바(_)가 안보일 수 있기 때문이다.

   - URI에 소문자를 사용해라

     ```
     http://api.example.org/my-folder/my-doc       //1
     HTTP://API.EXAMPLE.ORG/my-folder/my-doc       //2
     http://api.example.org/My-Folder/my-doc       //3
     ```

     schem, host 는 대소문가 구분이 없으나 이외에는 모두 대소문자가 구분된다. 1,2번은 동일하지만 3번은 다른 URI이다.

   - 파일의 확장자는 사용하지 마라

     ```
     /device-management/managed-devices.xml  /*Do not use it*/
     
     /device-management/managed-devices 	/*This is correct URI*/
     ```

     파일 확장자를 사용하는 것은 길이가 늘어나고 보기에 좋지 않고 이것을 사용하는데 아무런 이점도 없기 때문이다. 그럼에도 파일 확장자를 사용하여 API의 미디어 유형을 강조하려면, 헤더의 Content-Type을 사용하는 것이 좋다.

   - URI에 CRUD 함수 명을 사용하지 마라

     ```
     HTTP GET /device-management/managed-devices  			
     //Get all devices
     
     HTTP POST /device-management/managed-devices  			
     //Create new Device
     
     HTTP GET /device-management/managed-devices/{id}  		
     //Get device for given Id
     
     HTTP PUT /device-management/managed-devices/{id}  		
     //Update device for given Id
     
     HTTP DELETE /device-management/managed-devices/{id}  	
     //Delete device for given Id
     ```

     URI는 어떤 동작을 가리키는 것이 아니라 자원을 가리키는 것이다. CRUD는 HTTP 요청 메소드를 이용해 표현할 수 있다.

   - 자원의 필터링을 하기 위해서는 쿼리 파라미터를 사용해라

     ```
     /device-management/managed-devices
     
     /device-management/managed-devices?region=USA
     
     /device-management/managed-devices?region=USA&brand=XYZ
     
     /device-management/managed-devices?region=USA&brand=XYZ&sort=installation-date
     ```

     자원을 정렬, 필터링하거나 제한 조건이 필요할 경우, 새 API를 만들지 말고 쿼리 파라미터를 사용해라

3. URI에 동사를 사용하지 마라

   REST는 명사를 사용하여 자원을 표현하고, HTTP 메서 (GET, POST, PUT, DELETE, etc.)를 사용해서 동사 역할을 수행한다. 

   ```
   /device-management/managed-devices/{id}/scripts/{id}/execute    
   //It is RPC, and not REST
   
   /device-management/managed-devices/{id}/scripts/{id}/status		
   //POST request with action=execute
   ```

   

✍🏻 RPC 호출



참고

https://restfulapi.net/resource-naming/

https://prohannah.tistory.com/156

https://medium.com/tech-pentasecurity/restful-api-%EB%84%A4%EC%9D%B4%EB%B0%8D-7c81bdb9da63

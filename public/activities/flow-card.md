# [login-game] 컴포넌트 사용법

## 1. JSON 파일 생성
`public/activities`에 (활동명).json으로 프로그램 활동을 구분할 수 있는 명으로 형식에 맞춰 파일을 생성합니다. `data`와 `manifest`는 화면에 카드를 생성하는데 필요한 데이터입니다.

* element`[String]` -  `flow-card` (적용할 component의 태그명)
* attributes`[Object]`
  * max`[Number]` - 카드 수
* data`[Array]` - manifest의 이미지 수 만큼 [x, y] 배열
  * background`[Boolean]` - true 경우, 맞춰야 하는 그림에 회색으로 배경이 생깁니다.
  * first`[Number]` - 첫 순서의 번호
  * last`[Number]` - 마지막 순서의 번호
* manifest`[Array]`
  * src`[String]` - 이미지 주소
  * step`[Number]` - 이미지 순서입니다. 가짜카드는 step 값이 없어도 됩니다.

* msg[Object]: 다국어 적용에 사용되는 메세지 ko(한국어), en(영어)
  * `(lang)` - 적용할 언어 키
    * `common.md` 동일

## 2. books.json에 추가
`public/login/books.json`에 `/activity#!`뒤에 `public/activities`에 추가하였던 JSON파일 명을 적으시면 됩니다.

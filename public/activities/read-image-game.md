# [login-game] 컴포넌트 사용법

## 1. JSON 파일 생성
`public/activities`에 (활동명).json으로 프로그램 활동을 구분할 수 있는 명으로 형식에 맞춰 파일을 생성합니다. `data`와 `manifest`는 화면에 카드를 생성하는데 필요한 데이터입니다.

* element`[String]` -  `read-image-game` (적용할 component의 태그명)
* attributes`[Object]`
  * max`[Number]` - 카드 수
* data`[Array]` - manifest의 이미지 수 만큼 [x, y] 배열
  * x, y는 1~100 까지 선택해서 입력
* manifest`[Array]`
  * src`[String]` - 이미지 주소
  * text`[String]` - 이미지 클릭 후 글자
  * sound`[String]` - sound/ 에 저장된 [sound 명].mp3
    * /sound/complete.mp3 이면 complete.mp3을 입력하면 됩니다.
  * id`[String]` - 1부터 차례로 입력



* msg[Object]: 다국어 적용에 사용되는 메세지 ko(한국어), en(영어)
  * `(lang)` - 적용할 언어 키
    * `common.md` 동일

## 2. books.json에 추가
`public/login/books.json`에 `/activity#!`뒤에 `public/activities`에 추가하였던 JSON파일 명을 적으시면 됩니다.

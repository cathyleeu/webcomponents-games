# [select-card] 컴포넌트 사용법

## 1. JSON 파일 생성
`public/activities`에 (활동명).json으로 프로그램 활동을 구분할 수 있는 명으로 형식에 맞춰 파일을 생성합니다. `data`와 `manifest`는 화면에 카드를 생성하는데 필요한 데이터입니다.

* element`[String]` -  적용할 component의 태그명
* attributes`[Object]`
  * max`[Number]` - result true값을 가지는 카드의 수 조정
  * trick`[Number]` - false값을 가지는 카드의 수 조정
  * lastStage`[Number]` - 마지막 단계를 정하는 수( 이 수를 지정해야지 nextlink가 실행 됨 )
  * nextlink`[String]` - 마지막 단계가 끝나고 넘어가고자 하는 링크
* data`[Array]` - /img 파일에 저장되는 사진명과 동일한 명으로 String 값으로 나열
* manifest`[Array]` - `id`, `src`, `result`  키를 가진 Object를 나열
    * id`[String]` - 이미지 파일명
    * src`[String]` - 이미지 경로
    * result`[Boolean]` - 옳은 카드 이미지에만 적용

* msg[Object]: 다국어 적용에 사용되는 메세지 ko(한국어), en(영어)
  * `(lang)` - 적용할 언어 키
    * `common.md` 동일 
    * subtitle(template): "아래의 그림 중 곡식을 클릭하세요.",
    * guide(template): 맞는 카드의 갯수를 알려주는 텍스트 맞는 카드가 json 작성에 따라 변경되기 때문에 고정 수 가 아닌 $ 값으로 입력 ex ) 힌트! 아래의 카드 중 곡식은 $ 가지가 있어요!

## 2. books.json에 추가
`public/login/books.json`에 `/activity#!`뒤에 `public/activities`에 추가하였던 JSON파일 명을 적으시면 됩니다.

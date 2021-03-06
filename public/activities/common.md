# 컴포넌트 사용법

## 1. JSON 파일 생성
`public/activities`에 (활동명).json으로 프로그램 활동을 구분할 수 있는 명으로 형식에 맞춰 파일을 생성합니다. `data`와 `manifest`는 화면에 카드를 생성하는데 필요한 데이터입니다.

* element`[String]` -  적용할 component의 태그명
* attributes`[Object]`
  * max`[Number]` - 최대로 보이고 싶은 카드의 수
  * nextlink`[String]` - 마지막 단계가 끝나고 넘어가고자 하는 링크
  * lastStage`[Number]` - 마지막 단계를 정하는 수
* data`[Array]` - /img 파일에 저장되는 사진명과 동일한 명으로 String 값으로 나열
* manifest`[Array]` -
  * [flip-card], [range-card] 경우, `id`, `src` 키를 가진 Object를 나열
    * id`[String]` - 이미지 파일명
    * src`[String]` - 이미지 경로
  * 그 외의 컴포넌트는 각 md 파일 참조

* msg[Object]: 다국어 적용에 사용되는 메세지 ko(한국어), en(영어)
  * `(lang)` - 적용할 언어 키
    * title(status bar)
    * lefted(status bar)
    * score(successModal)
    * success(successModal)
    * successHead(successModal)
    * logoutHead(logoutModal)
    * nextbtn(successModal)
    * successBtm(successModal)
    * logoutBtm(logoutModal)
    * previousBtm(previousModal)
    * previousHead(previousModal)
    * nobtn(previousModal,logoutModal)
    * yesbtn(previousModal,logoutModal)
    * finalStageHead(finalStageModal) - 마지막 단계에서 성공시 뜨는 모달의 헤더
    * finalStageBtm(finalStageModal) - 마지막 단계에서 성공시 뜨는 모달의 내용
    * finalbtn(finalStageModal) - 마지막 단계에서 성공시 뜨는 모달의 버튼에 들어갈 텍스트

## 2. books.json에 추가
`public/login/books.json`에 `/activity#!`뒤에 `public/activities`에 추가하였던 JSON파일 명을 적으시면 됩니다.

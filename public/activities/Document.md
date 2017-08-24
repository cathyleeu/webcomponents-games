# 키즈씽킹 웹 컴포넌트 가이드

* [range-card] 하단에 섞여진 카드를 상단에 정렬된 카드에 맞추는 활동
* [line-card] 짝 맞추는 카드 활동

## 컴포넌트 사용법
`public/activities`에 (활동명).json으로 프로그램 활동을 구분할 수 있는 명으로 형식에 맞춰 파일을 생성합니다.

Function | Description
---------|------------

* element`[String]` -  component 태그명
* data`[Array]` - /img 파일에 저장되는 사진명과 동일한 String 값으로 나열
* manifest`[Array]` - id와 src 키를 가진 Object를 나열

  * id`[String]` - 이미지 파일명,
  * src`[String]` - 이미지 경로
* msg[Object]: 다국어 적용에 사용되는 메세지 ko(한국어), en(영어)

  * `(lang)` - 적용할 언어 키
      * title(status bar)
      * lefted(status bar)
      * score(successModal)
      * success(successModal)
      * successHead(successModal)
      * logoutHead(successModal)
      * nextbtn(successModal)
      * successBtm(successModal)
      * logoutBtm(logoutModal)
      * previousBtm(previousModal)
      * previousHead(previousModal)
      * nobtn(previousModal,logoutModal)
      * yesbtn(previousModal,logoutModal)

## Example Code
bathroom.json의 Example code 입니다.

```
{
  "element": "range-card",
  "data": [
    "bath0",
    "bath1",
    "bath2",
    "bath3",
    "bath4",
    "bath5",
    "bath6"
  ],
  "manifest": [
    {"id": "bath0", "src": "/img/a5_5_w3/bath0.png"},
    {"id": "bath1", "src": "/img/a5_5_w3/bath1.png"},
    {"id": "bath2", "src": "/img/a5_5_w3/bath2.png"},
    {"id": "bath3", "src": "/img/a5_5_w3/bath3.png"},
    {"id": "bath4", "src": "/img/a5_5_w3/bath4.png"},
    {"id": "bath5", "src": "/img/a5_5_w3/bath5.png"},
    {"id": "bath6", "src": "/img/a5_5_w3/bath6.png"}
  ],
  "msg": {
    "ko": {
      "title": "그림에 맞춰, 목욕도구를 정리해보세요.",
      "score": "점수",
      "lefted": "맞춘 갯수",
      "success": "참 잘했어요!",
      "successHead": "참 잘했어요!",
      "logoutHead": "로그아웃",
      "previousHead" : "돌아가기",
      "successBtm" : "다음 단계로 넘어가시겠습니까?",
      "logoutBtm": "로그아웃 하시겠습니까?",
      "previousBtm": "이전으로 돌아가시겠습니까?",
      "nextbtn": "넘어가기",
      "nobtn" : "아니오",
      "yesbtn" : "예"
    },
    "en": {
      "title": "Along with the picture, arrange the bath tools.",
      "score": "score",
      "lefted": "matched",
      "success": "Good job!",
      "successHead": "Success",
      "logoutHead": "Log Out",
      "previousHead" : "Next",
      "successBtm" : "Do you want to move on to the next step?",
      "logoutBtm": "Do you want to logout",
      "previousBtm": "Do you want to move on to the previous step?",
      "nextbtn": "Back",
      "nobtn" : "No",
      "yesbtn" : "Yes"
    }
  }
}

```

# [objective-game] 컴포넌트 사용법
objective-game은 객관식과 OX 퀴즈로 구분됩니다.

## 1. JSON 파일 생성
`public/activities`에 (활동명).json으로 프로그램 활동을 구분할 수 있는 명으로 형식에 맞춰 파일을 생성합니다.
 이미지에 들어가는 텍스트에서 $를 대체합니다.

* element`[String]` -  `objective-game` (적용할 component의 태그명)
* attributes`[Object]`
  * gameType`[String]` - "ox" 또는 "obj" 로 퀴즈 유형을 구분합니다.
  * questions`[Array]` - 문제들을 {} 안에 특정 키에 맞춰 값을 입력후 나열합니다.
    * question`[String]` - 문제
    * questionImg`[String]` - 문제에 들어갈 이미지 주소 입력, 없는 경우에는 false 또는 입력 X
    * options`[Array]` - gameType이 "obj" 인 경우에만 사용됩니다. 보기에 들어갈 데이터를 {}에 특정 키에 맞춰 값을 입력합니다.
      * text`[String]` - 보기가 글자인 경우 ex) { "text" : "바다"}
      * img`[String]` - 보기가 이미지인 경우 ex) { "img" : "/img/renewed_a2/fish.png"}
* data`[Array]` - 공란
* manifest`[Array]` - 공란


* msg[Object]: 다국어 적용에 사용되는 메세지 ko(한국어), en(영어) 모달에 적용될 내용 꼭 넣어주세요!!
  * `(lang)` - 적용할 언어 키
    * `common.md` 동일


## 2. books.json에 추가
`public/login/books.json`에 `/activity#!`뒤에 `public/activities`에 추가하였던 JSON파일 명을 적으시면 됩니다.


## 3-1. json 예제 (객관식 문제일 경우)
  ```
{
  "element": "objective-game",
  "attributes": {
    "gameType" : "obj",
    "questions" : [{
      "question": "아래의 보기 중 $ 는 어디에서 잠을 자나요?", "questionImg": "/img/renewed_a2/bear.png",
      "options" : [
        { "text" : "바다"},
        { "img" : "/img/renewed_a2/fish.png"},
        { "img" : "/img/renewed_a2/frog.png"},
        { "text" : "육지", "answer": true }
      ]
    },
    {
      "question": "아래의 보기 중 $ 는 어디에서 잠을 자나요?", "questionImg": "/img/renewed_a2/fish.png",
      "options" : [
        { "text" : "바다" , "answer": true },
        { "img" : "/img/renewed_a2/fish.png" },
        { "img" : "/img/renewed_a2/frog.png" },
        { "text" : "육지" }
      ]
    },
    {
      "question": "아래의 보기 중 $ 는 어디에서 잠을 자나요?", "questionImg": "/img/renewed_a2/frog.png",
      "options" : [
        { "text" : "바다" },
        { "img" : "/img/renewed_a2/fish.png" },
        { "img" : "/img/renewed_a2/frog.png" },
        { "text" : "육지", "answer": true }
      ]
    },
    {
      "question": "아래의 보기 중 다람쥐 는 어디에서 잠을 자나요?",
      "options" : [
        { "text" : "바다" },
        { "img" : "/img/renewed_a2/fish.png" },
        { "img" : "/img/renewed_a2/frog.png" },
        { "text" : "육지", "answer": true }
      ]
    }]
  },
  "data": [],
  "manifest": [],
  "msg" : { ...생략 }
}

  ```

## 3-1. json 예제 (OX 문제일 경우)

  ```
  "element": "objective-game",
  "attributes": {
    "gameType" : "ox",
    "questions" : [
      { "question": " $ 는 땅에서 잠을 잡니다.", "questionImg": "/img/renewed_a2/bear.png", "answer": "O" },
      { "question": " $ 는 땅에서 잠을 잡니다.", "questionImg": "/img/renewed_a2/fish.png", "answer": "X" },
      { "question": " $ 는 나무에서 잠을 잡니다.", "questionImg": "/img/renewed_a2/frog.png", "answer": "X" },
      { "question": " $ 는 나무에서 잠을 잡니다.", "questionImg": "/img/renewed_a2/sqr.png", "answer": "O" }
    ]
  },
  "data": [],
  "manifest": [],
  "msg": { ...생략 }

  ```

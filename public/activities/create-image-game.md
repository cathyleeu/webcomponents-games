# [crete-image-game], [create-image-axis]컴포넌트 사용법


## JSON 파일 생성[crete-image-game]
`public/activities`에 (활동명).json으로 프로그램 활동을 구분할 수 있는 명으로 형식에 맞춰 파일을 생성합니다. `data`와 `manifest`는 화면을 그리는데 필수입니다.

* element`[String]` -  적용할 component의 태그명

* attributes`[Object]` -
    * limited`[Boolean]` - 이미지 아이템을 한번만 사용 가능한 경우(true), 무한으로 사용 가능 한 경우(false)에 따라 값을 입력하시면 됩니다.
    * nextlink`[String]` - 게임이 끝나고 다음페이지로 넘어가는 주소
    * group`[Array]` - 그룹이 있는 경우에만 설정합니다. ["그룹명1", "그룹명2"] 식으로 data의 키 값과 동일값을 나열합니다.

* data`[Array] || [Object]` - 드래그될 이미지들의 좌표들
    * 그룹이 없는 경우 : [x, y] - 0~100 사이의 수를 적어주시면 됩니다.
    * 그룹이 있는 경우 : { "그룹명1": [], "그룹명2": [] } - 키 값은 각 그룹명으로 적으시고, 그 안에 좌표값을 나열하시면 됩니다.

* manifest`[Array]` - `name`, `src`, `background` 키를 가진 Object를 나열
    * src`[String]` - 이미지 경로
    * name`[String]` - 이미지 파일명
    * background`[Boolean]` - 배경 이미지가 되는 하나의 이미지에만 true
    * group`[String]` - 이미지가 속하는 그룹명
    * axis`[Array]` - 이미지 아이템을 미리 설정하시고 싶으신 경우에 옵션으로 설정하시면 됩니다.

* json 예제
  * [그룹 X, 아이템 한번 사용, 예제 아이템 설정]

    ```
    "attributes": {
      "limited" : false // 이미지 아이템을 한번만 사용
    },
    "data": [
      [49.61,32.29],[64.06,31.9],[39.58,42.58],
      [56.51,44.92],[73.83,42.32],[57.42,56.38],
      [48.18,65.36],[67.32,64.19]
    ],
    "manifest": [
      {"src": "/img/renewed_c1/washer.png", "background": true},
      {"src": "/img/renewed_c1/bright1.png", "name": "shirt" , "axis" : [49.61,32.29]},
      {"src": "/img/renewed_c1/bright2.png", "name": "shorts" },
      {"src": "/img/renewed_c1/bright3.png", "name": "socks" },
      {"src": "/img/renewed_c1/bright4.png", "name": "vest" },
      {"src": "/img/renewed_c1/dark1.png", "name": "short_T" },
      {"src": "/img/renewed_c1/dark2.png", "name": "socks" },
      {"src": "/img/renewed_c1/dark3.png", "name": "dress" },
      {"src": "/img/renewed_c1/dark4.png", "name": "skirt" }
    ]
    ```
  * [그룹 O, 아이템 무한 사용, 예제 아이템 설정 없음]

    ```
    "attributes": {
      "limited" : true,
      "group": ["earth", "space"],
      "nextlink" : "activity#!a7_w2_c1"
    },
    "data": {
      "earth" : [[5.73,58.98],[20.44,59.51],[12.11,72.27],[20.44,74.74]],
      "space" : [[17.06,36.2],[31.25,24.61],[46.22,12.37],[64.71,24.61]]
    },
    "manifest": [
      {"src": "/img/renewed_c1/space.png", "background": true},
      {"src": "/img/renewed_c1/airplane.png", "name": "airplane" , "group" : "earth" },
      {"src": "/img/renewed_c1/astronaut.png", "name": "astronaut" , "group" : "space" },
      {"src": "/img/renewed_c1/flower.png", "name": "flower" , "group" : "earth"},
      {"src": "/img/renewed_c1/rocket.png", "name": "rocket" , "group" : "space" },
      {"src": "/img/renewed_c1/ship.png", "name": "ship" , "group" : "earth"}
    ]
    ```

## JSON 파일 생성[create-image-axis]
create-image-axis 는 마우스 클릭하면 점이 찍히면서 좌표값을 받아줍니다.
점을 찍은 후, 개발자 도구를 열어 console 창에 $$$$.getCreateImageDots()을 실행하면
좌표값이 출력됩니다. 그 좌표값을 [crete-image-game] json의 data에 입력하면 동일한 좌표값으로 점이 생성됩니다.

* element`[String]` -  적용할 component의 태그명
* manifest`[String]` - 적용할 배경이미지 링크 입력

## books.json에 추가
`public/login/books.json`에 `/activity#!`뒤에 `public/activities`에 추가하였던 JSON파일 명을 적으시면 됩니다.

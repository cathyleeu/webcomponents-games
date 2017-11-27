# [crete-image-game], [create-image-axis]컴포넌트 사용법


## JSON 파일 생성[crete-image-game]
`public/activities`에 (활동명).json으로 프로그램 활동을 구분할 수 있는 명으로 형식에 맞춰 파일을 생성합니다. `data`와 `manifest`는 화면을 그리는데 필수입니다.

* element`[String]` -  적용할 component의 태그명

* data`[Array]` - 드래그될 이미지들의 좌표들
    * [x, y] - 0~100 사이의 수를 적어주시면 됩니다.

* manifest`[Array]` - `name`, `src`, `background`  키를 가진 Object를 나열
    * src`[String]` - 이미지 경로
    * name`[String]` - 이미지 파일명
    * background`[Boolean]` - 배경 이미지가 되는 하나의 이미지에만 true


## JSON 파일 생성[create-image-axis]
create-image-axis 는 마우스 클릭하면 점이 찍히면서 좌표값을 받아줍니다.
점을 찍은 후, 개발자 도구를 열어 console 창에 $$$$.getCreateImageDots()을 실행하면
좌표값이 출력됩니다. 그 좌표값을 [crete-image-game] json의 data에 입력하면 동일한 좌표값으로 점이 생성됩니다.

* element`[String]` -  적용할 component의 태그명
* manifest`[String]` - 적용할 배경이미지 링크 입력

## books.json에 추가
`public/login/books.json`에 `/activity#!`뒤에 `public/activities`에 추가하였던 JSON파일 명을 적으시면 됩니다.

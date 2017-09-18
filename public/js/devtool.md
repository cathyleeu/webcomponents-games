# Devtool API Reference
  chrome에서 개발자 도구를 열고, console 창에서 사용 가능합니다.

* [Stage](#stage)
  * goNext
* [Character](#character)
  * rotate
* [Tile](#tile)
  * moveTile
  * addTile
  * removeTile
* [Map](#maze)
 * setMap
 * resetMap
 * printMap
 * downloadMap
* [Blockly](#blockly)
 * updateToolbox
 * updateWorkspace



## Stage
전체 단계를 명령하는 Api 입니다.

### goNext
현재 스테이지를 성공처리하고, 바로 "다음 단계로 이동" 버튼을 클릭하는 것과 같은 동작을 실행하는 api입니다.
```
$$$.goNext() // 다음 단계로 이동
```


## Character
메인 캐릭터에 대한 명령을 수행하는 Api 입니다.

### rotate`String`
메인캐릭터의 방향설정
 * "u" : 위
 * "d" : 아래
 * "r" : 오른쪽
 * "l" : 왼쪽    

```
$$$.rotate("d") // 캐릭터의 방향을 아래로 변경
```

## Tile
장애물, 목적지 등 타일에 대한 명령을 수행하는 Api입니다.

### moveTile`Number`

타일을 이동시키는 api `$$$.moveTile(x1, y1, x2, y2)`
 * x1, y1 : 움직이고자 하는 타일의 좌표
 * x2, y2 : 목적지의 좌표

```
$$$.moveTile(3,3,5,3) // (3,3)에 있던 타일을 (5,3)으로 이동
```

### addTile`Stringm, Number`
새로운 타일을 추가 하는 api `$$$.addTile(tile, x, y)`
  * tile: tile의 종류
    * "#" `String` : 장애물
    * "%" `String` : 목적지
    * ")" `String` : 아이템
    * 캐릭터 추가 할 경우, 방향을 `String` 값으로 입력하면 됩니다.
  * x, y: 추가하고자 하는 좌표값

```
$$$.addTile("#", 3, 5) // (3,5)에 장애물을 추가
```

### removeTile`Number`
타일을 제거하는 api `$$$.removeTile(x, y)`
  * x, y : 제거하고자 하는 위치

```
$$$.removeTile(3, 5) // (3,5)에 있는 타일을 제거
```



## Map
 map을 조작하는 Api입니다.

### printMap
 실행하면 maze의 상태가 console에 프린트 됩니다.
```
$$$.printMap() // map이 console에 프린트됨
```

### setMap
 1. 실행하면 입력창이 뜹니다.
 2. printMap에서 출력된 것과 같은 형태의 map을 입력창에 입력합니다.
 3. 입력된 값으로 새로운 map이 생성됩니다.

```
$$$.setMap() // map을 입력할 입력창을 띄움
```

### resetMap
 실행하면 맨 처음의 map으로 돌아갑니다.

```
$$$.resetMap() // map을 초기화
```

### downloadMap
 현재의 맵을 이미지파일(PNG)로 다운 받습니다. 

 ```
 $$$.downloadMap()
 ```


## Blockly
 블록을 조작하는 Api입니다.

### updateToolbox`String`
toolbox 안에 있는 블록 설정 Api
```
$$$.updateToolbox("move_forward,rotate_left") // 툴박스에 블록 2개 설정
```

### updateWorkspace`String`
Workspace 안에 있는 블록 설정 Api
```
$$$.updateWorkspace("start,repeat(3)[move_up,move_right]") // 워크스페이스에 블록 설정
```

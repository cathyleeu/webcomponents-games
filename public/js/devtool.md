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
* [Maze](#maze)
 * setMaze
 * resetMaze
 * printMaze
* [Blockly](#blockly)
 * updateToolbox
 * updateWorkspace



## Stage
전체 단계를 명령하는 Api 입니다.

### goNext
목적지까지 달성하지 않고, 바로 다음 단계로  실행하는 api입니다.
```
$$$.goNext()
```


## Character
메인 캐릭터를 명령하는 Api 입니다.

### rotate`String`
메인캐릭터의 방향설정
 * "u" : 위
 * "d" : 아래
 * "r" : 오른쪽
 * "l" : 왼쪽    

```
$$$.rotate("d")
```

## Tile
장애물, 목적지 등 타일에 명령하는 Api입니다.

### moveTile`Number`
타일을 움직이는 api `$$$.moveTile(x1, y1, x2, y2)`

 * x1, y1 : 움직이고자 하는 타일의 좌표
 * x2, y2 : 목적지의 좌표
```
$$$.moveTile(3,3,5,3) //(3,3)에 있던 타일이 (5,3)으로 이동됩니다.
```
### addTile`Stringm, Number`
타일 추가 하는 api `$$$.addTile(tile, x, y)`
  * tile 의 종류
    * #`String` : 장애물
    * %`String` : 목적지
    * )`String` : 아이템
    * 캐릭터 추가 할 경우, 방향을 `String` 값으로 입력하면 됩니다.
  * x, y : 추가하고자 하는 위치
```
$$$.addTile("#", 3, 5)
```

### removeTile`Number`
타일을 제거하는 api `$$$.removeTile(x, y)`
  * x, y : 제거하고자 하는 위치
```
$$$.removeTile( 3, 5 )
```



## Maze
 map에 명령하는 Api입니다.

### printMaze
 실행하면 maze의 console이 프린트 됩니다.
```
$$$.printMaze()
```

### setMaze
 1. 실행하면 입력창이 뜹니다.
 2. printMaze에서 받은 console 값을 입력창에 입력합니다.
 3. 입력된 console값으로 새로운 map이 생성됩니다.

```
$$$.setMaze()
```

### resetMaze
 실행하면 맨 처음의 map 상태로 돌아갑니다.

```
$$$.resetMaze()
```


## Blockly
 블럭을 명령하는 Api입니다.

### updateToolbox`Array`
toolbox 안에 있는 블럭 설정 Api
 1. toolbox 안에서 사용하고자 하는 블럭을 `String`값으로 배열을 만듭니다.
 2. updateToolbox([생성한 배열]) 을 실행합니다.

```
$$$.updateToolbox(["move_forward", "rotate_left"])
```

### updateWorkspace
Workspace 안에 있는 블럭 설정 Api

  1. Workspace 안에서 사용하고자 하는 블럭을 `String`값으로 배열을 만듭니다.
  2. updateWorkspace([생성한 배열]) 을 실행합니다.

```
$$$.updateWorkspace(["start"])
```

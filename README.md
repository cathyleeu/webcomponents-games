## 준비
  * [nodejs](https://nodejs.org/en/) >= v0.12
  * gulp, bower
    ```
    npm install -g gulp bower
    ```

## 설치
  ```
  git clone git@gitlab.com:toycode/kidscoding.git
  cd kidscoding
  npm install & bower install
  ```

## 서버 실행
  * 서버 시작
  ```
  npm start
  ```
  * 개발 환경에서의 실행
    * mongodb 실행
    ```
    mongod --dbpath ./db
    ```
    * 서버 자동 재실행
    ```
    nodemon --exec npm start
    ```

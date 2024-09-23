const express = require('express');
const app = express(); // app 변수에 할당
const path = require('path');

// 추가 파트
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();

app.set('port', process.env.PORT || 3000); // process에 있다면 쓰고 없으면 3000으로

// 미들웨어(app.use)는 위에서부터 아래로 실행된다.

/*
app.use(미들웨어)
app.use('/abc', 미들웨어)
app.post('/abc', 미들웨어)


*/

app.use(morgan('dev')); // http 로깅을 위한 미들웨어.
app.use('/', express.static(path.join(__dirname, 'public'))); // 실행되는 파일의 public 디렉토리의 파일들을 제공하겠다.
app.use(express.json()); // 클라이언트가 서버로 보낸 JSON 데이터를 javascript 객체로 변환하여 req.body에 저장.
app.use(express.urlencoded({ extended: false }));
// 1. URL 인코딩된 데이터를 처리할 수 있도록 하는 미들웨어
// 2. {extended: false} 는 쿼리스트링 모듈로 단순한 키-값 쌍으로 처리하겠다.

/*
예를 들어, JSON 형식으로 { name: 'zerocho', book: 'nodejs' }를 본문으로 보낸다면 req.body에 그대로 들어갑니다. URL-encoded 형식으로 name=zerocho&book=nodejs를 본문으로 보낸다면
req.body에 { name: 'zerocho', book: 'nodejs' }가 들어갑니다.
*/

app.use(cookieParser(process.env.COOKIE_SECRET));
// 쿠키를 해석하는 미들웨어
// 쿠키를 암호화하기 위한 비밀키를 가져온다.

/*

cookie-parser는 요청에 동봉된 쿠키를 해석해 req.cookies 객체로 만든다.

아래에서 쿠키에 서명을 붙이는데, name=zerocho -> name=zerocho.sign

이 비밀키를 통해서 서버에서 작성한 쿠키라는 것을 검증 가능.

*/



app.use(session({
  resave: false, // 세션데이터가 변경되지 않으면 세션을 저장하지 않는다.
  saveUninitialized: false, // 저장할 내용이 없는 세션을 저장하지 않습니다.
  secret: process.env.COOKIE_SECRET, // 세션을 암호화할때 쓰는 쿠키
  cookie: { // 세션 쿠키 설정
    httpOnly: true, // javascript로 접근하지 못하도록
    secure: false, // http에서도 쿠키가 전송되도록 한다.
  },
  name: 'session-cookie',
}));

// 모든 요청에 미들웨어를 적용할 거야. 그 미들웨어는 이거야.
app.use((req, res, next) => {
    console.log('모든 요청에 다 실행됩니다.');
    next(); // 그럼 아래 미들웨어로
  });


  app.get('/', (req, res, next) => {
    console.log('GET / 요청에서만 실행됩니다.');
    next(); // 바로 하단의 (res, res) 미들웨어로 옮긴다.
  }, (req, res) => {
    throw new Error('에러는 에러 처리 미들웨어로 갑니다.') // 강제 에러 발생.
  });
  

  // 에러처리 미들웨어 양식(err, req, res, next) 항상모든 미들웨어가 실행되고 나서 에러가 처리되어야 하므로
  // 항상 제일 하단에 적는다.
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
  });
  

  app.listen(app.get('port'), ()=>{
    console.log(app.get('port'));
});
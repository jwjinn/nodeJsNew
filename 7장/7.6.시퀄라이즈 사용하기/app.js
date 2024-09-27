const express = require('express');
const path = require('path');// 파일 및 디렉토리 경로 다루기
const morgan = require('morgan'); // HTTP 요청 로그 기록
const nunjucks = require('nunjucks'); // HTML 템플릿에 변수를 주입할 수 있게 한다.

const { sequelize } = require('./models'); 

const app = express();
app.set('port', process.env.PORT || 3001);
app.set('view engine', 'html');
nunjucks.configure('views', { // 템플릿 파일들이 views 폴더에 저장, watch: true - 파일 변경 시 자동으로 탬플릿 갱신.
  express: app,
  watch: true,
});
sequelize.sync({ force: false }) // sync: 데이터베잉스 테이블을 동기화한다.
// force: true - Javscript에서 sequelize로 정의한 모델을 기준으로 데이터베이스 스키마를 수정. 

  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

  
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // json 형태를 처리할 수 있도록
app.use(express.urlencoded({ extended: false })); // extended: false - querystring 모듈 사용. true: qs 모듈 사용.

app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
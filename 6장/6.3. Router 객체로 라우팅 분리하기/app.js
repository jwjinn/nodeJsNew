const path = require('path');
const dotenv = require('dotenv');
const express = require('express');

const app = express();

dotenv.config();

// module.export 로 받은 라우터들
const indexRouter = require('./routes'); // index.js 는 생략이 가능하다.
const userRouter = require('./routes/user'); // 

app.set('port', process.env.PORT || 3000);

app.use('/', indexRouter); // 할당 받은 routes로 이동
app.use('/user', userRouter);

// 위 라우터에서 처리를 하지 못한 경우에는 404를 보낸다.
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

// 모든 app.set 과 함께 app.listen 도 동시에 있어야 한다.
app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`);
});
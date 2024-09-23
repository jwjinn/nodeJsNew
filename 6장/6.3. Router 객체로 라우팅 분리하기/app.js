const path = require('path');
const dotenv = require('dotenv');
const express = require('express');

const app = express();

dotenv.config();
const indexRouter = require('./routes'); // index.js 는 생략이 가능하다.
const userRouter = require('./routes/user'); // 

app.set('port', process.env.PORT || 3000);

app.use('/', indexRouter);
app.use('/user', userRouter);


app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`);
});
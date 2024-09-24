const express = require('express');

const router = express.Router();

// GET /user 라우터

// app.js에서 app.use('/user', userRouter); 이런 주소가 올 경우에
// '/' get 매서드 -> app.use로 연결하면 주소가 합쳐진다.
router.get('/', (req, res, next) => {
  res.send('Hello, User');
});

// 일반 라우터는 매개변수를 쓰는 라우터보다 항상 앞에 있어야 한다.
router.get('/like', (req, res) => {
  res.send('Hello, like');
});

//http://localhost:3000/user/1?tey=123
router.get('/:id', (req, res) => {
  console.log(req.params, req.query);
});



module.exports = router;
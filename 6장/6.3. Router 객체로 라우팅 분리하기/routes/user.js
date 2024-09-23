const express = require('express');

const router = express.Router();

// GET /user 라우터

// app.js에서 app.use('/user', userRouter); 이런 주소가 올 경우에
// '/' get 매서드 -> app.use로 연결하면 주소가 합쳐진다.
router.get('/', (req, res) => {
  res.send('Hello, User');
});

module.exports = router;
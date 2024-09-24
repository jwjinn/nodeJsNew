const express = require('express');

const router = express.Router();

// GET / 라우터

router.get('/', (req, res, next)=>{
  next('route');
}, (req, res, next)=>{
  console.log('실행되지 않음');
  next();
}, (req, res, next)=>{
  console.log('실행되지 않음');
  next();});

router.get('/', (req, res) => {
  res.send('Hello, Express');
});

module.exports = router;
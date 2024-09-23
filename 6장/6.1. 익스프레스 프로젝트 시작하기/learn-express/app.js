
const express = require('express');
const app = express(); // app 변수에 할당
const path = require('path');

app.set('port', process.env.PORT || 3000); // process에 있다면 쓰고 없으면 3000으로

app.get('/', (req, res) => {
    //res.send('Hello, Express'); // express 모듈을 사용하면 res.write, res.end 대신에 res.send를 사용하면 된다.
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'));
});
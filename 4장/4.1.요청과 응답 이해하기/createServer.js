const http = require('http');

http.createServer((req,res) => {
    // 여기에 어떻게 응답할지 적어줍시다.

});

/*
http 모듈의 createServer 매서드는 요청에 대한 콜백 함수를 실행할 수 있습니다.

그니까 어떠한 request에 어떤 response를 할지를 콜백 함수 스타일로 구성할 수 있다.

*/
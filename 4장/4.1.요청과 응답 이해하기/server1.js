const http = require('http');


// http 규칙으로 들어오면 아래 res를 전달한다.
http.createServer((req,res) => {
    // 응답에 대한 정보를 기록. 우리 어떠한 것을 클라이언트에게 줄거야. 준비해!
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    // 클라이언트로 보낼 데이터. 버퍼를 보낼 수도 있다. 본문(body)
    res.write('<h1>Hello Node!</h1>');
    // 응답의 종료: 인수가 있다면 클라이언트로 보내고 응답을 종료한다.
    res.end('<p>Hello Server!</p>');

    // 브라우저는 위 정보를 받고 렌더링을 한다.
})

// 자바스크리트에서 클라이언트에 공개할 포트를 설정을 한다. = 8000
.listen(8080, () => {
    console.log('8080번 포트에서 서버 대기중입니다.');
});



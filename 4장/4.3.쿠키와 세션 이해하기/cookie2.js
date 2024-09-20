const http = require('http');
const fs = require('fs').promises;
const path = require('path');

//1: 논리는 나중에 생각하자. mycookie=test 문자열을 {mycookie:'test'}로 자바스크립트 객체로 만든다.
const parseCookies = (cookie = '') =>
    cookie
      .split(';')
      .map(v => v.split('='))
      .reduce((acc, [k, v]) => {
        acc[k.trim()] = decodeURIComponent(v);
        return acc;
      }, {});

http.createServer(async (req, res) => {
  const cookies = parseCookies(req.headers.cookie);
 
  
//2
    // 주소가 /login으로 시작하는 경우
    if (req.url.startsWith('/login')) {
        const url = new URL(req.url, 'http://localhost:8084');
        const name = url.searchParams.get('name'); // 로그인 버튼을 누르는 순간 get 방식은 쿼리파라미터로 데이터를 보낸다.
        const expires = new Date();
        // 쿠키 유효 시간을 현재 시간 + 5분으로 설정
        expires.setMinutes(expires.getMinutes() + 5);
        res.writeHead(302, {
          Location: '/',
          'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        /*
        302: 클라이언트(브라우저)에게 리다이렉트를 할거다. 라고 알림 그래야 실제로 리다이렉트가 된다.
        Location: 리다이렉트를 할 경로
        `name=${encodeURIComponent(name)}; : 실제로 저장할 키-벨류 값
        Expires=${expires.toGMTString()}; : 언제 만료
        HttpOnly; : JavaSCript를 통한 클라이언트 측에서 접근할 수 없도록 함.
        Path=/ : 쿠키가 어느 경로에서 유효할 것인가 -> '/' 이므로 모든 경로에서 유효하다.
        */
        res.end();

//3
     // 주소가 /이면서 name이라는 쿠키가 있는 경우
  } else if (cookies.name) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`${cookies.name}님 안녕하세요`);
  } else { // 주소가 /이면서 name이라는 쿠키가 없는 경우
    try {
      const data = await fs.readFile(path.join(__dirname, 'cookie2.html'));
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(err.message);
    }
}

})

  .listen(8084, () => {
    console.log('8084번 포트에서 서버 대기 중입니다!');
});
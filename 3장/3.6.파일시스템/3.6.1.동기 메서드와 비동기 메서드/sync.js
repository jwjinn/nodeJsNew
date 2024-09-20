const fs = require('fs');

console.log('시작');
let data = fs.readFileSync('./readme2.txt');
console.log('1번', data.toString());
data = fs.readFileSync('./readme2.txt');
console.log('2번', data.toString());
data = fs.readFileSync('./readme2.txt');
console.log('3번', data.toString());
console.log('끝');

// 콜백 함수 실행이 아닌 직접 return 값을 받는다.

/*

sync 는 동기처리.

백그라운드는 fs 작업을 동시에 처리할 수도 있는데
sync 메서드를 사용하면 백그라운드조차 동시에 처리할 수 없게
됩니다.



*/
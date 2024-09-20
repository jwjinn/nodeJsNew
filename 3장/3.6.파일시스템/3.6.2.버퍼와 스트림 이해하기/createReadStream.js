const fs = require('fs');

const readStream = fs.createReadStream('./readme3.txt', {hightWaterMark: 16}); // 버퍼의 크기를 16B로 설정.
const data = [];

// 읽을 파일이 있다면, 아래 리스너가 호출이 됩니다.
readStream.on('data', (chunk) => {
    data.push(chunk);
    console.log('data: ', chunk, chunk.length);
});

// 그리고 다 읽으면 아래가 호출이 되는데, data 라는 배열안에 들어가 있는 데이터는 버퍼 형식이므로
// toString()을 통해서 읽을 수 있는 문자열로 변환.
readStream.on('end', ()=>{
    console.log('end: ', Buffer.concat(data).toString());
});

readStream.on('error', (err) => {
    console.log('error: ', err);
})


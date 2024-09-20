const fs = require('fs');

const writeStream = fs.createWriteStream('./writeme2.txt');

// 파일 종료가 되면.
writeStream.on('finish', () =>{
    console.log('파일 쓰기 완료');
});

writeStream.write('이 글을 씁니다.\n');
writeStream.write('한 번 더 씁니다.');
writeStream.end();


//쓰기 스트림.
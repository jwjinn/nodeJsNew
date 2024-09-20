const fs = require('fs');


// vscode의 오른쪽 클릭 실행은 안됨.
// 버퍼를 사용하는 것은 안되는 듯.
fs.readFile('./readme.txt', (err, data) => {
    if (err){
        throw err;
    }
    // data만 할경우에는 버퍼만 읽게 됩니다.
    console.log(data);

    // 버퍼의 메모리를 스트링으로
    console.log(data.toString());
});
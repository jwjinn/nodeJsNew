const fs = require('fs');

fs.writeFile('./writeme.txt', '글을 입력됩니다.', (err) =>{
    if(err){
        throw err;
    }
    // error가 발생하지 않으면 아래 코드를 실행합니다.

// writeFile을 할때 에러가 나지 않는 다면
// 이것도 마찬가지로 안됨
// vs에서는 코드를 돌리기만 하는 것은 오케이. 그러나, 시스템 상에서의 무엇가를 요청을 해야 할 경우에는
// 터미널에서 node 명령어를 통해서 실행을 해야 한다.
fs.readFile('./writeme.txt', (err, data) => {
    if(err){
        throw err;
    }
    console.log(data.toString());
});
});
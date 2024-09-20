const fs = require('fs').promises;

// 보통 실무에서 프로마이스 방식으로 진행한다.
fs.readFile('./readme.txt')
.then((data) => {
    console.log(data);
    console.log(data.toString());
})
.catch((err) => {
    console.log(err);
});




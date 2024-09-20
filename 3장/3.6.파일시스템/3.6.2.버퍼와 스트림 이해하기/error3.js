const fs = require('fs').promises;

setInterval(() => {
    fs.unlink('./abcdef.js')

    .catch(() =>{
        console.log('err');
    });
}, 1000);
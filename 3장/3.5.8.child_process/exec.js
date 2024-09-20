const exec = require('child_process').exec;

const process = exec('dir');

// 아래에 붙여둔 이벤트 리스너 근데 형식은 'data'
process.stdout.on('data', function(data){
    console.log(data.toString());
});

process.stderr.on('data', function(data){
    console.error(data.toString());
});


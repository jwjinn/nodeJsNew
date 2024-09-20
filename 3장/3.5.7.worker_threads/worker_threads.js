const {
    Worker, isMainThread, parentPort,
} = require('worker_threads');
// 'worker_threads 패키지에 있는 필요한 것들을 분리 할당.'

if(isMainThread){
    // 지금 현재 스레드가 Main이라면,
    const worker = new Worker(__filename);
    // Worker 객체를 만들고

    // 'on'들은 다 리스너임.
    // 지금 현재 코드가 실행이 되는 곳은 'MainThread'일 때니까.
    // MainThread가 아닌데, 데이터가 오면 실행이 된다.
    worker.on('message', message => console.log('from worker', message));
    worker.on('exit', () => console.log('worker exit'));
    worker.postMessage('ping');// worker 쓰레드에 데이터를 보냄.
}else{
    // MainThread가 아니면 다 요기에서 처리가 된다.
    parentPort.on('message', (value) => {
        console.log('from parent', value);
        parentPort.postMessage('pong');
        parentPort.close();
    });
}
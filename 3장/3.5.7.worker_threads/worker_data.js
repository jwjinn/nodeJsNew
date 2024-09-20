const {
    Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

if(isMainThread){
    // 스레드를 여러개를 만들겠다는 의지.
    const threads = new Set();
    threads.add(new Worker(__filename, {
        workerData: {start: 1}
    }));

    threads.add(new Worker(__filename, {
        workerData: {start:2},
    }));

    // 리턴을 하는 WorkerThread의 갯수가 2개 이므로 받는 MainThread도 그에 따른 처리를 해줘야 한다.
    for (let worker of threads){
        worker.on('message', message => console.log('from worker', message));
        worker.on('exit', () =>{
            threads.delete(worker);
            if(threads.size === 0){
                console.log('job done');
            }
        });
    }
}else{
    const data = workerData; // MainThread에서 할당된 workerData를 받고 +100해서 리턴을 한다.
    parentPort.postMessage(data.start + 100); // postMessage를 하는 순간, MainThread의 exit와 동일하다.
}
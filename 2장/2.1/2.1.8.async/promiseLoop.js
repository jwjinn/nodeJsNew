const pormise1 = Promise.resolve('성공1');
const pormise2 = Promise.resolve('성공2');

(async () =>{
    for await(promise of [pormise1, pormise2]){
        console.log(promise);
    }
}   
)();

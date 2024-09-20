
var candyMachine = {
    status: {
        name : 'node',
        count : 5,
    },
    getCandy : function(){
        this.status.count--;
        return this.status.count;
    }
};

//var getCandy = candyMachine.getCandy();
//var count = candyMachine.status.count;
//var count = candyMachine.status.count;
//console.log(count);

const candyMachine2 = {
    status : {
        name : 'node',
        count : 5,
    },
    getCandy(){
        this.status.count--;
        return this.status.count;
    }
};

const {getCandy, status : {count}} = candyMachine2

//console.log(candyMachine2.status);

const boundGetCandy = getCandy.bind(candyMachine2);

boundGetCandy();
console.log(candyMachine2.status);
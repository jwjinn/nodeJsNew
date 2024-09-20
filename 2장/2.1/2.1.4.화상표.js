
const add2 = (x, y) => {
    return x +y;
};


const relationship2 = {
    name: 'zero',
    friends: ['one', 'two', 'three'],

    logFriends(){
        this.friends.forEach(friend => 
            console.log(this.name, friend)

        );
    }
}

relationship2.logFriends();
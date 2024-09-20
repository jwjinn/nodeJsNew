// function findAndSaveUser(Users){
//     Users.findOne({})
//     .then((user) => {
//         user.name = 'zero';
//         return user.save();
//     })

//     .then((user) => {
//         return Users.findOne({gender : 'm'});
//     })

//     .then((user) => {
//         //생략
//     })

//     .catch(err => {
//         console.error(err);
//     });
// }


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    gender: String,
});

const Users = mongoose.model('Users', userSchema);

function findAndSaveUser(Users) {
    Users.findOne({})
        .then((user) => {
            if (!user) throw new Error('사용자를 찾을 수 없습니다.');
            user.name = 'zero';
            return user.save();
        })
        .then((user) => {
            return Users.findOne({ gender: 'm' });
        })
        .then((user) => {
            if (user) {
                console.log('성별이 남자인 사용자:', user);
            } else {
                console.log('성별이 남자인 사용자를 찾을 수 없습니다.');
            }
        })
        .catch((err) => {
            console.error('에러 발생:', err);
        });
}

// 간단한 User 객체 대신 Mongoose 모델을 시뮬레이션
const User = {
    findOne: (query) => {
        console.log('findOne 호출됨:', query);
        return new Promise((resolve) => {
            // gender 조건에 따라 다른 사용자 반환
            if (query.gender === 'm') {
                resolve({ name: 'John', age: 30, gender: 'male', save });
            } else if (query.gender === 'f') {
                resolve({ name: 'Alice', age: 25, gender: 'female', save });
            } else {
                // 기본 사용자 반환
                resolve({ name: 'basic', age: 25, gender: 'female', save });
            }
        });
    }
};

// 'user.save' 메소드 시뮬레이션
function save() {
    console.log('save 호출됨');
    return new Promise((resolve) => {
        resolve({ name: 'zero1', age: 25, gender: 'female' });
    });
}

// 사용자 추가 및 찾기 함수
function findAndSaveUser() {
    User.findOne({}) 
        .then((user) => {
            console.log('사용자 찾음:', user);
            user.name = 'zero'; // 이름을 'zero'로 변경
            return user.save();  // 저장 함수 호출
        })
        .then((updatedUser) => {
            console.log('업데이트된 사용자:', updatedUser);
            return User.findOne({ gender: 'm' });
        })
        .then((user) => {
            if (user.gender === 'male') {
                console.log('성별이 남자인 사용자:', user);
            } else if (user.gender === 'female') {
                console.log('성별이 여자인 사용자:', user);
            } else {
                console.log('성별 정보를 찾을 수 없습니다.');
            }
        })
        .catch((err) => {
            console.error('에러 발생:', err);
        });
}

// 함수 실행
findAndSaveUser();

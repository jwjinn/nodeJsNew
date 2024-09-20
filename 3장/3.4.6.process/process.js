require('dotenv').config();  // dotenv 패키지를 불러와서 설정 로드

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

console.log('Database Host:', dbHost);
console.log('Database User:', dbUser);
console.log('Database Password:', dbPass);

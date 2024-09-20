// 동작은 되지만 기존이랑 다를 것이 없다.

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// 포트 8888의 서비스로 프록시
app.use('/userflow', createProxyMiddleware({
  target: 'https://mohaet.nethru.io:8888',
  changeOrigin: true,
  pathRewrite: {
    '^/userflow': '', // 경로에서 /userflow 제거
  },
}));

// 포트 18888의 서비스로 프록시
app.use('/actionUserflow', createProxyMiddleware({
  target: 'https://mohaet.nethru.io:18888',
  changeOrigin: true,
  pathRewrite: {
    '^/actionUserflow': '', // 경로에서 /actionUserflow 제거
  },
}));

// 서버 실행
app.listen(5000, () => {
  console.log('Proxy server is running on port 80');
});

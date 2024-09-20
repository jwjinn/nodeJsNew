const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// 포트 8888의 서비스로 프록시
app.use('/userflow', createProxyMiddleware({
  target: 'https://mohaet.nethru.io:8888',
  changeOrigin: true,
  pathRewrite: {
    '^/userflow': '/userflow', // 경로 유지
  },
}));

// 포트 18888의 서비스로 프록시
app.use('/actionUserflow', createProxyMiddleware({
  target: 'https://mohaet.nethru.io:18888',
  changeOrigin: true,
  pathRewrite: {
    '^/actionUserflow': '/actionUserflow', // 경로 유지
  },
}));

// 서버 실행
app.listen(5000, () => {
  console.log('Proxy server is running on port 5000');
});

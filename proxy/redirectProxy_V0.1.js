const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// 포트 8888의 서비스로 프록시
app.use('/userflow', createProxyMiddleware({
  target: 'https://mohaet.nethru.io:8888',
  changeOrigin: true,
  pathRewrite: {
    '^/userflow': '',  // '/userflow'를 제거하여 대상 서버로 그대로 보냄
  },
  onProxyRes: function (proxyRes, req, res) {
    if (proxyRes.headers['location']) {
      // 리다이렉션 헤더를 수정하여 /userflow 경로가 유지되도록 변경
      proxyRes.headers['location'] = proxyRes.headers['location'].replace('https://mohaet.nethru.io:8888', 'http://3.35.165.93:5000/userflow');
    }
  },
}));

// 포트 18888의 서비스로 프록시
app.use('/actionUserflow', createProxyMiddleware({
  target: 'https://mohaet.nethru.io:18888',
  changeOrigin: true,
  pathRewrite: {
    '^/actionUserflow': '/actionUserflow',
  },
}));

// 서버 실행
app.listen(5000, () => {
  console.log('Proxy server is running on port 5000');
});

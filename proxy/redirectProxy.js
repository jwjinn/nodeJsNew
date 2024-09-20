const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// 포트 8888의 서비스로 프록시
app.use('/userflow', createProxyMiddleware({
  target: 'https://mohaet.nethru.io:8888',
  changeOrigin: true,
  pathRewrite: {
    '^/userflow': '/userflow',
  },
  onProxyRes: function (proxyRes, req, res) {
    if (proxyRes.headers['location']) {
      // 원본 리다이렉트 URL에서 /console/auth/login을 /userflow/console/auth/login으로 수정
      proxyRes.headers['location'] = proxyRes.headers['location'].replace('/console/auth/login', '/userflow/console/auth/login');
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

const { createProxyMiddleware } = require('http-proxy-middleware');

const proxyPath = process.env.PROXY_PATH || '/exist/restxq/ecocor/';

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:8090/',
      pathRewrite: {
        '^/api/': proxyPath,
      },
    })
  );
};


const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {

    app.use(
        '/cityjson',
        createProxyMiddleware({
            target: 'https://pv.sohu.com',
            changeOrigin: true
        })
    );


}
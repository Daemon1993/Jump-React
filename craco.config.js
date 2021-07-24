/* craco.config.js */

const path = require('path')
const pathResolve = pathUrl => path.join(__dirname, pathUrl)

const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')

module.exports = {

    style: {
        //修改样式配置
    },
    eslint: {
        // 修改eslint配置，同.eslintrc
    },
    babel: {
        //babel配置，同.babelrc
    },
    plugins: [
        //注入插件
    ],
    webpack: {

        alias: {
            '@@': pathResolve('.'),
            '@': pathResolve('src'),
        },

        configure: (config, { env, paths }) => {
            //修改webpack配置
            return config;
        },
        plugins: [
            //注入插件
            new BundleAnalyzerPlugin(),
            new SimpleProgressWebpackPlugin()

        ],
    },
    devServer: {
        port: 5000,
    }
    // devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => {
    //     // 修改devServer配置

    //     return devServerConfig
    // }
}
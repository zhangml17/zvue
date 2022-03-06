// 通过入口，打包出一份代码，给node使用
const base = require('./webpack.base.js')
const merge = require('webpack-merge').merge
const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')
const resolve = (dir) => {
    return path.resolve(__dirname, dir)
} 
// webpack-merge 插件
// webpack打包服务器端代码，不需要引入打包后端js，js由前端端提供，服务端仅提供打包出来的html字符串即可
module.exports = merge(base, {
    entry: {
        client:resolve('../src/server-entry.js')
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:resolve('../public/index-server.html'),
            excludeChunks:['server']
        })
    ]
})
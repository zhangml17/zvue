// 通过入口，打包出一份代码，给node使用
const base = require('./webpack.base.js')
const merge = require('webpack-merge').merge
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const path = require('path')
const resolve = (dir) => {
    return path.resolve(__dirname, dir)
} 
// webpack-merge 插件
// webpack打包服务器端代码，不需要引入打包后端js，js由前端端提供，服务端仅提供打包出来的html字符串即可
module.exports = merge(base, {
    entry: {
        server:resolve('../src/server-entry.js')
    },
    target:'node', // webpack将在类nodejs环境编译
    output:{
        libraryTarget:'commonjs2' // 以module.exports的方式导出
    },
    plugins:[
        new VueSSRServerPlugin(),
        new HtmlWebpackPlugin({
            filename:'index-server.html',
            template:resolve('../public/index-server.html'),
            minify:false, // 代码不压缩，保证注释存在
            excludeChunks:['server'] // 排除引入文件
        })
    ]
})
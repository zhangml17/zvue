const base = require('./webpack.base.js')
const merge = require('webpack-merge').merge
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const path = require('path')
const resolve = (dir) => {
    return path.resolve(__dirname, dir)
} 
// webpack-merge 插件
module.exports = merge(base, {
    entry: {
        client:resolve('../src/client-entry.js')
    },
    plugins:[
        new VueSSRClientPlugin(),
        new HtmlWebpackPlugin({
            template:resolve('../public/index.html')
        })
    ]
})
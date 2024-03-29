
// webpack webpack-cli webpack-dev-server vue-loader vue-style-loader css-loader @babel/core 
// @babel/preset-env babel-loader vue-template-compiler html-webpack-plugin

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const resolve = (dir) => {
    return path.resolve(__dirname, dir)
} 
module.exports = {
    mode:'development',
    entry:resolve('./src/app.js'),
    output:{
        filename:'bundle.js',
        path:resolve('dist')
    },
    resolve:{
        extensions:[ '.js', '.vue', '.css', '.jsx' ] // 当导入语句没有带指定文件后缀时会自动带上
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                use: 'vue-loader'
            },
            {
                test:/\.css$/,
                use:['vue-style-loader', 'css-loader']
            },
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader', // 默认使用babel-loader时会调用babel-core
                    options:{ // 告诉js 文件需要通过es6 ->es5的插件转换
                        presets:['@babel/preset-env']
                    }
                },
                exclude:/node_modules/
            }
        ]
    },
    plugins:[
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template:resolve('./public/index.html')
        })
    ]
}
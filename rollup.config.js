import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'

export default {
    input:'./src/index.js',
    output:{
        format:'umd',
        name:'Vue',
        file:'dist/umd/vue.js',
        sourcemap:true
    },
    plugins:[
        babel({
            exclude:'node_modules/**' //该目录下的所有文件都不进行转义
        }),
        serve({
            port:3000,
            contentBase:'',
            openPage:'/index.html'
        })
    ]
}
import Vue from 'vue'
import Router from "vue-router";

// 组件引入方式一
import Foo from './components/Foo'
import Bar from './components/Bar'

Vue.use(Router)
// 组件引入方式二
// const Foo = require('./components/Foo.vue').default
// const Bar = require('./components/Bar.vue').default

// 组件引入方式三（需要降低vue-loader版本）
// const Foo = () => import('./components/Foo')
// const Bar = () => import('./components/Bar')


export default () => {
    const router = new Router({
        mode:'history',
        routes:[
            {
                path:'/',
                component:Bar
            },
            {
                path:'/foo',
                component:Foo
            }
        ]
    })
    return router
}
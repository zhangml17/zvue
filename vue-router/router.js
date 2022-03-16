import Vue from 'vue'
// import Router from 'vue-router'
import Router from './zvue-router/index'

import Home from './views/Home'
import About from './views/About'

Vue.use(Router) // Router插件内部会提供两个全局组件， router-link和router-view，并且提供两个原型上的方法$router和$route

const router = new Router({
    mode:'hash',
    routes:[
        {
            path:'/',
            component: Home
        },
        {
            path:'/about',
            component:About,
            children:[
                {
                    path:'a',
                    component:{
                        render:(h) => <h1>about-a</h1>
                    }
                },
                {
                    path:'b',
                    component:{
                        render: (h) => <h1>about-b</h1>
                    }
                }
            ]
        }
    ]
})

router.addRoutes([
    { path:'auth', component: { render: h => h('div', {}, 'auth') } }
])

router.beforeEach((from, to, next) => {
    console.log('first');
    setTimeout(() => {
        next()
    }, 1000)
})
router.beforeEach((from, to, next) => {
    console.log('second');
    setTimeout(() => {
        next()
    }, 1000)
})
export default router 

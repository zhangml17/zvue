// vue vue-server-renderer koa @koa/router

const Vue = require('vue')
const VueServerRenderer = require('vue-server-renderer')
const fs = require('fs')
const path = require('path')
const resolve = path.resolve

const Koa = require('koa')
const Router = require('@koa/router')


let app = new Koa() 
let router = new Router() // 路由实例

const render = VueServerRenderer.createRenderer({
    template:fs.readFileSync(resolve(__dirname,'public/index-server.html'), 'utf8')
})

router.get('/', async ctx => {
    ctx.body = await render.renderToString(vm)
})

app.use(router.routes()) // 注册路由
app.listen(3000)
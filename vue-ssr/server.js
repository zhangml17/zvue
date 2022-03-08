// vue vue-server-renderer koa @koa/router

const Vue = require('vue')
const VueServerRenderer = require('vue-server-renderer')
const fs = require('fs')
const path = require('path')
const resolve = path.resolve

const Koa = require('koa')
const Router = require('@koa/router')
const static = require('koa-static')

let app = new Koa() 
let router = new Router() // 路由实例

// const render = VueServerRenderer.createRenderer({
//     template:fs.readFileSync(resolve(__dirname,'public/index-server.html'), 'utf8')
// })

// const serverBundle = fs.readFileSync(resolve(__dirname, 'dist/server.bundle.js'), 'utf8')
// const renderTemplate = fs.readFileSync(resolve(__dirname, 'dist/index-server.html'), 'utf8')
// const render = VueServerRenderer.createBundleRenderer(serverBundle, {
//     template:renderTemplate
// })

const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const renderTemplate = fs.readFileSync(resolve(__dirname, './dist/index-server.html'))
const clientManifest = require('./dist/vue-ssr-client-manifest.json')

const render = VueServerRenderer.createBundleRenderer(serverBundle, {
    template:renderTemplate,
    clientManifest
})

router.get('/(.*)', async ctx => {
    console.log(ctx.url)
    // 在渲染页面时，需要让服务器根据当前路径渲染对应的路由
    try {
        ctx.body = await render.renderToString({ url: ctx.url })
    } catch (error) {
        if(error.code === 404) ctx.body = '页面找不到啦'
    }
    // ctx.body = await render.renderToString(vm)
})
app.use(static(resolve(__dirname, 'dist'))) 
// app.use(static(__dirname)) // 使用静态服务插件:以__dirname,为静态服务地址
app.use(router.routes()) // 注册路由
app.listen(3000)
import createApp from './app'

export default (context) => { // context 中包含者访问服务器的路径
    return new Promise((resolve, reject) => {
        const { app, router } = createApp()
        router.push({ path:context.url}) // 服务器端路由跳转
        router.onReady(() => { 
            console.log(111)
            resolve(app)
        }, reject)
    })

}
import createApp from './app'

export default (context) => { // context 中包含者访问服务器的路径
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp()
        router.push({ path:context.url}) // 服务器端路由跳转,此时不应该有客户端的index.html文件，不然不执行路由
        router.onReady(() => { 
            const matched = router.getMatchedComponents() // 获取匹配到的组件
            if(matched.length > 0) { // 路由匹配到
                Promise.all(matched.map(component => {
                    if(component.asyncData) return component.asyncData(store)
                })).then(() => {
                    context.state = store.state // 将服务单的状态放到上下文中
                    resolve(app)
                }, reject)
            }else {
                reject({ code: 404 })
            }
        }, reject)
    })

}
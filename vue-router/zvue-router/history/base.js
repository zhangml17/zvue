class History {
    constructor(router) {
        this.router = router
    }
    /**
     * 路由跳转
     * @param {*} location hash路径
     * @param {*} onComplete 跳转成功的回调
     */
    transitionTo(location, onComplete) {
        // 根据路由location加载不同的组件 并渲染
        // ...todo
        onComplete && onComplete()
    }
}

export {
    History
}
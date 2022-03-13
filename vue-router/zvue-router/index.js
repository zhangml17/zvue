import install from './install'
import createMatcher from './create-matcher'


export default class VueRouter {
    constructor(options) {
        // 根据用户的配置和当前请求的路径 渲染对应的组件
        // 
        this.matcher = createMatcher(options.routes || [])
    }
    init(app) {}
    // 动态添加路由
    addRoutes(routes) {
        this.matcher.addRoutes(routes)
    }
}
VueRouter.install = install
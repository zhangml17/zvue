import install from './install'
import createMatcher from './create-matcher'
import { HashHistory } from './history/hash'
import { HTML5History } from './history/history'

export default class VueRouter {
    constructor(options) {
        // 根据用户的配置和当前请求的路径 渲染对应的组件
        this.matcher = createMatcher(options.routes || [])
        // 根据不同的path进行切换
        let mode = options.mode || 'hash'
        switch(mode) {
            case 'hash': 
                this.history = new HashHistory(this);break;
            case 'history':
                this.history = new HTML5History(this);break;
        }
    }
    // 返回匹配到的路由
    match(location) {
        return this.matcher.match(location)
    }
    // 初始化
    init(app) {
        const history = this.history
        const setupListeners = () => {
            history.setupListeners()
        }
        // 监听路由变化
        history.transitionTo(
            history.getCurrentLocation(),
            setupListeners
        )
        console.log('init enter');
        // 每次路径变化 调用此方法将新的route更新到实例的响应式_route上
        history.listen((route) => {
            app._route = route
            console.log('--app._route', app._route);
        })
    }
    // 动态添加路由
    addRoutes(routes) {
        this.matcher.addRoutes(routes)
    }
}
VueRouter.install = install
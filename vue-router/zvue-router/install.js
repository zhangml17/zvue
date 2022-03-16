import Link from './components/Link'
import View from './components/View'

export let _Vue

export default function install(Vue, options) {
    // 插件安装入口
    _Vue = Vue
    // 所有组件绑定router实例
    Vue.mixin({
        beforeCreate() {
            if(this.$options.router) {
                this._routerRoot = this
                this._router = this.$options.router
                // 根组件下 初始化
                this._router.init(this)
                Vue.util.defineReactive(this, '_route', this._router.history.current)
            }else {
                this._routerRoot = this.$parent && this.$parent._routerRoot
            }
            // 这样所有的组件都可以通过this._routerRoot._router获取共同的router实例
        },
    })
    // 1、注册全局组件 router-link、router-view
    Vue.component('router-link', Link)
    Vue.component('router-view', View)
    // 2、绑定原型方法$router、$route
    Object.defineProperty(Vue.prototype, '$route', {
        get() {
            return this._routerRoot._route
        }
    })
    Object.defineProperty(Vue.prototype, '$router', {
        get() {
            return this._routerRoot._router
        }
    })
}
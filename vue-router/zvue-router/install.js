export let _Vue

export default function install(Vue, options) {
    // 插件安装入口
    _Vue = Vue

    // 所有组件绑定router实例
    Vue.mixin({
        beforeCreate() {
            if(this.$options.store) {
                this._routerRoot = this
                this._router = this.$options.store
                // 根组件下 初始化
                this._router.init(this)
            }else {
                this._routerRoot = this.$parent && this.$parent._routerRoot
            }
            // 这样所有的组件都可以通过this._routerRoot._router获取共同的router实例
        },
    })
    // 1、注册全局组件 router-link、router-view
    Vue.component('router-link', {
        render: h => h('a', {}, '')
    })
    Vue.component('router-view', {
        render: h => h('div', {}, '')
    })
    // 2、绑定原型方法$router、$route
    Vue.prototype.$route = {}
    Vue.prototype.$router = {}
}
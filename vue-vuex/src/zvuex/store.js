import applyMixin from './mixin'

export let Vue

export class Store {
    constructor(options) {
        // store里的数据必须是响应式的
        // 利用new Vue({data}) 里data即为响应式的原理构建 响应式state
        // $开头的属性会作为vue内部属性使用
        let state = options.state
    }
}
// Vue.use方法的核心
// Vue.use = function(plugin) {
//     plugin.install.call(this)
// }

export const install = (_Vue) => { // _Vue:vue的构造函数
    Vue = _Vue
    applyMixin(Vue)
}
import applyMixin from './mixin'
import { forEachValue } from '../utils/index'

export let Vue
export class Store {
    constructor(options) {
        // store里的数据必须是响应式的
        // 利用new Vue({data}) 里data即为响应式的原理构建 响应式state
        // $开头的属性会作为vue内部属性使用,不会将该属性挂到vue实例上

        // 1、定义state
        let state = options.state
        // 2、定义getters,通过计算属性computed实现缓存（ Vue3.0卡丝hi，getter的结果不再像计算属性一样会被缓存起来）
        this.getters = {}
        let computed = {}
        forEachValue(options.getters, (fn, key) => {
            computed[key] = () => fn(this.state)
            Object.defineProperty(this.getters, key, {
                get:() => this._vm[key]
            })
        })
        // 3、定义mutations
        this.mutations = {}
        const mutations = options.mutations
        forEachValue(mutations, (fn, key) => {
            this.mutations[key] = (payload) => fn(this.state, payload)
        })
        // 4、实现actions
        this.actions = {}
        const actions = options.actions
        forEachValue(actions, (fn, key) => {
            this.actions[key] = (payload) => fn(this,payload)
        })     

        this._vm = new Vue({
            data:{
                $$state:state, // 该属性会被存在vue实例的_data属性中
            },
            computed
        })

        console.log(this._vm);
    }
    commit = (type, payload) => { // 箭头函数是为了保证始终是当前this
        this.mutations[type](payload)
    }
    dispatch = (type, payload) => {
        this.actions[type](payload)
    }
    get state() {
        return this._vm._data.$$state
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
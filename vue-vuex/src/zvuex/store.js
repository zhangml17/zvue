import applyMixin from './mixin'
import { forEachValue } from '../utils/index'
import ModuleCollection from '../zvuex/module-collection'

/**
 * 
 * @param {*} store store对象
 * @param {*} rootState 根state
 * @param {*} path 记录模块层次关系的栈
 * @param {*} module 结构化的module对象
 */
const installModule = (store, rootState, path, module) => {
    // 安装所有getters、mutations、actions以及所有状态

    if(path.length > 0) {
        let parent = path.slice(0, -1).reduce((timeResult, current) => {
            return timeResult[current]
        }, rootState)
        Vue.set(parent, path[path.length - 1], module.state)
    }

    module.forEachMutation((mutation, key) => {
        store._mutations[key] = store._mutations[key] || []
        store._mutations[key].push((payload) => {
            mutation.call(store, module.state, payload)
        })
    })
    module.forEachAction((action, key) => {
        store._actions[key] = store._actions[key] || []
        store._actions[key].push((payload) => {
            action.call(store, store, payload)
        })
    })
    module.forEachGetter((getter, key) => {
        store._wrappedGetters[key] = function() {
            return getter(module.state)
        }
    })
    module.forEachChild((child, key) => {
        installModule(store, rootState, path.concat(key), child)
    })
}
// 将store属性挂载
const resetStoreVM = (store, state) => {
    store.getters = {}
    let computed = {}

    forEachValue(store._wrappedGetters, (fn, key) => {
        computed[key] = () => {
            return fn()
        }
        Object.defineProperty(store.getters, key, {
            get:() => store._vm[key] // 去计算属性中取getter方法
        })
    })

    store._vm = new Vue({
        data:{
            $$state: state
        },
        computed
    })
}

export let Vue
export class Store {
    constructor(options) {
        // store里的数据必须是响应式的
        // 利用new Vue({data}) 里data即为响应式的原理构建 响应式state
        // $开头的属性会作为vue内部属性使用,不会将该属性挂到vue实例上
        this._mutations = {}
        this._actions = {}
        this._getters = {}
        this._wrappedGetters = {}
        // 1、定义state
        let state = options.state
        // 模块化实现
        this._modules = new ModuleCollection(options) // 数据格式化
        console.log(this._modules);
        
        installModule(this, state, [], this._modules.root)
        console.log(this);
        console.log(state);
        resetStoreVM(this, state)
        


        // 以下非模块化实现
        // // 2、定义getters,通过计算属性computed实现缓存（ Vue3.0卡丝hi，getter的结果不再像计算属性一样会被缓存起来）
        // this.getters = {}
        // let computed = {}
        // forEachValue(options.getters, (fn, key) => {
        //     computed[key] = () => fn(this.state)
        //     Object.defineProperty(this.getters, key, {
        //         get:() => this._vm[key]
        //     })
        // })
        // // 3、定义mutations
        // this.mutations = {}
        // const mutations = options.mutations
        // forEachValue(mutations, (fn, key) => {
        //     this.mutations[key] = (payload) => fn(this.state, payload)
        // })
        // // 4、实现actions
        // this.actions = {}
        // const actions = options.actions
        // forEachValue(actions, (fn, key) => {
        //     this.actions[key] = (payload) => fn(this,payload)
        // })     

        // this._vm = new Vue({
        //     data:{
        //         $$state:state, // 该属性会被存在vue实例的_data属性中
        //     },
        //     computed
        // })

        console.log(this._vm);
    }
    commit = (type, payload) => { // 箭头函数是为了保证始终是当前this
        // this.mutations[type](payload)
        this._mutations[type].forEach( mutation => mutation.call(this, payload))
    }
    dispatch = (type, payload) => {
        // this.actions[type](payload)
        this._actions[type].forEach( action => action.call(this, payload))
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
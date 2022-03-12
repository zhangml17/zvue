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
    // 获取namespaced路径
    let namespacedPath = store._modules.getNamespaced(path)
    // 安装所有getters、mutations、actions以及所有状态
    if(path.length > 0) {
        let parent = path.slice(0, -1).reduce((timeResult, current) => {
            return timeResult[current]
        }, rootState)
        Vue.set(parent, path[path.length - 1], module.state)
    }

    module.forEachMutation((mutation, key) => {
        store._mutations[namespacedPath + key] = store._mutations[namespacedPath + key] || []
        store._mutations[namespacedPath + key].push((payload) => {
            mutation.call(store, getState(store, path), payload)
            store._subscribes.forEach( subscribe => subscribe(mutation, store.state))
        })
    })
    module.forEachAction((action, key) => {
        store._actions[namespacedPath + key] = store._actions[namespacedPath + key] || []
        store._actions[namespacedPath + key].push((payload) => {
            action.call(store, store, payload)
        })
    })
    module.forEachGetter((getter, key) => {
        store._wrappedGetters[namespacedPath + key] = function() {
            return getter(getState(store, path))
        }
    })
    module.forEachChild((child, key) => {
        installModule(store, rootState, path.concat(key), child)
    })
}
// 将store属性挂载，实现数据的响应化
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
// 获取最新的state
const getState = (store, path) => {
    return path.reduce((newState, current) => {
        return newState[current]
    }, store.state)
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
        this._subscribes = [] // 插件
        // 1、定义state
        let state = options.state
        // 模块化实现
        this._modules = new ModuleCollection(options) // 数据格式化
        
        installModule(this, state, [], this._modules.root)
        resetStoreVM(this, state)
        options.plugins.forEach(plugin => plugin(this))
    }
    // 状态更新
    replaceState(state) {
        this._vm._data.$$state = state
    }
    subscribe(fn) { // 订阅
        this._subscribes.push(fn)
    } 

    commit = (type, payload) => { // 箭头函数是为了保证始终是当前this
        // 这里有问题：当dispatch传入的type带有模块路径时，但commit的mutation传入的type是没有模块路径的
        // 所以this._mutations[type]会找不到
        this._mutations[type].forEach( mutation => mutation.call(this, payload))
    }
    dispatch = (type, payload) => {
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
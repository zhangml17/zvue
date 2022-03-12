/**
 * 自定义实现类vuex的ZVuex
 * 
 * 1、有个Store类
 * 2、install方法
 * 3、全局混入绑定为$store
 */
import { Store, install } from './store'
export * from './helpers'

export default {
    Store,
    install,
}
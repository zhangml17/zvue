 import { initState } from './state.js'

let uid = 0 
export function initMixin(Vue) {
  Vue.prototype._init = function(options) {
    this.$options = options
    const vm = this
    vm._uid = uid++
    initState(vm)
  }
}
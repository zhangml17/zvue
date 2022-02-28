import { observe } from "./observer/index.js"

export function initState(vm) {
  // 数据响应化
  let opts = vm.$options
  if(opts.props) initProps()
  if(opts.methods) initMethods()
  if(opts.data) initData(vm)
  if(opts.computed) initComputed()
  if(opts.watch) initWatch()
}

function initProps() {}
function initMethods() {}
function initData(vm) {
  let data = vm.$options.data 
  data = vm._data = typeof data === 'function' ? data() : data || {}
  observe(data)
}
function initComputed() {}
function initWatch() {}


import { def } from "../utils/index.js"
import { arrayMethods } from './array.js'
import Dep from './Dep.js'

class Observer {
  constructor(value) {
    this.value = value
    def(value, '__ob__', this, false) // 让__ob__属性不可
    if(Array.isArray(value)) {
      value.__proto__ = arrayMethods
      this.observeArray(value)
    }else {
      this.walk(value)
    }
  }
  // 观测对象的每个key
  walk(obj) {
    Object.keys(obj).forEach( key => {
      defineReactive(obj, key, obj[key])
    })
  }
  // 观测数组中的每一项
  observeArray(arr) {
    for(let i=0, l=arr.length; i<l;i++) {
      observe(arr[i])
    }
  }
}

function defineReactive(obj, key, val) { 
  const dep = new Dep()
  observe(val)
  Object.defineProperty(obj, key, {
    get() {
      console.log('获取值了。。。');
      if(Dep.target) {
        dep.depend()
      }
      return val
    },
    set(newVal) {
      console.log('设置值了');
      if(val === newVal) return
      val = newVal
      observe(newVal)
      dep.notify()
    }
  })
}

export function observe(data) {
  var ob
  if(data.__ob__ !== undefined) ob = data.__ob__
  else if(typeof data !== 'object' || data == null) {
    return
  }else {
    ob = new Observer(data)
  }
  return ob
}
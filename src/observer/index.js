import { def } from "../utils/index.js"
import { arrayMethods } from './array.js'
import Dep from './Dep.js'

class Observer {
  constructor(value) {
    this.value = value
    def(value, __ob__, this, false) // 让__ob__属性不可
    if(Array.isArray(value)) {
      this.observeArray(value)
    }else {
      this.walk(value)
    }
  }
  walk(obj) {
    Object.keys(obj).forEach( key => {
      defineReactive(obj, key, obj[key])
    })
  }
  observeArray(arr) {
    for(let i=0, l=arr.length; i<l;i++) {
      observe(arr[i])
    }
  }
}

function defineReactive(obj, key, val) { 
  const dep = new Dep()

  Object.defineProperty(obj, key, {
    get() {
      if(Dep.target) {
        dep.depend()
      }
      return val
    },
    set(newVal) {
      if(val === newVal) return
      val = newVal
      observe(newVal)
      dep.notify()
    }
  })
}

export function observe(obj) {
  var ob
  if(obj.__ob__ !== 'undefined') ob = obj.__ob__
  else ob = new Observer()
  return ob
}
import { def } from '../utils/index.js'

const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)

const methodsToPatch = [
  'pop',
  'push',
  'unshift',
  'shift',
  'splice',
  'sort',
  'reverse'
]

methodsToPatch.forEach( function(method) {
  const original = arrayProto[method]
  def(arrayMethods, method, function(...args) {
    let result = original.apply(this, args)
    let ob = this.__ob__
    let inserted
    switch(method) {
      case 'push':
      case 'unshift':
        inserted = args; break;
      case 'splice':
        inserted = args.slice(2);break;
    }
    if(inserted) ob.observeArray(inserted)
    return result
  })
})
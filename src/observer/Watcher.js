let uid = 0
export default class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm
    this.expOrFn = expOrFn
    this.id = uid++
    this.cb = cb
  }
  addDep(dep) {
    dep.addSub(this)
  }
  update() {
  }
}
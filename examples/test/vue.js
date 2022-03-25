class Vue {
    constructor(options) {
        this.$options = options
        this.$data = options.data

        this.observe(this.$data)

        new Compile(this.$options.el, this)

        if(this.$options.created) {
            this.$options.created.call(this)
        }
    }
    // 数据响应化(仅考虑对象情况)
    observe(data) {
        
        if(!data || typeof data !== 'object') return

        Object.keys(data).forEach( key => {
            this.defineReactive(data, key, data[key])
            this.proxyData(key)
        })
    }

    defineReactive(target, key, val) {
        this.observe(val)
        const dep = new Dep()
        Object.defineProperty(target, key, {
            get() {
                Dep.target && dep.addDep(Dep.target)
                return val
            },
            set(newVal) {
                if(newVal == val) return
                val = newVal
                dep.notify()
            }
        })
    }

    proxyData(key) {
        Object.defineProperty(this, key, {
            get() {
                return this.$data[key]
            },
            set(newVal) {
                this.$data[key] = newVal
            }
        })
    }
}

class Dep {
    constructor() {
        this.subs = []
    }

    addDep(sub) {
        this.subs.push(sub)
    }
    notify() {
        this.subs.forEach( sub => {
            sub.update()
        })
    }
}


class Watcher {
    constructor(vm, key, cb) {
        this.vm = vm
        this.key = key
        this.cb = cb

        Dep.target = this
        this.vm[this.key]
        Dep.target = null
    }
    update() {
        this.cb.call(this.vm, this.vm[this.key])
    }
}



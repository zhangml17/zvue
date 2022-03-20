class ZVue {
    constructor(options){
        this.$options = options
        this.$data = options.data;

        this.observe(this.$data)

        new Compile(options.el,this)

        // created 执行
        if(options.created) {
            options.created.call(this)
        }
    }

    observe(value){
        if(!value || typeof value !== "object"){
            return;
        }

        Object.keys(value).forEach(key=>{
            this.defineReactive(value,key,value[key])

            // 代理data中的属性到vue实例上
            this.proxyData(key)
        })
    }
    // 数据响应化函数
    defineReactive(obj,key,val){
        this.observe(val)     // 递归解决数据嵌套
        const dep = new Dep()

        Object.defineProperty(obj,key,{
            get:function(){
                Dep.target && dep.addDep(Dep.target)
                return val;
            },
            set:function(newVal){
                if(newVal === val){
                    return;
                }
                val = newVal
                // console.log(`${key}属性更新了：${val}`)
                dep.notify()
            }
        })
    }

    proxyData(key) {
        Object.defineProperty(this,key,{
            get(){
                return this.$data[key]
            },
            set(newVal){
                this.$data[key] = newVal
            }
        })
    }
}

// Dep: 用来管理watcher
class Dep {
    constructor(){
        // 这里存放若干依赖（watcher
        this.deps = []
    }

    addDep(dep){
        this.deps.push(dep)
    }

    notify(){
        this.deps.forEach(dep =>{
            dep.update()
        })
    }
}

// Watcher
class Watcher {
    constructor(vm,key,cb) {
        this.vm = vm
        this.key = key
        this.cb = cb

        // 将当前的watcher实例指定到Dep静态属性target
        Dep.target = this
        this.vm[this.key]
        Dep.target = null
    }

    update() {
        this.cb.call(this.vm,this.vm[this.key])
    }
}
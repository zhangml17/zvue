class Compile {
    constructor(el,vm) {
        this.$el = document.querySelector(el)
        this.$vm = vm

        // 编译
        if(this.$el){
            // 转换内部内容为片段Fragment
            this.$fragment = this.node2Fragment(this.$el)
            // 执行编译
            this.compile(this.$fragment)
            // 将编译完的html结果追加到$el
            this.$el.appendChild(this.$fragment)
        }
    }

    //  将宿主元素中的代码片段拿出来遍历
    node2Fragment(el) {
        const frag = document.createDocumentFragment()
        // 将el中所有子元素搬家至frag中
        let child
        while(child = el.firstChild) {
            frag.appendChild(child)
        }
        return frag
    }

    // 编译过程
    compile(el) {
        const childNodes = el.childNodes
        Array.from(childNodes).forEach(node=>{
            // 类型判断
            if(this.isElement(node)) {
                // 元素
                // 查找z-、@、:开头的属性
                const nodeAttrs = node.attributes
                Array.from(nodeAttrs).forEach(attr=>{
                    // 属性名
                    const attrName = attr.name
                    // 属性值
                    const exp = attr.value
                    // 属性是指令 z- 开头
                    if(this.isDirective(attrName)){
                        // z-text
                        // 获取'text'
                        const dir = attrName.substring(2)
                        // 执行指令
                        this[dir] && this[dir](node,this.$vm,exp)
                    }

                    // 属性是事件 @开头
                    if(this.isEvent(attrName)) {
                        const dir = attrName.substring(1)
                        this.eventHandler(node,this.$vm,exp,dir)
                    }

                })
            }else if(this.isInterpolation(node)) {
                // 编译文本
                this.compileText(node)
            }

            // 递归子节点
            if(node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }
        })
    }

    compileText(node){
        this.update(node,this.$vm,RegExp.$1.trim(),'text')
    }

    // 更新函数
    update(node,vm,exp,dir){
        const updaterFn = this[dir+'Updater']
        // 初始化
        updaterFn && updaterFn(node,vm[exp])
        // 依赖收集
        new Watcher(vm,exp,function(value){
            updaterFn && updaterFn(node,value)
        })
    }

    text(node,vm,exp) {
        this.update(node,vm,exp,"text")
    }

    // 双向绑定
    model(node,vm,exp) {
        // 指定input的value属性
        this.update(node,vm,exp,"model")
        // 视图对应模型响应
        node.addEventListener("input",e=>{
            vm[exp] = e.target.value
        })
    }

    modelUpdater(node,value) {
        node.value = value
    }

    html(node,vm,exp) {
        this.update(node,vm,exp,"html")
    }

    htmlUpdater(node,value) {
        node.innerHTML = value
    }

    textUpdater(node,value){
        node.textContent = value
    }

    // 事件处理器
    eventHandler(node,vm,exp,dir) {
        let fn = vm.$options.methods && vm.$options.methods[exp]
        if(dir && fn) {
            node.addEventListener(dir,fn.bind(vm))
        }
    }

    isDirective(attr) {
        return attr.indexOf("z-") == 0
    }

    isEvent(attr){
        return attr.indexOf("@") == 0
    }

    isElement(node) {
        return node.nodeType === 1
    }

    // 插值文本
    isInterpolation(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }
}


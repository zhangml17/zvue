class Compile {
    constructor(el,vm) {
        this.$el = document.querySelector(el)
        this.$vm = vm

        if(this.$el) {
            this.$fragment = this.node2Fragment(this.$el)
            this.compile(this.$fragment)
            this.$el.appendChild(this.$fragment)
        }

    }

    node2Fragment(el) {
        let fragment = document.createDocumentFragment()
        let child 
        while(child = el.firstChild) fragment.appendChild(child)
        return fragment
    }
    compile(el) {
        const childNodes = el.childNodes
        Array.from(childNodes).forEach( node => {
            if(this.isElement(node)) { // 是元素节点
                const nodeAttrs = node.attributes
                // v-text v-html v-model
                Array.from(nodeAttrs).forEach( attr => {
                    const attrName = attr.name
                    const exp = attr.value
                    if(this.isDirective(attrName)) { // 指令 v-xx
                        const dir = attrName.substring(2)
                        // 执行指令
                        this[dir] && this[dir](node, this.$vm, exp)
                    }
                    if(this.isEvent(attrName)) { // 事件 @xx
                        const event = attrName.substring(1)
                        // button this.$vm click changeName
                        this.eventHandler(node, this.$vm, event, exp)
                    }
                })
            }else if(this.isInterpolation(node)){ // 是插值
                this.compileText(node)
            }
            // 递归
            if(node.childNodes && node.childNodes.length) this.compile(node)
        })
    }
    compileText(node) {
        this.update(node, this.$vm, RegExp.$1.trim(), 'text')
    }
    update(node, vm, expOrFn, dir) {
        const updateFn = this[dir+'Updater']
        updateFn && updateFn(node, vm[expOrFn])
        new Watcher(vm, expOrFn, function(value) {
            updateFn && updateFn(node, value)
        })
    }
    eventHandler(node, vm, event, methodName) {
        let fn = vm.$options.methods && vm.$options.methods[methodName]
        if(event && fn) {
            node.addEventListener(event, fn.bind(vm))
        }
    }
    model(node, vm, exp) {
        this.update(node, vm, exp, 'model')
        node.addEventListener('input', e => {
            vm[exp] = e.target.value
        })
    }
    html(node, vm, exp) {
        this.update(node, vm, exp, 'html')
    }
    text(node, vm, exp) {
        this.update(node, vm, exp, 'text')
    }
    modelUpdater(node, value) {
        node.value = value
    }
    htmlUpdater(node, value) {
        node.innerHTML = value
    }
    textUpdater(node, value) {
        node.textContent = value
    }
    isEvent(attr) {
        return attr.indexOf('@') == 0
    }
    isDirective(attr) {
        return attr.indexOf('v-') == 0
    }
    isElement(node) {
        return node.nodeType === 1
    }
    isInterpolation(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }
}
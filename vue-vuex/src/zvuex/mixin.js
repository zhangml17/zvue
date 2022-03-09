export default function applyMixin(Vue) {
    Vue.mixin({ // 全局混入,绑定全局$store属性
        beforeCreate() {
            console.log(this.$options.name)
            let options = this.$options
            if(options.store) { // 根实例
                this.$store = options.store
            }else if(options.parent && options.parent.$store) { // 子实例
                this.$store = options.parent.$store
            }
        },
    })
}
export default {
    name:'routerLink',
    props:{
        to:{
            type:String,
            require:true
        },
        tag:{
            type:String,
            default:'a'
        }
    },
    methods:{
        handler(to) {
            this.$router.push(to)
        }
    },
    render() {
        let { tag, to } = this
        return <tag onClick={ this.handler.bind(this, to) }>{ this.$slots.default }</tag>
    }
}
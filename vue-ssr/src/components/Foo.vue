<template>
    <div class="foo-wrap">
        Foo
        <h1>{{ $store.state.name }}</h1>
    </div>
</template>

<<script>
export default {
    // 可能有些数据需要在服务端操作更新，但服务端没有mounted钩子，因此定义自定义方法实现
    asyncData(store) { // 服务端使用，仅页面级组件使用
        return store.dispatch('asyncChangeName', 'wangwu')
        // 服务端执行完毕后，渲染正常，但是前端的vuex中的老数据会再次覆盖服务端的数据，因此需要同步数据
    },
    // mounted() { // 客户端浏览器使用
    //     this.$store.dispatch('asyncChangeName', 'wangwu')
    // },
    data() {
        return {

        }
    }
}
</script>

<style scoped>
.foo-wrap {
    color: red;
}
</style>
<template>
  <div id="app">
    <h1>{{ $store.state.age }}岁</h1>
    <h1>mapState辅助函数实现：{{ age }}岁</h1>
    <h1>mapGetters:{{ myAge }}岁</h1>
    <h1>a模块{{ $store.state.a.age }}岁</h1>
    <h1>b模块{{ $store.state.b.age }}岁</h1>
    <h1>c模块{{ $store.state.a.c.age }}岁</h1>
    <button @click="$store.state.age++">测试state</button>
    <button @click="$store.commit('a/c/cChangeAge', 1)">同步增加年龄</button>
    <button @click="$store.dispatch('a/c/asyncCchangeAge', 1)">异步增加年龄(存在问题)</button>
  </div>
</template>

<script>
import { mapState, mapGetters } from './zvuex'

export default {
  name: 'App',
  components: {
  },
  computed:{
    ...mapState(['age']),
    ...mapGetters(['myAge'])
  },
  mounted() {
    console.log(this.$store)
  },
}
</script>

<style lang="less">

</style>

<template>
  <div id="app">
    <h1>{{ $store.state.age }}岁</h1>
    <h1>{{ $store.getters.myAge }}岁</h1>

    <button @click="$store.state.age++">测试state</button>
    <button @click="$store.commit('changeAge', 1)">同步增加年龄</button>
    <button @click="$store.dispatch('asyncChangeAge', 1)">异步增加年龄</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  mounted() {
    console.log(this.$store)
  },
}
</script>

<style lang="less">

</style>

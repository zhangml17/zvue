<template>
  <div id="app">
    <h1>{{ $store.state.age }}岁</h1>
    <button @click="$store.commit('changeAge', 1)">同步增加年龄</button>
    <button @click="$store.dispatch('changeAge', 1)">同步增加年龄</button>
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

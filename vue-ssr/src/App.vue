<template>
    <div id="app">
        <router-link to="/">Bar</router-link>
        <router-link to="/foo">Foo</router-link>
        <router-view></router-view> 
    </div>
</template>

<<script>
import Bar from './components/Bar'
import Foo from './components/Foo'

export default {
    components: { Bar, Foo }
}
</script>
<template>
    <div @click="go">
        Bar
    </div>
</template>

<<script>
export default {
    methods: {
        go() {
            alert(1)
        }
    },
}
</script>
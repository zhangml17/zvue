export function mapState(stateArr) {
    let obj = {}
    for (let i = 0; i < stateArr.length; i++) {
        let name = stateArr[i]
        obj[name] = function () {
            return this.$store.state[name]
        }
    }
    return obj
}

export function mapGetters(getterArr) {
    let obj = {}
    for (let i = 0; i < getterArr.length; i++) {
        let name = getterArr[i]
        obj[name] = function () {
            return this.$store.getters[name]
        }
    }
    return obj
}
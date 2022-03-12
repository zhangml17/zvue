export default {
    namespace:true,
    state:{
        age: 100
    },
    getters:{
        bAge(state) {
            return state++
        }
    },
    mutations:{
        bChangeAge(state, payload) {
            state.age += payload
        }
    },
    actions:{
        asyncBchangeAge({ commit }, payload) {
            setTimeout(() => {
                commit('bChangeAge', payload)
            }, 1000)
        }
    }

}
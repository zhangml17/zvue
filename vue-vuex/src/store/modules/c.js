export default {
    namespace:true,
    state:{
        age: 100
    },
    getters:{
        cAge(state) {
            return state++
        }
    },
    mutations:{
        cChangeAge(state, payload) {
            state.age += payload
        }
    },
    actions:{
        asyncCchangeAge({ commit }, payload) {
            setTimeout(() => {
                commit('cChangeAge', payload)
            }, 1000)
        }
    }

}
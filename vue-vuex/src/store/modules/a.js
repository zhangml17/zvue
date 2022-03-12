import c from './c'

export default {
    namespaced:true,
    state:{
        age: 100
    },
    getters:{
        aAge(state) {
            return state++
        }
    },
    mutations:{
        aChangeAge(state, payload) {
            state.age += payload
        }
    },
    actions:{
        asyncAchangeAge({ commit }, payload) {
            setTimeout(() => {
                commit('aChangeAge', payload)
            }, 1000)
        }
    },
    modules:{
        c
    }
}
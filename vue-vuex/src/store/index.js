import Vue from 'vue'
import ZVuex from '@/zvuex'

Vue.use(ZVuex)  // ZVuex 有install方法

const store = new ZVuex.Store({ // ZVuex中有个Store类
    state:{
        age:10
    },
    getters:{
        myAge(state) {
            return state.age++
        }
    },
    mutations:{
        changeAge(state, payload) {
            state.age += payload
        }
    },
    actions:{
        asyncChangeAge({ commit }, payload) {
            // return new Promise((resolve, reject) => {
                setTimeout(() => {
                    commit('changeAge', payload)
                    // resolve()
                }, 1000)
            // })
        }
    },
    modules:{

    }
})

export default store
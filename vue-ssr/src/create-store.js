import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default () => {
    const store = new Vuex.Store({
        state:{
            name:'lisi',
            age:19
        },
        mutations:{
            changeName(state, payload) {
                state.name = payload
            }
        },
        actions:{
            asyncChangeName({ commit }, payload) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        commit('changeName', payload)
                        resolve()
                    }, 1000)
                })
            }
        }
    })
    // 前端运行时会执行，目的是将window上的服务端状态替换掉前端的state
    if(typeof window !== 'undefined' && window.__INITIAL_STATE__) {
        store.replaceState(window.__INITIAL_STATE__)
    }
    return store
}
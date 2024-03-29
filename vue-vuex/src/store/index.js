import Vue from 'vue'
import ZVuex from '@/zvuex'
import a from './modules/a'
import b from './modules/b'

Vue.use(ZVuex)  // ZVuex 有install方法

function persists() {
    return function(store) { 
        let data = localStorage.getItem('VUEX:STATE')
        if(data) {
            store.replaceState(JSON.parse(data))
        }
        store.subscribe((mutation, state) => {
            localStorage.setItem('VUEX:STATE', JSON.stringify(state))
        })
    }
}

const store = new ZVuex.Store({ // ZVuex中有个Store类
    plugins:[
        persists()
    ],
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
        a,
        b
    }
})

export default store
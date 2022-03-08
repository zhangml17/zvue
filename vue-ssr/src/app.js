import Vue from 'vue'
import App from './App.vue'
import createRouter from './create-router'
import createStore from './create-store'

export default () => {
    const router = createRouter()
    const store = createStore() 

    const app = new Vue({
        store,
        router,
        render: h => h(App)
    })
    return { app, router, store }
}
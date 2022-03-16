// 根据路径创建记录
export function createRoute(record, location) {
    const route = {
        path:location.path || '/',
        matched:record ? formatMatch(record) : []
    }
    return Object.freeze(route)
}

function formatMatch(record) {
    let res = []
    while(record) {
        res.unshift(record) // 传入子路由，其父路由应先渲染，所以放前面
        record = record.parent
    }
    return res
}

const runQueue = (queue, iterator, cb) => {
    // 异步迭代
    function step(index) {
        if(index >= queue.length) return cb()
        let hook = queue[index]
        iterator(hook, () => step(index+1))
    }
    step(0)
}

export class History {
    constructor(router) {
        this.router = router
        this.current = createRoute(null, { path:'/' })
    }
    listen(cb) {
        this.cb = cb
    }

    /**
     * 路由跳转
     * @param {*} location hash路径
     * @param {*} onComplete 跳转成功的回调
     */
    transitionTo(location, onComplete) {
        // 根据路由location加载不同的组件 并渲染
        // ...todo
        // 当前匹配到的路由结果
        let route = this.router.match(location) // { matched:[] }
        // 相同路由不用刷新
        if(location === this.current.path 
            && route.matched.length === this.current.matched.length) return
        
        let queue = [].concat(this.router.beforeHooks)
        const iterator = (hook, next) => {
            hook(this.current, route, () => {
                next()
            })
        }
        // 执行钩子队列
        runQueue(queue, iterator, () => {
            this.updateRoute(route)
            onComplete && onComplete()
        })
    }
    // 更新当前路由对象
    updateRoute(route) {
        this.current = route
        this.cb && this.cb(route)
        // 这个this.current使用：1、模板中用router-view 2、current要是响应式(更新视图)
    }
}
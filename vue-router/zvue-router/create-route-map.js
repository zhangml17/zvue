/**
 * 扁平化routes
 */
export default function createRouteMap(routes, oldPathMap) {
    let pathMap = oldPathMap || Object.create(null)

    routes.forEach( route => {
        addRouteRecord(route, pathMap)
    })

    return { pathMap }
}

function addRouteRecord(route, pathMap, parent) {
    let path = parent ? `${parent.path}/${route.path}` : route.path
    let record = {
        path,
        component:route.component,
        parent, // 标识当前路由的父路由
    }
    if(!pathMap[path]) pathMap[path] = record

    if(route.children) {
        route.children.forEach( route => {
            // 遍历子路由时需要拼接父路由路径
            addRouteRecord(route, pathMap, record)
        })
    }
}
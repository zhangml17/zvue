import createRouteMap from './create-route-map'
import { createRoute } from './history/base';

/**
 * 创建匹配器，匹配路由
 * @param {*} routes 
 */
export default function createMatcher(routes) {
    console.log(routes);

    // pathMap:根据路径path扁平化后的map
    const { pathMap } = createRouteMap(routes) // 扁平化数据
    
    function match(location) {
        let record = pathMap[location] // 一个路径可以匹配多个结果
        if(record) {
            return createRoute(record, { path:location })
        }
        return createRoute(null, { path:location })
    }
    // 添加routes，同时将新的routes也放到映射表中扁平化处理
    function addRoutes(routes) {
        createRouteMap(routes, pathMap) 
        console.log(pathMap, '---addRoutes pathMap');
        
    } 
    return {
        match,
        addRoutes
    }
}
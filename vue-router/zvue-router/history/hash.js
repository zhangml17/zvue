import { History } from "./base";

export class HashHistory extends History{
    constructor(router) {
        super(router)
        this.router = router
        // 页面刷新时，若无hash路径则 默认拼接‘/’
        ensureSlash()
    }
    // 监听路由变化
    setupListeners() {
        window.addEventListener('hashchange', () => {
            this.transitionTo(getHash()) // hash变化再次进行跳转
        })
    }
    // 获取hash路由
    getCurrentLocation() {
        return getHash()
    }

    push(location) {
        // 路由跳转之后，同时更新url地址
        this.transitionTo(location, replaceHash(location))
    }
}
// 保证hash
function ensureSlash() {
    const path = getHash()
    if(path.charAt(0) === '/') return true //有斜杠
    replaceHash('/' + path) // 无斜杠，则添加斜杠
    return false
}
// 获取hash路由
export function getHash() {
    let href = window.location.href
    const index = href.indexOf('#')
    if(index < 0) return '' 
    href = href.slice(index+1) // 形如：/about
    return href
}
// 替换地址栏路径
function replaceHash(path) {
    // 暂不做判断，直接替换path
    window.location.replace(getUrl(path))
}
// 使用传入的hash路径构建新的完整的url
function getUrl(path) {
    const href = window.location.href
    const i = href.indexOf('#') 
    const base = i >= 0 ? href.slice(0, i) : href // 获取#前的path
    return `${base}#${path}`
}
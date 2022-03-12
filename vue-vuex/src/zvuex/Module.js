import { forEachValue } from "../utils"

export default class Module {
    constructor(module) {
        this._row = module // 当前模块
        this.children = {} // 当前模块的子模块
        this.state = module.state //当前模块的state
    }
    getChild(key) {
        return this.children[key]
    }
    addChild(key, module) {
        return this.children[key] = module
    }
    forEachMutation(fn) {
        forEachValue(this._row.mutations, fn)
    }
    forEachAction(fn) {
        forEachValue(this._row.actions, fn)
    }
    forEachGetter(fn) {
        forEachValue(this._row.getters, fn)
    }
    forEachChild(fn) {
        forEachValue(this.children, fn)
    }
}
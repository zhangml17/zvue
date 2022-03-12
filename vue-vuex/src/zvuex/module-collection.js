import { forEachValue } from "../utils"
import Module from './Module'

export default class ModuleCollection {
    constructor(options) {
        this.registerModule([], options)
    }
    registerModule(path, currentModule) {
        let newModule = new Module(currentModule)

        if(path.length === 0) {
            this.root = newModule
        }else {
            let parent = path.slice(0, -1).reduce((total, current) => {
                return total.getChild(current)
            },this.root)
            parent.addChild(path[path.length - 1], newModule)
        }

        if(currentModule.modules) {
            forEachValue(currentModule.modules, (moduleValue, moduleName) => {
                this.registerModule(path.concat(moduleName), moduleValue)
            })
        }
    }
}
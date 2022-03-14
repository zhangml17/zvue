import { History } from "./base";

class HTML5History extends History{
    constructor(router) {
        super(router)
        this.router = router
    }
}
export {
    HTML5History
}
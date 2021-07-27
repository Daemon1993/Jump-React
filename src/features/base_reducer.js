import { TYPE_Tab_Hidden } from "./base_action"


const initStatus = { tab_hidden: false, home0_show: false }
const base_reducer = (status = initStatus, action) => {
    console.log("base_reducer Action " + action.type)
    switch (action.type) {
        case TYPE_Tab_Hidden:
            return { ...status, tab_hidden: action.tab_hidden }

       
        default:
            return status
    }
}

export default base_reducer
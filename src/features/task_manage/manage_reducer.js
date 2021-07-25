import { TYPE_Test } from "./action"



const initStatus = { }
const manage_reducer = (status = initStatus, action) => {
    console.log("test Action "+action.type)
    switch (action.type) {
        case TYPE_Test:
            return { ...status, text: action.text }
        default:
            return status
    }

}

 
export default manage_reducer


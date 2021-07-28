


const initStatus = { login_user: { login: false } }
const login_reducer = (status = initStatus, action) => {
    console.log("login_reducer Action " + action.type)
    switch (action.type) {
        case "login":

            return { ...status, login_user: action.user }
        case "type_dirs":

            return { ...status, dir_types: action.dir_types }
        default:
            return status
    }

}

export function actionLoginUser(user) {
    return {
        type: "login",
        user
    }
}

export function actionTypeDirs(dir_types) {
    return {
        type: "type_dirs",
        dir_types
    }
}

export default login_reducer
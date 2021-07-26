
export const TAG_LoginUser="tag_login_user";

const initStatus = { login_user: {login:false} }
const login_reducer = (status = initStatus, action) => {
    console.log("login_reducer Action " + action.type)
    switch (action.type) {
        case "login":
            localStorage.setItem(TAG_LoginUser,JSON.stringify(action.user));
            return { ...status, login_user: action.user}
        default:
            return status
    }

}

export function actionLoginUser(user) {
    return {
        type: "login",
        user: user
    }
}

export default login_reducer
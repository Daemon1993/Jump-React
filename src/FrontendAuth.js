import React from "react"
import { Redirect, Route } from "react-router-dom";

import store from './features/store';
import BaseUtils from "./BaseUtils";
export default class FrontendAuth extends React.Component {
   
    render() {
       console.log(this.props)
        const { routerConfig, location } = this.props;
        const path = location.pathname;

        console.log("path " + path)
        const targetRouter = routerConfig.find(item => {
            return item.path === path
        })

        // if(path==='/'){
        //     console.log("默认展示")
        
        //     return <Redirect from="/" to="/home0" />
        // }

        if (!targetRouter) {
            return <Redirect to="404" />
        }
        let isLogin = false;
        let user = store.getState().login_reducer.login_user;
        // console.log(user)
        if(!BaseUtils.isEmpty(user)){
            isLogin = user.login == 1;
        }
        console.log("islogin " + isLogin)
        if (isLogin) {
            if (path === "/login") {
                return <Redirect to="/login" />
            }
        } else {
            //未登录的情况
            if (targetRouter.auth) {
                console.log("需要登录")
                let state_data={
                    pathname:"/login",
                    user:user
                }
                return <Redirect exact to={state_data} />
            }
        }
        
        
        return (<Route exact path={path} component={targetRouter.component} />);
    }
}
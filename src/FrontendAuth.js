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

        let temp_path = path;
        if (path.indexOf("/article_detail") !== -1) {
            temp_path = "/article_detail";
        }

        const targetRouter = routerConfig.find(item => {

            return item.path === temp_path
        })



        if (path.indexOf("/article_detail") !== -1) {
            console.log("详情页面 " + targetRouter.path)
            return (<Route exact path={targetRouter.path + "/:objectId"} component={targetRouter.component} />);
        }




        if (!targetRouter) {
            return <Redirect to="404" />
        }
        let isLogin = false;
        let user = store.getState().login_reducer.login_user;
        if (!BaseUtils.isEmpty(user)) {
            isLogin = user.login === 1;
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
                let state_data = {
                    pathname: "/login",
                    user: user
                }
                return <Redirect exact to={state_data} />
            }
        }
        return (<Route exact path={targetRouter.path} component={targetRouter.component} />);
    }
}
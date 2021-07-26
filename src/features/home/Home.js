import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { actionLoginUser, TAG_LoginUser } from "../task_manage/login/login_reducer";

// import './Home.s';
import './Home.scss'


 class Home extends React.Component {

    componentDidMount() {
        console.log("componentDidMount")
        //监听获取 user 设置 store
        window.addEventListener("storage", e => {
            if (e.key === 'tag_login_user') {
                let res = JSON.parse(e.newValue);
                console.log(res)
                let user = {
                    ...res,
                    login: 1
                }
                console.log(user)
                this.props.dispatch(actionLoginUser(user))
                //当前 login_reducer 设置值 之后 清除localstorage
                localStorage.removeItem(TAG_LoginUser)
            }
        });

    }
    render() {
        return (
            <div className="home_main">
                <h1 onClick={this.go2Home}>Home</h1>

                <div className="home_tabs">
                    <Link to="/tech" className="home_tab">技术文章</Link>
                    <Link to="/self_u" className="home_tab">个人分享</Link>
                    <Link to="/manage"  className="home_tab">管理后台</Link>
                </div>

            </div>
        )
    }

    go2Home = () => {
        // console.log(this.props.history)
        this.props.history.replace("/");
    }
}

const HomeConnect=connect()(Home)
export default HomeConnect
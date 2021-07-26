import React from "react";

import { Input, Button, Dropdown } from 'antd';
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';

import styles from './login.scss';

 
import { connect } from "react-redux";
import Bmob from "hydrogen-js-sdk";

import CryptoJS from "crypto-js";

import { actionLoginUser } from './login_reducer';
 


let reset_k = "NDUxOTkzMTkzNw==";


class Login extends React.Component {

    constructor(props) {
        super(props)

        console.log(this.props.location)

        this.state = {
            username: '',
            pwd: ""
        }
        
    }

    // static getDerivedStateFromProps(nextProps, prevState) {

    //     if (nextProps.user.login==1) {
    //         console.log("登录状态成功")
    //         nextProps.history.replace("/manage");
    //     }
    //     return null; // 这里一定要return null
    // }

    componentDidMount() {
        console.log(this.props)
        // 初始化 SDK版本 2.0.0 以下保留之前的初始化方法

        let reset_k1 = CryptoJS.enc.Base64.parse(reset_k).toString(CryptoJS.enc.Utf8);
        reset_k1 = reset_k1.substring(2, reset_k1.length - 2)

        Bmob.initialize("c5bfe65ab37d31cd", reset_k1);

    }
    render() {
        return (
            <div className={styles.main}>
                <div className={styles.top_tag}>Login {this.props.user.login}</div>
                <div className={styles.login_main}>
                    <Input value={this.state.username} onChange={this.usernameInput} size="large" placeholder="username" prefix={<UserOutlined />} />

                    <Input.Password
                        onChange={this.pwdInput}
                        value={this.state.pwd}
                        className={styles.pwd}
                        size="large"
                        placeholder="password"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />

                    <Button onClick={this.login2Server} className={styles.bt_sub} type="primary">登录</Button>
                </div>

            </div>
        )
    }

    login2Server = () => {
        console.log(this.state)

        let username = this.state.username;
        let pwd = CryptoJS.MD5(this.state.pwd).toString();

        // 项目其他页面使用跟小程序一样使用Bmob对象即可，例如：
        Bmob.User.login(username, pwd).then(res => {
            console.log(res)
            let secret0 = res.secret0;
            let secret1 = res.sercert1;
            secret1 = CryptoJS.enc.Base64.parse(secret1).toString(CryptoJS.enc.Utf8);
            secret1 = secret1.substring(0, secret1.length - 3)

            let bytes = CryptoJS.AES.decrypt(secret0, secret1);
            let originalText = bytes.toString(CryptoJS.enc.Utf8);
            let ttt = originalText.substring(1, originalText.length - 1);


            let user = {
                username: res.username,
                sessionToken: res.sessionToken,
                ttt: ttt,
                login: 1
            }

            console.log(user)

            this.props.dispatch(actionLoginUser(user))

            this.props.history.replace("/manage");

        }).catch(err => {
            console.log(err)
        });
    }
    usernameInput = (evt) => {
        this.setState({
            username: evt.target.value
        })
    }
    pwdInput = (evt) => {
        this.setState({
            pwd: evt.target.value
        })
    }
}

function mapState2Props(state) {
    console.log("mapState2Props ")

    return {
        user: state.login_reducer.login_user
    }
}

const LoginConnect = connect(mapState2Props)(Login)
 

export default  LoginConnect
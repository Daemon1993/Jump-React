import React from "react";
import { Link } from "react-router-dom";

import './Home.css'

export default class Home extends React.Component {

    render() {
        return (
            <div className="home_main">
                <h1 onClick={this.go2Home}>Home</h1>

                <div className="home_tabs">
                    <Link to="/tech" className="home_tab">技术文章</Link>
                    <Link to="/self_u" className="home_tab">个人分享</Link>
                    <Link to="/manage" target="_blank" className="home_tab">管理后台</Link>
                </div>

            </div>
        )
    }

    go2Home=()=>{
        // console.log(this.props.history)
        this.props.history.replace("/");
    }
}
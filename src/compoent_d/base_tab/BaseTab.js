import React from "react";
import { Link, withRouter } from "react-router-dom";

import styles from './basetab.scss';

 class BaseTab extends React.Component {
    
    render() {
        const {location: {pathname}} = this.props;
        console.log(pathname)
        if(pathname=='/login' || pathname=='/manage'){
            return null;
        }
        return (
            <div className={styles.main}>
                <h1 onClick={this.go2Home}>Jump-React Daemon</h1>
                <div className={styles.home_tabs}>
                    <Link to="/tech" className={styles.home_tab}>技术文章</Link>
                    <Link to="/self_u" className={styles.home_tab}>个人分享</Link>
                    <Link to="/manage" target="_blank" className={styles.home_tab}>管理后台</Link>
                </div>
            </div>


        )
    }
    go2Home = () => {
        // console.log(this.props.history)
        this.props.history.replace("/");
    }
}

export default withRouter(BaseTab)
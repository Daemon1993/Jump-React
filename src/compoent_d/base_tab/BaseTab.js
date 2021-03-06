
import React from "react";
import { Link, withRouter } from "react-router-dom";
import 'antd/dist/antd.css';

import styles from './basetab.scss';
import showUnderLine4Comp from "../showUnderLine4Comp/showUnderLine4Comp";


const Tech = showUnderLine4Comp(() => <Link to="/tech" className={styles.home_tab}>技术文章</Link>)
const SelfU = showUnderLine4Comp(() => <Link to="/self_u" className={styles.home_tab}>嘿嘿嘿</Link>)
const Manage = showUnderLine4Comp(() => <Link to="/manage" target="_blank" className={styles.home_tab}>管理后台</Link>)


class BaseTab extends React.Component {

    state = {

    }

    render() {
        const { location: { pathname } } = this.props;
        console.log(pathname)
        if (pathname === '/login' || pathname === '/manage') {
            return null;
        }
        return (
            <div className={styles.main}>
                <div className={styles.content_main}>
                    <div className={styles.title} onClick={this.go2Home}><span>Daemon 的博客</span></div>
                    <div className={styles.home_tabs}>
                        <Tech select_state={pathname == '/tech'} />
                        <SelfU select_state={pathname == '/self_u'} />
                        <Manage />

                        <div className={styles.p_a_main}>
                            <a target="_blank" href="https://github.com/Daemon1993" 
                            className={styles.home_tab_a}>Github</a>
                        </div>

                    </div>
                </div>
                <div className={styles.line_0}></div>
            </div>


        )
    }
    go2Home = () => {
        // console.log(this.props.history)
        this.props.history.replace("/");
    }
}



export default withRouter(BaseTab)

import ServerNetWorkUtils from "@/data_model/ServerNetWorkUtils";
import React from "react";
import { connect } from "react-redux";


// import './Home.s';
import styles from './Home.scss'


class Home extends React.Component {

    componentDidMount(){
        ServerNetWorkUtils.initBmob()
    }
    
    render() {

        return (
            <div className={styles.home_main}>

                <img className={styles.logo_} src={'jump_logo.png'} />

                <div className={styles.msg}>勿妄自菲薄，勿自夸自傲</div>
            </div>
        )
    }


}

function mapState2Props(state) {
    console.log("mapState2Props ")
    console.log(state.base_reducer)
    return {
        tab_hidden: state.base_reducer.tab_hidden,
    }
}

const HomeConnect = connect(mapState2Props)(Home)
export default HomeConnect
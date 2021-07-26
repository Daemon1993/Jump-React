
import React from "react";
import { connect } from "react-redux";


// import './Home.s';
import styles from './Home.scss'


class Home extends React.Component {

    render() {

        return (
            <div className={styles.home_main}>

               <h1>Home</h1>

            </div>
        )
    }


}

function mapState2Props(state) {
    console.log("mapState2Props ")
    console.log(state.base_reducer)
    return {
        tab_hidden: state.base_reducer.tab_hidden,
        home0_show: state.base_reducer.home0_show,
    }
}

const HomeConnect = connect(mapState2Props)(Home)
export default HomeConnect
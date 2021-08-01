
import TimeShow from "@/compoent_d/time_list/TimeShow";
import ServerNetWorkUtils from "@/data_model/ServerNetWorkUtils";
import React from "react";
import { connect } from "react-redux";


// import './Home.s';
import styles from './Home.scss'


class Home extends React.Component {

    state = {
        items: []
    }
    componentDidMount() {
        ServerNetWorkUtils.initBmob()

        ServerNetWorkUtils.getAllTitlesArticles()
            .then(res => {
                res = res.reverse()
                let result = {}
                for (let item in res) {
                    let data = res[item]
                    let year = new Date(data["createdAt"]).getFullYear();
                    let datas = result[year];
                    console.log(year)
                    if (datas === undefined) {
                        console.log(year + " 不存在")
                        datas = []
                    }
                    datas.push(data)
                    result[year] = datas
                }
                console.log(result)

                this.setState({
                    items: result
                })
            }).catch(error => {
                console.log(error)
            })
    }

    render() {

        return (
            <div className={styles.home_main}>

                <div className={styles.logo_main}>
                    <img className={styles.logo_} src={'jump_logo.png'} />

                    <div className={styles.msg}>Everything will be OK</div>
                </div>


                <div className={styles.content}>
                    <TimeShow items={this.state.items} />
                </div>

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
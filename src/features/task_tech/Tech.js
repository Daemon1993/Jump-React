import ContentShow from "@/compoent_d/ContentShow/ContentShow";
import TimeShow from "@/compoent_d/time_list/TimeShow";
import ServerNetWorkUtils from "@/data_model/ServerNetWorkUtils";
import React, { useEffect, useState } from "react";

import styles from './Tech.scss'


let count = 0;
export default function Tech() {

    let hahah = 0
    const [items, setItems] = useState([]);
    const [types, setTypes] = useState([])
    const [select_title_id, setSelectId] = useState('initialState')

    function getTitlesByTypeItemId(objectId) {
        setSelectId(objectId)
        ServerNetWorkUtils.getAllTitlesArticleItemId(objectId)
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
                setItems(result)
            }).catch(error => {
                console.log(error)
            })
    }

    function isSelectTitle(objectId) {
        return this.state.select_title_id == objectId ? styles.title_select : "";
    }

    useEffect(() => {

        // if (count > 3) {
        //     console.log("死循环 阻止")
        //     return
        // }
        // count++;

        ServerNetWorkUtils.initBmob()
        console.log("useEffect")

        ServerNetWorkUtils.getAllTitlesTB_Type_Items()
            .then(res => {
                console.log(res)
                setTypes(res)
                getTitlesByTypeItemId(res[0].objectId)
            })
            .catch(error => {
                console.log(error)
            })
    }, [hahah])

    function isSelectTitle(objectId) {
        console.log("isSelectTitle")
        return select_title_id == objectId ? styles.title_select : "";
    }

    function clickTitle(objectId) {
        console.log(objectId)
        getTitlesByTypeItemId(objectId)
    }

    return (
        <div className={styles.main}>
            <div className={styles.left_main}>
                {types.map(data =>
                    <div
                        onClick={() => clickTitle(data.objectId)}
                        className={styles.name + " " + isSelectTitle(data.objectId)}
                        key={data.objectId}>{data.name}</div>)
                }
            </div>
            <div className={styles.v_line}></div>
            <div className={styles.right_main}>
                <TimeShow items={items} />
            </div>
        </div >
    )

}
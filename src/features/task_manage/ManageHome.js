/***
 * 编辑器功能
 */

import React from "react";
import styles from './manage.scss';



import ServerNetWorkUtils from "@/data_model/ServerNetWorkUtils";


import loadable from "@loadable/component";
import UnderLineTab from "@/compoent_d/under_line_tab/UnderLineTab";

const TypeManage = loadable(() => import('./type_manage/TypeManage'))
const PushArticle = loadable(() => import('./push_article/PushArticle'))


export default class ManageHome extends React.Component {

    constructor(props) {
        console.log("ManageHome")
        super(props)
        this.state = {
            //0 type 1 文章 2发布文章
            show_id: 0,
            items:[{id:0,name:'文章目录管理'},{id:1,name:'文章管理'},{id:2,name:'发布文章'}]
        }

        ServerNetWorkUtils.initBmob();
    }

    render() {

        const ShowCmp = this.getRealCmp();

        return (
            <div className={styles.main}>
                <div className={styles.top}>
                    <h1>Jump 后台管理</h1>
                     
                    <UnderLineTab clickItem={this.clickItem} select_id={this.state.show_id} items={this.state.items} />
                </div>

                <div className={styles.content}>
                    {ShowCmp}
                </div>
            </div>

        )
    }
    clickItem=(id)=>{
        console.log("clickItem "+id)
        this.setState({
            show_id: id
        })
    }

   
    getRealCmp = () => {

        if (this.state.show_id === 1) {
            return <TypeManage />
        }
        if (this.state.show_id === 2) {
            return <PushArticle callback_tab_select={this.clickItem} />
        }

        return <TypeManage />
    }


    callback_tab_select

}
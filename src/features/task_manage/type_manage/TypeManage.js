import ServerNetWorkUtils from "@/data_model/ServerNetWorkUtils";
import React from "react";

export default class TypeManage extends React.Component {

    componentDidMount() {
        console.log("-----TypeManage-componentDidMount-----")
        ServerNetWorkUtils.getTypesData().then(res => {
            this.setState({
                types: res
            })
        }).catch(error => {
            console.log(error)
        })
    }
    render() {
        return (
            <div>
                <h1>类型目录管理</h1>
            </div>
        )
    }
}
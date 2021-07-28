import ServerNetWorkUtils from "@/data_model/ServerNetWorkUtils";
import React from "react";
import { Button, Card, Col, Empty, Input, List, Modal, Row } from 'antd';
import 'antd/dist/antd.css';

import styles from './typemanage.scss';
import { connect } from "react-redux";
import { actionTypeDirs } from "../login/login_reducer";

class TypeManage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            types: [],
            add_dialog_show: false,
            dir_name: ''
        }
    }

    getTypesData = () => {
        ServerNetWorkUtils.getTypesData().then(res => {
            console.log(res)
            this.setState({
                types: res
            })
            this.props.dispatch(actionTypeDirs(res))
        }).catch(error => {
            console.log(error)
        })
    }
    componentDidMount() {
        console.log("-----TypeManage-componentDidMount-----")
        this.getTypesData()
    }
    render() {
        return (
            <div className={styles.main}>
                <div className={styles.add_type}>
                    <Button onClick={this.add_type} shape="round">添加目录</Button>
                    <Button shape="round">编辑目录</Button>
                </div>
                {this.state.types.length > 0 ?
                    <DataShow datas={this.state.types} />
                    : <Empty />}

                <Modal title="添加目录-输入目录名" visible={this.state.add_dialog_show}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>

                    <Input size="large" placeholder="目录名" value={this.state.dir_name} onChange={this.dir_inputChange} />

                </Modal>
            </div>
        )
    }

    dir_inputChange = (evt) => {
        this.setState({
            dir_name: evt.target.value
        }
        )
    }

    handleOk = () => {

        console.log("dir_name " + this.state.dir_name)
        //开始上传
        ServerNetWorkUtils.addTypeDir(this.state.dir_name)
            .then(res => {
                console.log(res)
                if (res.objectId) {
                    this.getTypesData()
                }
            });

        this.setState({
            add_dialog_show: false
        })
    };

    handleCancel = () => {
        this.setState({
            add_dialog_show: false
        })
    };
    add_type = () => {
        this.setState({
            add_dialog_show: true
        })
    }
}


function DataShow(props) {

    return (
        <div className={styles.content}>
            <Row gutter={16}>
                {
                    props.datas.map(data => {
                        return (
                            <Col key={data.objectId}>
                                
                                <Button>{data.name}</Button>
                            </Col>
                        )
                    })
                }
            </Row>

        </div>
    )
}

const TypeManageConnect= connect()(TypeManage)
export default TypeManageConnect

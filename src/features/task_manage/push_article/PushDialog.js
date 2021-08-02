import ServerNetWorkUtils from "@/data_model/ServerNetWorkUtils";
import store from "@/features/store";
import { Radio, Tag } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect } from "react";
import EditableTagGroup from "./EditableTagGroup";

let types = store.getState().login_reducer.dir_types;


export default function PushDialog(props) {

    const [value, setValue] = React.useState(types[0].objectId);
    const [type_item_id, setTypeItemId] = React.useState("");

    const [showTypeItems, setshowTypeItems] = React.useState(false)
    const [type_items, setTypeItems] = React.useState([])

    let tag_cmp;

    let type_items_effect=0

    useEffect(()=>{
        ServerNetWorkUtils.getAllTitlesTB_Type_Items("514b01f381")
        .then(res=>{
            console.log(res)
            setTypeItems(res)
        }).catch(error=>{
            console.log(error)
        })

    },[type_items_effect])

    const onChange = e => {
        console.log('radio checked', e.target.value);
        if (e.target.value == "514b01f381") {
            console.log("选择技术文章 显示二级分类")
            setshowTypeItems(true)
        } else {
            setshowTypeItems(false)
        }
        setValue(e.target.value);
        // props.dir_select_callback(e.target.value)
    };
    const onChange1 = e => {
        console.log('radio checked', e.target.value);

        setTypeItemId(e.target.value);
        // props.dir_select_callback(e.target.value)
    };

    const callback_results = (tags) => {
        console.log(tags)
    }

    const onOk = () => {

        let result = {
            type_id: value,
            type_item_id: type_item_id,
            tags: tag_cmp.getResultTag()
        }
        // console.log(result)
        props.onOk(result)
    }



    return (

        <Modal title="请确认相关信息" visible={props.visible} onOk={onOk} onCancel={props.onCancel}>
            <Radio.Group onChange={onChange} value={value}>
                {types.map(dir => {
                    return <Radio key={dir.objectId} value={dir.objectId}>{dir.name}</Radio>
                })}
            </Radio.Group>

            {showTypeItems ?


                <div>
                    <br />
                    <br />
                    <Radio.Group onChange={onChange1} value={type_item_id}>
                        {type_items.map(type_item => {
                            return <Radio key={type_item.objectId} value={type_item.objectId}>{type_item.name}</Radio>
                        })}
                    </Radio.Group>
                </div>

                : null}


            <br />
            <br />
            <EditableTagGroup ref={(ref) => { tag_cmp = ref }} callback_results={callback_results} />

        </Modal>
    )


}
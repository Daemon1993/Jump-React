import store from "@/features/store";
import { Radio, Tag } from "antd";
import Modal from "antd/lib/modal/Modal";
import React from "react";
import EditableTagGroup from "./EditableTagGroup";

let types = store.getState().login_reducer.dir_types;


export default function PushDialog(props) {

    const [value, setValue] = React.useState(types[0].objectId);
   
    
    let tag_cmp;

    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
        // props.dir_select_callback(e.target.value)
    };

    const callback_results = (tags) => {
        console.log(tags)
    }

    const onOk=()=>{
        
        let result={
            type_id:value,
            tags:tag_cmp.getResultTag()
        }
        props.onOk(result)
    }

    

    return (

        <Modal title="请确认相关信息" visible={props.visible} onOk={onOk} onCancel={props.onCancel}>
            <Radio.Group onChange={onChange} value={value}>
                {types.map(dir => {
                    return <Radio key={dir.objectId} value={dir.objectId}>{dir.name}</Radio>
                })}
            </Radio.Group>

            <br />
            <br />
            <EditableTagGroup ref={(ref) => { tag_cmp = ref }} callback_results={callback_results} />

        </Modal>
    )


}
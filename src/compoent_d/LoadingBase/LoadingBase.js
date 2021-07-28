import { Spin } from "antd";

import styles from './LoadingBase.scss'

export default function LoadingBase(props){

    return(
        <Spin size="large" spinning={props.spinning} className={styles.center} />
    )
}
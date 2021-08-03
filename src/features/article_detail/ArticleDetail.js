import BaseUtils from "@/BaseUtils";
import ContentShow from "@/compoent_d/ContentShow/ContentShow";

import { useState } from "react";

import styles from './ArticleDetail.scss';


export default function ArticleDetail(props) {


    const [tags, setTags] = useState([])
    const tagsCallBack = (tags) => {
        console.log(tags)
        let result = tags.split(",")
        console.log(result)

        setTags(result)
    }
    console.log(props)
    let objectId = props.match.params.objectId
    return (

        <div className={styles.main}>
            <div className={styles.left}>
                {tags.map(item => {
                    let color = BaseUtils.getRandomColor();

                    return <div style={{ backgroundColor: "#" + color }} className={styles.tag} key={item} >{item}</div>
                })}
            </div>
            <div className={styles.v_line} />
            <div className={styles.right}>
                <ContentShow tagsCallback={tagsCallBack} id={objectId} />
            </div>

        </div>




    )
}
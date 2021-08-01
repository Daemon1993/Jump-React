
import styles from './TimeShow.scss'

import BaseUtils from '../../BaseUtils';
import { useState } from 'react';

/**
 * 时间轴组件 list
 * @returns 
 */
export default function TimeShow(props) {

    // items->item{year,[{title,id}]}

    // console.log(Object.keys(props.items))
    if (BaseUtils.isEmpty(props.items)) {
        return "暂无数据";
    }
 

    return (
        <div className={styles.main0}>
            {
                Object.keys(props.items).map(item => {
                    return getShowYearContent(item,props.items[item])
                })
            }
        </div>

    )
    function getShowYearContent(year,datas) {

        // console.log(year)
        // console.log(datas)
        return <div key={year} className={styles.main}>
            <div className={styles.year_main}>
                <div className={styles.time_year_main}>
                    <div className={styles.time_year_line}></div>
                    <div className={styles.cirlce}></div>
                </div>
                <div  className={styles.year}>{year}</div>
            </div>
            {TitleLists(datas)}
        </div>

    }

   
    function TitleLists(datas) {
        const [select_id,setSelectId]= useState("");
        return datas.map((data, index) => {
            return (
                <div key={data.objectId} className={styles.title_main}>
                    <div className={styles.time_v_main_title}>
                        <div className={ styles.time_v_line_title}></div>
                        <div onMouseEnter={()=>setSelectId(data.objectId)} onMouseLeave={()=>setSelectId("")} className={styles.cirlce +" "+(select_id===data.objectId?styles.mouse_enter_bg_color:"")}></div>
                    </div>
                    <div onMouseEnter={()=>setSelectId(data.objectId)} onMouseLeave={()=>setSelectId("")} 
                    className={styles.title +" "+(select_id===data.objectId?styles.mouse_enter_color:"")}>
                        {data.title}
                        <div className={styles.h_line}></div>
                    </div>
                </div>
            )
        })
    }
}
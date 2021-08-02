
import styles from './TimeShow.scss'

import BaseUtils from '../../BaseUtils';
import { useState } from 'react';
import { withRouter } from 'react-router-dom';

/**
 * 时间轴组件 list
 * @returns 
 */
  function TimeShow(props) {

    // items->item{year,[{title,id}]}

    // console.log(Object.keys(props.items))
    if (BaseUtils.isEmpty(props.items)) {
        return <h1>暂无数据</h1>;
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
    function clickItem(objectId){
        // console.log(props)
        props.history.push({
            pathname:"/article_detail",
            state:{objectId:objectId}
        });
       
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
                    <div onClick={()=>{clickItem(data.objectId)}} onMouseEnter={()=>setSelectId(data.objectId)} onMouseLeave={()=>setSelectId("")} 
                    className={styles.title +" "+(select_id===data.objectId?styles.mouse_enter_color:"")}>
                        {data.title}
                        <div className={styles.h_line}></div>
                    </div>
                </div>
            )
        })
    }
}


export default withRouter(TimeShow)
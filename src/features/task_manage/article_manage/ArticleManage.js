import TimeShow from "@/compoent_d/time_list/TimeShow";
import ServerNetWorkUtils from "@/data_model/ServerNetWorkUtils";
 
import { useEffect, useState } from "react";

 
import styles from './ArticleManage.scss';
export default function ArticleManage() {

    let hahah=0
    const [items,setItems]=useState([]);

   
    useEffect(()=>{

        console.log("useEffect")
        ServerNetWorkUtils.getAllTitlesArticles()
        .then(res=>{
            res=res.reverse()
            let result={}
            for(let item in res){
                let data=res[item]

                let year=new Date(data["createdAt"]).getFullYear();
                let datas=result[year];

                console.log(year)
                if(datas===undefined){
                    console.log(year+" 不存在")
                    datas=[]
                }
                datas.push(data)
                result[year]=datas
            }
            console.log(result)
            setItems(result)
        }).catch(error=>{
            console.log(error)
        })
    },[hahah])
    return (
        <div className={styles.main}> <TimeShow items={items} /></div>
        
    )
}
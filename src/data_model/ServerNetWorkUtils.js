import Bmob from "hydrogen-js-sdk";

import CryptoJS from "crypto-js";
const TB_Types = 'Types'
const TB_Article = 'Article'

export default class ServerNetWorkUtils {

    static initBmob() {
        console.log("---initBmob")
        let reset_k = "NDUxOTkzMTkzNw==";
        let reset_k1 = CryptoJS.enc.Base64.parse(reset_k).toString(CryptoJS.enc.Utf8);
        reset_k1 = reset_k1.substring(2, reset_k1.length - 2)
        Bmob.initialize("c5bfe65ab37d31cd", reset_k1);
    }

    static pushArticle(requestBody){
        return new Promise((resolve, reject) => {
            const types_sql = Bmob.Query(TB_Article);
            types_sql.set("title",requestBody.title)
            types_sql.set("content",requestBody.content)
            types_sql.set("type_id",requestBody.type_id)
            types_sql.set("tags",requestBody.tags)
            types_sql.save().then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    }

    /**
     * 添加类型目录
     * @param {*} name 
     * @returns 
     */
    static addTypeDir(name) {
        return new Promise((resolve, reject) => {
            const types_sql = Bmob.Query(TB_Types);
            types_sql.set("name",name)
            types_sql.save().then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    }

    /**
     * 获取所有目录类型数据
     * @returns 
     */
    static getTypesData() {
        return new Promise((resolve, reject) => {
            const types_sql = Bmob.Query(TB_Types);
            types_sql.find().then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    }

}
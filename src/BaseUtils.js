

export default class BaseUtils {

    /**
     * 判断对象是否是空对象
     * @param {*} obj 
     * @returns 
     */
    static checkNullObj(obj) {
        return Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length === 0
    }

    /**
     * 统一判断空
     * @param {*} a 
     * @returns 
     */
     static isEmpty(a){
        if (a === "") return true; //检验空字符串
        if (!a) return true; // null           
        if (Array.prototype.isPrototypeOf(a) && a.length === 0 ) return true; //检验空数组
        if (Object.prototype.isPrototypeOf(a) && Object.keys(a).length === 0 ) return true;  //检验空对象
        return false;
    }
}
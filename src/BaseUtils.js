

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

    static getM_D(time_str){
        let date=new Date(time_str)

        return (date.getMonth()+1)+"-"+date.getDate();
    }

    static getRandomColor(){
        var colorStr="";
        //字串的每一字元的範圍
        var randomArr=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
        //產生一個六位的字串
        for(var i=0;i<6;i++){
          //15是範圍上限，0是範圍下限，兩個函式保證產生出來的隨機數是整數
          colorStr+=randomArr[Math.ceil(Math.random()*(15-0)+0)];
        }
        return colorStr;
    }
}
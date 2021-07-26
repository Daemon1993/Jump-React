

export const TYPE_Tab_Hidden= 'type_tab_hidden'
export const TYPE_Home0_Show= 'type_home0_show'
 
/**
 * BaseTab显示隐藏控制
 * @param {*} tab_hidden 
 * @returns 
 */
export const actionTabHidden = tab_hidden => {
    return {
        type: TYPE_Tab_Hidden,
        tab_hidden:tab_hidden
    }
}
/**
 * Home0显示隐藏
 * @param {*} home0_show 
 * @returns 
 */
export const actionHomeShow = home0_show => {
    return {
        type: TYPE_Home0_Show,
        home0_show:home0_show
    }
}

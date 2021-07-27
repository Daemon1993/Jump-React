

export const TYPE_Tab_Hidden= 'type_tab_hidden'
 
 
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

 

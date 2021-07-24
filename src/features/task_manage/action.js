


export const TYPE_Test = 'type_test'


/**
 * 
 * @param {testAction} text 
 * @returns 
 */
export const actionTest = text => {
    return {
        type: TYPE_Test,
        text
    }
}




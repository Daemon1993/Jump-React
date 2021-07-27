import React from "react";


import styles from './UnderLineTab.scss';
export default class UnderLineTab extends React.Component {
    //props select_id items[id,id]  clickItem
    render() {
        let { select_id, items } = this.props
        console.log("select_id " + select_id);
        return (
            <div className={styles.main}>
                {items.map(item => {
                    return (
                        <div key={item.id} className={styles.text_main}>
                            <div onClick={() => { this.showCmp(item.id) }}
                                className={styles.text_css}>{item.name}</div>
                            {this.props.select_id==item.id?<div className={styles.line} />:null}
                        </div>)
                })}
            </div>
        )
    }

    showCmp = (id) => {
        console.log("showCmp " + id)
        this.props.clickItem(id)
    }

}
import ServerNetWorkUtils from "@/data_model/ServerNetWorkUtils";

import React from "react";

import styles from './ContentShow.scss';

import hljs from "highlight.js";
import 'highlight.js/styles/atom-one-dark.css';
import './markdown10.scss';


var marked = require('marked');
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (__) {
            }
        }

        try {
            return hljs.highlightAuto(str).value;
        } catch (__) {
        }

        return ''; // use e
    }
});

export default class ContentShow extends React.Component {

    state = {
        data_titles: [],
        textareaValue: "",
    }
    componentDidMount() {
        ServerNetWorkUtils.initBmob();
        ServerNetWorkUtils.getAllTitlesArticles(this.props.type_id)
            .then(res => {
                this.setState({
                    data_titles: res
                })

                if(res.length>0){
                    this.clickTitle(res[0].objectId)
                }
            }).catch(error => {
                console.log(error)
            })
    }
    clickTitle = ( objectId) => {
        console.log(objectId)


        ServerNetWorkUtils.getArticleByArticleId(objectId)
            .then(res => {
                console.log(res)
                this.setState({
                    textareaValue: res.content
                })
            }).catch(error => {
                console.log(error)
            })

    }

    render() {
        let result = marked(this.state.textareaValue);
        return (


            <div className={styles.main}>
                <div className={styles.left_main}>
                    {this.state.data_titles.map(data => {
                        return (
                            <div onClick={(evt) => this.clickTitle(data.objectId)} className={styles.title_sy} key={data.objectId}>{data.title}</div>
                        )
                    })}
                </div>
                <div className={styles.right_main} dangerouslySetInnerHTML={{ __html: result }}>

                </div>
            </div>
        )
    }
}
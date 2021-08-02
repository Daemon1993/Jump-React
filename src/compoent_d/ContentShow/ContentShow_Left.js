import ServerNetWorkUtils from "@/data_model/ServerNetWorkUtils";

import React from "react";

import styles from './ContentShow_Left.scss';

import hljs from "highlight.js";
import 'highlight.js/styles/atom-one-dark.css';
import './markdown10.scss';

import { PreviewApi } from '@zzwing/react-image'
 

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

let image_show = false;
export default class ContentShow_Left extends React.Component {

    state = {
        data_titles: [],
        html_show: "",
        select_title_id: '',
        img_url: '',

    }
    componentWillUnmount() {
        document.body.removeEventListener('click', this.addClickImg)
    }
    componentDidMount() {
        ServerNetWorkUtils.initBmob();
        console.log("--this.props.type_id " + this.props.type_id)
        ServerNetWorkUtils.getAllTitlesArticles(this.props.type_id)
            .then(res => {
                this.setState({
                    data_titles: res
                })

                if (res.length > 0) {
                    this.clickTitle(res[0].objectId)
                }
            }).catch(error => {
                console.log(error)
            })

        document.body.addEventListener('click', this.addClickImg);

    }

    addClickImg = (e) => {

        // 判断是否点击的图片
        if (e.path[0].nodeName === 'IMG') {
            if (image_show) {
                return
            }
            let params = {};
            params.param = {};
            // 获取imglist
            var oPics = document.getElementsByTagName("img");
            params.param.imageArray = [];
            for (let i = 0; i < oPics.length; i++) {
                params.param.imageArray.push({ url: oPics[i].src });
            }
            for (let i = 0; i < oPics.length; i++) {
                // 判断点击图片的index
                if (e.path[0].src === params.param.imageArray[i].url) {
                    params.param.index = i;
                    break
                }
            }
            let img_url = params.param.imageArray[params.param.index].url
            console.log(img_url);
            this.setState({
                img_url: img_url,
            })

            image_show = true;
            PreviewApi.preview(img_url)
        } else {

            image_show = false;

        }

    }

    clickTitle = (objectId) => {
        console.log(objectId)
        this.setState({
            select_title_id: objectId
        })
        ServerNetWorkUtils.getArticleByArticleId(objectId)
            .then(res => {
                // console.log(res)
                let result = marked(res.content);
                this.setState({
                    html_show: result,
                    title: res.title,
                })
            }).catch(error => {
                console.log(error)
            })
    }
    isSelectTitle(objectId) {
        return this.state.select_title_id == objectId ? styles.title_select : "";
    }

    render() {


        return (

            <div className={styles.main}>
                <div className={styles.left_main}>
                    {this.state.data_titles.map(data => {

                        return (
                            <div onClick={() => this.clickTitle(data.objectId)}
                                className={styles.title_sy + " " + this.isSelectTitle(data.objectId)} key={data.objectId}>{data.title}</div>
                        )
                    })}
                </div>

                <div className={styles.v_line} />
                <div className={styles.right_main} >
                    <div className={styles.title}>{this.state.title}</div>
                    <div dangerouslySetInnerHTML={{ __html: this.state.html_show }} />
                </div>



            </div >
        )
    }
}


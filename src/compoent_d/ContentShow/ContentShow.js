import ServerNetWorkUtils from "@/data_model/ServerNetWorkUtils";

import React from "react";

import styles from './ContentShow.scss';

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
export default class ContentShow extends React.Component {

    state = {
 
        html_show: "",
        select_title_id: '',
        img_url: '',

    }
    componentWillUnmount() {
        document.body.removeEventListener('click', this.addClickImg)
    }
    componentDidMount() {
       
        console.log("ContentShow "+this.props.id)
        ServerNetWorkUtils.getArticleByArticleId(this.props.id)
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

    
     

    render() {
        return (

            
            <div className={styles.right_main} >
                <div className={styles.title}>{this.state.title}</div>
                <div dangerouslySetInnerHTML={{ __html: this.state.html_show }} />
            </div>

        )
    }
}


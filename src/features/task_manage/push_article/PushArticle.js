import React from "react";

import styles from './PushArticle.scss';

import './markdown10.scss';

import CryptoJS from "crypto-js";
import hljs from "highlight.js";
import 'highlight.js/styles/atom-one-dark.css';
import axios from "axios";
const headers = {
    'Content-Type': 'multipart/form-data;charset=UTF-8'
}

let ttt = '';


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

export default class PushArticle extends React.Component {

    constructor(props) {
        console.log("ManageHome")
        super(props)
        this.state = {
            textareaValue: ""
        }
    }
    componentDidMount(){
        console.log("PushArticle componentDidMount")
    }

    render() {
        var result = marked(this.state.textareaValue); // result is a String

        return (
            <div className={styles.content}>
                <textarea
                    ref={(ref) => { this.left_input = ref }}
                    onScroll={this.leftTRScorll}
                    onDrop={this.drop}
                    onDragOver={(event) => event.preventDefault()}
                    onPasteCapture={this.pasteFileAction}
                    className={styles.left_input} value={this.state.textareaValue} onChange={this.handleTextareaChange} />

                <div ref={(ref) => { this.right_show = ref }} className={styles.right_show} dangerouslySetInnerHTML={{ __html: result }} >
                </div>
            </div>
        )
    }


    /**
     * 拖拽图片上传
     * @param {*} e 
     */
    drop = (e) => {
        // 操作系统拖放文件到浏览器需要取消默认行为
        e.preventDefault();

        for (let file of e.dataTransfer.files) {

            if (file && file.type.match('image.*')) {
                this.postImage2Server(file)
                break;
            }
        }
    }

    /**
     * 粘贴图片/文件
     * @param {*} evt 
     */
    pasteFileAction = (e) => {
        var cbd = e.clipboardData;
        var ua = window.navigator.userAgent;


        if (!(e.clipboardData && e.clipboardData.items)) {
            console.log("无法获取粘贴内容")
            return;
        }

        // Mac平台下Chrome49版本以下 复制Finder中的文件的Bug Hack掉
        if (cbd.items && cbd.items.length === 2 && cbd.items[0].kind === "string" && cbd.items[1].kind === "file" &&
            cbd.types && cbd.types.length === 2 && cbd.types[0] === "text/plain" && cbd.types[1] === "Files" &&
            ua.match(/Macintosh/i) && Number(ua.match(/Chrome\/(\d{2})/i)[1]) < 49) {
            return;
        }

        for (var i = 0; i < cbd.items.length; i++) {
            var item = cbd.items[i];
            console.log(item)
            if (item.kind === "file") {
                var blob = item.getAsFile();
                if (blob.size === 0) {
                    return;
                }

                if (blob.name.indexOf("image") !== -1) {
                    console.log(blob);
                    this.postImage2Server(blob)
                }
                break;
            }
        }
    }

    /**
     * 上传文件
     * @param { }} file 
     */
    postImage2Server = (file) => {
        console.log("postImage2Server")
        let id = 8192;
        let ts = Date.parse(new Date()) / 1000;
        let key = id + '-' + ttt + '-' + ts

        key = CryptoJS.MD5(key).toString()


        let formdata = new FormData();
        formdata.append('file', file);

        formdata.append('id', id);
        formdata.append('ts', ts);
        formdata.append('categories', "jump-react");
        formdata.append('sign', key);

        axios({
            method: 'post',
            url: "https://api.superbed.cn/upload",
            headers: headers,
            data: formdata
        }).then(res => {
            let url = res.data.url
            console.log("上传成功 url " + url)

            let img = '![image](' + url + ')\n';

            this.insert2TextEditer(this.left_input, img);


            this.setState({
                textareaValue: this.left_input.value,
            });

        }).catch(error => {
            console.log(error)
        })
    }

    insert2TextEditer = (obj, img) => {
        console.log("insert2TextEditer " + img)

        if (document.selection) {
            var sel = document.selection.createRange();
            sel.text = img;
        } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
            var startPos = obj.selectionStart,
                endPos = obj.selectionEnd,
                cursorPos = startPos,
                tmpStr = obj.value;
            obj.value = tmpStr.substring(0, startPos) + img + tmpStr.substring(endPos, tmpStr.length);
            cursorPos += img.length;
            obj.selectionStart = obj.selectionEnd = cursorPos;
        } else {
            obj.value += img;
        }


    }

    handleTextareaChange = (evt) => {
        this.setState({
            textareaValue: evt.target.value
        })
    }

    leftTRScorll = (event) => {

        if (event.target.scrollHeight - event.target.clientHeight === event.target.scrollTop) {
            console.log('底部');
            this.right_show.scrollTop = this.right_show.scrollHeight - this.right_show.clientHeight;
            return;
        }
        let mdDivHeight = this.right_show.scrollHeight;
        let textAreaHeight = this.left_input.scrollHeight;
        let scaleSize = mdDivHeight / textAreaHeight;

        if (scaleSize > 1) {
            scaleSize = scaleSize * 0.9;
        }

        this.right_show.scrollTop = event.target.scrollTop * scaleSize;
    }
}
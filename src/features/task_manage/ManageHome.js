/***
 * 编辑器功能
 */

import React from "react";
import './manage.scss';
import './markdown10.scss';


import hljs from "highlight.js";
import 'highlight.js/styles/atom-one-dark.css';


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

export default class ManageHome extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            textareaValue: "",
        }
    }

    render() {


        var result = marked(this.state.textareaValue); // result is a String

        return (
            <div className="main">
                <div className="top">
                    <h1>Jump 编辑文章</h1>
                </div>
                <div className="content">
                    <textarea
                        ref={(ref) => { this.left_input = ref }}
                        onScroll={this.leftTRScorll}
                        className="left_input" value={this.state.textareaValue} onChange={this.handleTextareaChange} />

                    <div ref={(ref) => { this.right_show = ref }} className="right_show" dangerouslySetInnerHTML={{ __html: result }} >
                    </div>
                </div>
            </div>

        )
    }
    handleTextareaChange = (evt) => {
        this.setState({
            textareaValue: evt.target.value
        })
    }

    leftTRScorll = (event) => {



        if (event.target.scrollHeight - event.target.clientHeight == event.target.scrollTop) {
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
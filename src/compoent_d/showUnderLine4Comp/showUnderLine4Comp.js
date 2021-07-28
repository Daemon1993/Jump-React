import React from 'react';
import styles from './base.scss';

export default function showUnderLine4Comp(Comp) {
    return class extends React.Component {
        state = {
            show_line: false
        }
        render() {
            return (
                <div onMouseEnter={this.showLine} onMouseLeave={this.hiddenLine} className={styles.line_main}>
                    <Comp />
                    {this.state.show_line ? <div className={styles.line} /> : null}
                </div>
            )
        }
        showLine = () => {
            this.setState({
                show_line: true
            })
        }
        hiddenLine = () => {
            this.setState({
                show_line: false
            })
        }
    }
}
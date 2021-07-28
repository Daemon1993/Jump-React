import React from 'react';
import styles from './base.scss';

export default function showUnderLine4Comp(Comp) {
    return class extends React.Component {
        state = {
            show_line: false
        }
        render() {
            console.log(this.props.select_state)
            return (
                <div onMouseEnter={this.showLine} onMouseLeave={this.hiddenLine} className={styles.line_main}>
                    <Comp />
                    {this.getUnderLine()}
                </div>
            )
        }
        getUnderLine = () => {

            if (this.props.select_state) {
                return <div className={styles.line} />
            }
            return this.state.show_line ? <div className={styles.line} /> : null

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
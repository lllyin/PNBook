/**
 *  created by ling on 2017-12-25 10:01.
 */
import React from "react";

import {WingBlank, WhiteSpace, Icon, DatePicker} from "antd-mobile";


import "./overview.scss"

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

function formatDate(date) {
    /* eslint no-confusing-arrow: 0 */
    const pad = n => n < 10 ? `0${n}` : n;
    var timeObj = {
        year:date.getFullYear(),
        month:pad(date.getMonth()) - 0 + 1,
        day:pad(date.getDate()),
        H:pad(date.getHours()),
        M:pad(date.getMinutes()),
        dataStr:`${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
        timeStr:`${pad(date.getHours())}:${pad(date.getMinutes())}`
    };
    return timeObj;
}

// console.log("--",formatDate(now));

class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state={time:now};
    }

    render() {
        console.log("data",formatDate(this.state.time));
        return (
            <WingBlank>
                <section className="overview-panel">
                    <div className="month-box">
                        {formatDate(this.state.time).month}
                    </div>
                    <DatePicker
                        mode="month"
                        value={this.state.time}
                        onChange={time => this.setState({ time })}
                    >
                        <span className="btn month-pick-btn">
                            <Icon type="down"/>
                        </span>
                    </DatePicker>

                    <div className="money-box">
                        800
                    </div>
                </section>
            </WingBlank>
        )
    }
}


export default Overview;
/**
 *  created by ling on 2017-12-25 09:41.
 */
import React from "react";

import {List} from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

import {connect} from 'react-redux';

const CURR_DATE = new Date();
const CURRENT_DAY = CURR_DATE.getDate();
const CURRENT_MONTH = CURR_DATE.getMonth() + 1;

@connect(
    state => ({record: state})
)
class ListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    timeStampToDate(timeStamp) {
        let date = new Date(timeStamp);
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            week: date.getDay(),
            H: date.getHours(),
            M: date.getMinutes(),
            S: date.getMilliseconds()
        }
    }

    isCurrDay(date) {
        return date.day === CURRENT_DAY;
    };

    isCurrWeek(date) {

    }

    currentWeekRange() {
        let date = new Date();
        let range = []; //当前周范围
        let currDay = date.getDate();       //天
        let currWeek = date.getDay();       //当前星期几
        date.setMonth(date.getMonth() + 1, 0);
        let days = date.getDate();
        let range1 = currDay - currWeek + 1;
        let range2 = currDay + (7 - currWeek);
        range1 > 1 ? range[0] = range1 : range[0] = 1;
        range2 <= days ? range[1] = range2 : range[1] = days;
        console.log(range);
        return range;
    }

    isCurrMonth(date) {
        return date.month === CURRENT_MONTH;
    };

    render() {
        let data = this.props.record;
        console.log("记录列表数据", data);
        let dayCost = 0;
        let weekCost = 0;
        let monthCost = 0;
        var rangeWeek = this.currentWeekRange();
        data.forEach((val) => {
            let date = this.timeStampToDate(val.timestamp);
            console.log(date);
            if (this.isCurrDay(date)) {
                dayCost += parseFloat(val.amount);
            }
            if(date.day>=rangeWeek[0] && date.day<=rangeWeek[1]){
                weekCost += parseFloat(val.amount);
            }
            if (this.isCurrMonth(date)) {
                monthCost += parseFloat(val.amount);
            }
        });
        console.log('消费', dayCost, weekCost, monthCost)
        return (
            <div>
                {/* today */}
                <List renderHeader={() => '日消费'} className="my-list">
                    <Item
                        extra={dayCost} align="top"
                        arrow="horizontal"
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        multipleLine
                    >Title
                        <Brief>subtitle</Brief>
                    </Item>
                </List>
                {/* week */}
                <List renderHeader={() => '周消费'} className="my-list">
                    <Item
                        extra={weekCost}
                        align="top"
                        arrow="horizontal"
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        multipleLine
                    >Title
                        <Brief>subtitle</Brief>
                    </Item>
                </List>
                {/* month */}
                <List renderHeader={() => '月消费'} className="my-list">
                    <Item
                        extra={monthCost}
                        align="top"
                        arrow="horizontal"
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        multipleLine
                    >Title
                        <Brief>subtitle</Brief>
                    </Item>
                </List>
            </div>

        )
    }
}

export default ListView;
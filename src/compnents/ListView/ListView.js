/**
 *  created by ling on 2017-12-25 09:41.
 */
import React from "react";

import { List } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

import { connect } from 'react-redux';

const CURR_DATE = new Date();
const CURRENT_DAY = CURR_DATE.getDate();
const CURRENT_MONTH= CURR_DATE.getMonth()+1;

@connect(
    state=>({record:state})
)
class ListView extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    timeStampToDate(timeStamp){
        let date = new Date(timeStamp);
        return {
            year:date.getFullYear(),
            month:date.getMonth()+1,
            day:date.getDate(),
            week:date.getDay(),
            H:date.getHours(),
            M:date.getMinutes(),
            S:date.getMilliseconds()
        }
    }
    isCurrDay(date){
        return date.day === CURRENT_DAY;
    };
    isCurrWeek(date){

    }
    isCurrMonth(date){
        console.log()
        return date.month === CURRENT_MONTH;
    };

    render(){
        console.log("list",this.props);
        let data = this.props.record;
        let dayCost = 0;
        let weekCost=0;
        let monthCost=0;
        data.forEach((val,key)=>{
            let date = this.timeStampToDate(val.timeStamp);
            if(this.isCurrDay(date)){
                dayCost += parseFloat(val.amount);
            }
            if(this.isCurrMonth(date)){
                monthCost += parseFloat(val.amount);
            }
        });
        console.log('消费',dayCost,weekCost,monthCost)
        return(
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
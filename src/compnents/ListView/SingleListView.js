/**
 *  created by ling on 2017-12-25 09:41.
 */
import React from "react";
import {List} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;
let costCategory = require("../CategoryPicker/costCategory");
let mapTable = {};
costCategory.forEach((val, idx) => {
    mapTable[val.value] = val.label;
    val.children.forEach((val2,key2)=>{
        mapTable[val2.value] = val2.label;
    })
});


class SingleListView extends React.Component {
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

    render() {
        let records = this.props.records;
        let title = this.props.title;
        return (
            <div>
                {/* detail */}
                <List renderHeader={() => title} className="my-list">
                    {
                        records.map((record,key)=>{
                            let date = this.timeStampToDate(record.timestamp);
                             return (
                                 <Item
                                     extra={`￥${record.amount}`} align="top"
                                     arrow="horizontal"
                                     thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                                     key={key}
                                     multipleLine
                                 >
                                     {mapTable[record.catId]}
                                     <Brief><small>{`${date.month}-${date.day} ${date.H}:${date.M}`}</small> 没有备注</Brief>
                                 </Item>
                             )
                        })
                    }
                </List>
            </div>

        )
    }
}

export default SingleListView;
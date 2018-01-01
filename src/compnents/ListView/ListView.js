/**
 *  created by ling on 2017-12-25 09:41.
 */
import React from "react";

import {List} from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

import {connect} from 'react-redux';



class ListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let dayCost = this.props.dayCost;
        let weekCost = this.props.weekCost;
        let monthCost = this.props.monthCost;
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
/**
 *  created by ling on 2017-12-25 09:41.
 */
import React from "react";

import { List } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

class ListView extends React.Component{

    render(){
        return(
            <div>
                {/* today */}
                <List renderHeader={() => 'today'} className="my-list">
                    <Item
                        extra="30" align="top"
                        arrow="horizontal"
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        multipleLine
                    >Title
                        <Brief>subtitle</Brief>
                    </Item>
                </List>
                {/* week */}
                <List renderHeader={() => 'week'} className="my-list">
                    <Item
                        extra="210" align="top"
                        arrow="horizontal"
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        multipleLine
                    >Title
                        <Brief>subtitle</Brief>
                    </Item>
                </List>
                {/* month */}
                <List renderHeader={() => 'month'} className="my-list">
                    <Item
                        extra="700" align="top"
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
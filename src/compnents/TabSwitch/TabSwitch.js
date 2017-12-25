/**
 *  created by ling on 2017-12-25 15:21.
 */
import React from "react";
import { Tabs, WhiteSpace } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import H5NumberInputWrap from "../Input/NumberInput";

function renderTabBar(props) {
    return (<Sticky>
        {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
}

const tabs = [
    { title: 'coast' },
    { title: 'income' }
];

class TabSwitch extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <WhiteSpace />
                <StickyContainer>
                    <Tabs tabs={tabs}
                          initalPage={'t2'}
                          renderTabBar={renderTabBar}
                    >
                        <div style={{ height: '250px', backgroundColor: '#fff' }}>
                           <H5NumberInputWrap/>
                        </div>
                        <div style={{ height: '250px', backgroundColor: '#fff' }}>
                            <H5NumberInputWrap/>
                        </div>
                    </Tabs>
                </StickyContainer>
                <WhiteSpace />
            </div>
        )
    }
}

export default TabSwitch;
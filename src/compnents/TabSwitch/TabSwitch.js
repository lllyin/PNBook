/**
 *  created by ling on 2017-12-25 15:21.
 */
import React from "react";
import {Tabs, WhiteSpace} from 'antd-mobile';
import {StickyContainer, Sticky} from 'react-sticky';
import H5NumberInputWrap from "../Input/NumberInput";
import CategoryPicker from "../CategoryPicker/CategoryPicker";

function renderTabBar(props) {
    return (<Sticky>
        {({style}) => <div style={{...style, zIndex: 1}}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
}

const tabs = [
    {title: '支出',account:'COST'},
    {title: '收入',account:'INCOME'}
];

class TabSwitch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            catId: '',   //分类id
            account: 'COST'  //账目名称、收入还是支出
        };
        this.catIdChange = this.catIdChange.bind(this);
        this.accountChange = this.accountChange.bind(this);
    }

    //cat ID改变了
    catIdChange(catId) {
        console.log('catID',catId);
        this.setState({catId:catId})
    }

    //账目改变了
    accountChange(account) {
        console.log('account',account);
        this.setState({account:account})
    }

    render() {
        return (
            <div>
                <WhiteSpace/>
                <StickyContainer>
                    <Tabs tabs={tabs}
                          initalPage={'t2'}
                          renderTabBar={renderTabBar}
                          onChange={(tab, index) => { this.accountChange(tab.account)}}
                    >
                        <div style={{height: 'auto', backgroundColor: '#fff'}}>
                            <CategoryPicker catIdChange={this.catIdChange} />
                            <H5NumberInputWrap catId={this.state.catId} account={this.state.account} />
                        </div>
                        <div style={{height: 'auto', backgroundColor: '#fff'}}>
                            <CategoryPicker catIdChange={this.catIdChange} />
                            <H5NumberInputWrap catId={this.state.catId} account={this.state.account} />
                        </div>
                    </Tabs>
                </StickyContainer>
                <WhiteSpace/>
            </div>
        )
    }
}

export default TabSwitch;
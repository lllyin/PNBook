/**
 *  created by ling on 2017-12-25 11:37.
 */

import React from "react";
import { List, InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'react-redux';
import {addCost} from "../../redux/account.redux";

class NumberInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            type:"money",
            money:0
        }
        this.saveRecord = this.saveRecord.bind(this);
    }

    handleChange(number){
        this.setState({money:number});
    }

    saveRecord(){
        this.props.addCost(this.state.money);
        console.log("数据保存了");
    }

    render(){
        const { getFieldProps } = this.props.form;
        const { type } = this.state;
        return(
            <div>
                <List>
                    <InputItem
                        {...getFieldProps('money2', {
                            normalize: (v, prev) => {
                                if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                                    if (v === '.') {
                                        return '0.';
                                    }
                                    return prev;
                                }
                                return v;
                            },
                        })}
                        type={type}
                        placeholder="请输入金额"
                        ref={el => this.customFocusInst = el}
                        value={this.state.money}
                        onChange={(v) => {this.handleChange(v)}}
                        onBlur={this.saveRecord}
                        clear
                    >数字键盘</InputItem>
                </List>
            </div>
        )
    }
}

const mapStateToProps = state => {
    // console.log("store state",state);
    return {...state};
};


let H5NumberInputWrap = createForm()(NumberInput);
H5NumberInputWrap = connect(mapStateToProps,{addCost:addCost})(H5NumberInputWrap);
export default H5NumberInputWrap;
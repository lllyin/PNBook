/**
 *  created by ling on 2017-12-25 11:37.
 */

import React from "react";
import { List, InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'react-redux';
import {addCost,addIncome,addCostRecord} from "../../redux/record.redux";


@connect(
    state=>({...state}),
    {addIncome,addCostRecord,addCost}
)
class NumberInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            type:"money",
            money:''
        };
        this.saveRecord = this.saveRecord.bind(this);
    }

    handleChange(number){
        this.setState({money:number});
    }

    saveRecord(){
        let catId = this.props.catId;
        let account = this.props.account;
        if(account === 'COST'){
            this.props.addCostRecord(this.state.money,catId);
        } else if(account === 'INCOME'){
            this.props.addIncome(this.state.money,catId);
        }
    }

    componentDidMount(){
        var confirmBtn = document.querySelector(".keyboard-confirm");   //确定按钮
        console.log("confirmBtn",confirmBtn);
        var _this= this;
        if(!confirmBtn){
            location.reload();
        }
        confirmBtn.addEventListener("click",function (e) {
            e.stopPropagation();
            if(_this.state.money){
                console.log("i am click:",_this.props.catId,_this.props.account,_this.state.money);
                _this.saveRecord();
            }
        })
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
                        type='money'
                        placeholder="请输入金额"
                        ref={el => this.customFocusInst = el}
                        value={this.state.money}
                        onChange={(v) => {this.handleChange(v)}}
                        clear
                    >数字键盘</InputItem>
                </List>
            </div>
        )
    }
}

const H5NumberInputWrap = createForm()(NumberInput);
export default H5NumberInputWrap;
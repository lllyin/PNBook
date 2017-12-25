/**
 *  created by ling on 2017-12-25 11:37.
 */

import React from "react";
import { List, InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';

class NumberInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            type:"money",
            money:0
        }
    }

    handleChange(number){
        this.setState({money:number});
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
                        placeholder="money format"
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
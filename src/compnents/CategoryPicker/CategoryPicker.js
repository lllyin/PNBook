/**
 *  created by ling on 2017-12-25 15:58.
 */
let total = 1;
import React from "react";
import { Menu, ActivityIndicator, NavBar } from 'antd-mobile';

const data = require("./costCategory");
//去除第一类目，第一项的value
const one = data[0].value;
const one_one = data[0].children[0].value;

class CategoryPicker extends React.Component {
    constructor(...args) {
        super(...args);
        // console.log('-',...args);
        this.state = {
            initData: '',
            show: false,
            selectedOptions:[one,one_one], //手动选择数据
            selectedOptionsName:[]
        };
        this.handleClick = this.handleClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onMaskClick = this.onMaskClick.bind(this);
    }
    onChange(value){
        // console.log('onChange:',value);
        let label = '';
        let selectedOptions = [];       //选中数据集合
        let selectedOptionsName = [];       //选中数据显示名
        data.forEach((dataItem) => {
            if (dataItem.value === value[0]) {
                label = dataItem.label;
                selectedOptions[0] = dataItem.value;     //一级菜单ID
                selectedOptionsName[0] = dataItem.label;     //一级菜单显示名
                if (dataItem.children && value[1]) {
                    dataItem.children.forEach((cItem) => {
                        if (cItem.value === value[1]) {
                            label += ` ${cItem.label}`;
                            selectedOptions[1] = cItem.value; //二级菜单ID
                            selectedOptionsName[1] = cItem.label; //二级菜单显示名
                        }
                    });
                }
            }
        });
        this.setState({selectedOptions:selectedOptions,selectedOptionsName:selectedOptionsName});
        this.props.catIdChange(this.state.selectedOptions[1]);//把选中catID穿过去
        // console.log("选择的是",selectedOptions);
    }
    handleClick(e){
        e.preventDefault(); // Fix event propagation on Android
        this.setState({
            show: !this.state.show,
        });
        // mock for async data loading
        if (!this.state.initData) {
            setTimeout(() => {
                this.setState({
                    initData: data,
                });
            }, 0);
        }
    }

    onMaskClick(){
        this.setState({
            show: false,
        });
    }
    shouldComponentUpdate(nextProps,nextState){
        if(this.state === nextState){
            console.log("我不要更新");
            return false;
        }else{
            return true;
        }
    }
    componentDidMount(){
        this.onChange(this.state.selectedOptions)
    }

    render() {
        const { initData, show } = this.state;
        const menuEl = (
            <Menu
                className="foo-menu"
                data={initData}
                value={this.state.selectedOptions}
                onChange={this.onChange}
                height={document.documentElement.clientHeight * 0.6}
            />
        );
        const loadingEl = (
            <div style={{ width: '100%', height: document.documentElement.clientHeight * 0.6, display: 'flex', justifyContent: 'center' }}>
                <ActivityIndicator size="large" />
            </div>
        );
        return (
            <div className={show ? 'menu-active' : ''}>
                <div>
                    <NavBar
                        leftContent={this.state.selectedOptionsName[0]?this.state.selectedOptionsName[0]:'待选择'}
                        mode="light"
                        icon={<img src="https://gw.alipayobjects.com/zos/rmsportal/iXVHARNNlmdCGnwWxQPH.svg" className="am-icon am-icon-md" alt="" />}
                        onLeftClick={this.handleClick}
                        className="top-nav-bar"
                    >
                        {this.state.selectedOptionsName[1]?this.state.selectedOptionsName[1]:'待选择'}
                    </NavBar>
                </div>
                {show ? initData ? menuEl : loadingEl : null}
                {show ? <div className="menu-mask" onClick={this.onMaskClick} /> : null}
            </div>
        );
    }
}

export default CategoryPicker;

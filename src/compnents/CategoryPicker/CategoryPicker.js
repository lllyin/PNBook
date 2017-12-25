/**
 *  created by ling on 2017-12-25 15:58.
 */
import React from "react";
import { Menu, ActivityIndicator, NavBar } from 'antd-mobile';

const data = require("./costCategory");

class CategoryPicker extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            initData: '',
            show: false,
            selectedOptions:{}, //手动选择数据
            defaultSelectedOpt:["1","2"]    //默认选择数据
        };
        this.handleClick = this.handleClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onMaskClick = this.onMaskClick.bind(this);
    }
    onChange(value){
        let label = '';
        let selectedOptions = {};       //选中数据集合
        data.forEach((dataItem) => {
            if (dataItem.value === value[0]) {
                label = dataItem.label;
                selectedOptions.id = dataItem.value;     //一级菜单ID
                selectedOptions.label = dataItem.label;   //一级菜单显示名称
                if (dataItem.children && value[1]) {
                    dataItem.children.forEach((cItem) => {
                        if (cItem.value === value[1]) {
                            label += ` ${cItem.label}`;
                            selectedOptions.children = {};
                            selectedOptions.children.id = cItem.value; //二级菜单ID
                            selectedOptions.children.label = cItem.label;  //二级菜单显示名称
                        }
                    });
                }
            }
        });
        this.setState({selectedOptions:selectedOptions});
        console.log("选择的是",selectedOptions);
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

    componentDidMount(){
        this.onChange(this.state.defaultSelectedOpt)
    }

    render() {
        console.log(this.state)
        const { initData, show } = this.state;
        const menuEl = (
            <Menu
                className="foo-menu"
                data={initData}
                value={this.state.defaultSelectedOpt}
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
                        leftContent={this.state.selectedOptions.label?this.state.selectedOptions.label:"代选择"}

                        mode="light"
                        icon={<img src="https://gw.alipayobjects.com/zos/rmsportal/iXVHARNNlmdCGnwWxQPH.svg" className="am-icon am-icon-md" alt="" />}
                        onLeftClick={this.handleClick}
                        className="top-nav-bar"
                    >
                        {this.state.selectedOptions.children?this.state.selectedOptions.children.label:"带选择"}
                    </NavBar>
                </div>
                {show ? initData ? menuEl : loadingEl : null}
                {show ? <div className="menu-mask" onClick={this.onMaskClick} /> : null}
            </div>
        );
    }
}

export default CategoryPicker;

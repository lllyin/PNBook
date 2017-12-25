/**
 *  created by ling on 2017-12-25 09:00.
 */

import React from "react";
import ReactDOM from "react-dom";


import AppBar from "./compnents/Common/AppBar";
import Overview from "./compnents/Overview/Overview";
import ListView from "./compnents/ListView/ListView"

import "normalize.css";
import "./style/common.scss";

class App extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        return (
            <div>
                <AppBar/>
                <Overview/>
                <ListView/>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
);
/**
 *  created by ling on 2017-12-25 09:00.
 */

import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from "react-router-dom";

import AppBar from "./compnents/Common/AppBar";
import Overview from "./compnents/Overview/Overview";
import ListView from "./compnents/ListView/ListView";
import TabSwitch from "./compnents/TabSwitch/TabSwitch"

import "normalize.css";
import "./style/common.scss";

class HomePage extends React.Component{
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

const AddPage = () => {
    return(
        <div>
            add page
            <TabSwitch/>
        </div>
    )
};

const NotFound = () => (
    <div>
        <h1>not found</h1>
        <Link to="/">to home</Link>
    </div>
);

ReactDOM.render(
    <Router>
        <div>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/add" component={AddPage} />
                <Route path="/" component={NotFound} />
            </Switch>
        </div>
    </Router>,
    document.getElementById("root")
);
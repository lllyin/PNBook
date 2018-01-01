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
import {createStore} from 'redux';
import {Provider,connect} from 'react-redux';
import thunk from "redux-thunk";
import {createLogger} from "redux-logger";
import {applyMiddleware} from "redux";
import {balanceFinance,getAllRecord} from "./redux/record.redux.js";
import axios from "axios";
import AppBar from "./compnents/Common/AppBar";
import Overview from "./compnents/Overview/Overview";
import ListView from "./compnents/ListView/ListView";
import TabSwitch from "./compnents/TabSwitch/TabSwitch";
import AddButton from "./compnents/Buttons/AddButton";

import "normalize.css";
import "./style/common.scss";


@connect(
    state=>({...state}),
    {getAllRecord}
)
class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    jumpToAddPage() {
        this.props.history.push("./add");
    }

    componentDidMount(){
        this.props.getAllRecord();
        // let initalRecord = [
        //     {type: "COST", amount: "3", catId: "c0101", timestamp: 1514471421000},
        //     {type: "COST", amount: "3", catId: "c0101", timestamp: 1514471424000},
        //     {type: "COST", amount: "366", catId: "c0101", timestamp: 1514471429000},
        //     {type: "INCOME", amount: "25", catId: "c0101", timestamp: 1514471435000}
        // ];
        // axios.post("/api/server/record",{type:"ADD",data:initalRecord})
        //     .then(function (response) {
        //         console.log("添加相应：",response);
        //     })
    }

    render() {
        // console.log(this.props);
        return (
            <div>
                <AppBar/>
                <Overview/>
                <ListView/>
                <AddButton  onClick={this.jumpToAddPage.bind(this)}/>
            </div>
        )
    }
}

const AddPage = () => {
    return (
        <div>
            <AppBar
                title={"记一笔"}
                rightContent={[]}
            />
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

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}
let store = createStore(
    balanceFinance,
    applyMiddleware(...middleware)
);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact component={HomePage}/>
                    <Route path="/add" component={AddPage}/>
                    <Route path="/" component={NotFound}/>
                </Switch>
            </div>
        </Router>
    </Provider>,
    document.getElementById("root")
);


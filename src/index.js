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
import {createStore,combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';
import thunk from "redux-thunk";
import {createLogger} from "redux-logger";
import {applyMiddleware} from "redux";
import {
    balanceFinance,
    analysisRecords,
    getAllRecord,
    analyzeDayRecords,
    analyzeWeekRecords,
    analyzeMonthRecords
} from "./redux/record.redux.js";
import axios from "axios";
import AppBar from "./compnents/Common/AppBar";
import Overview from "./compnents/Overview/Overview";
import ListView from "./compnents/ListView/ListView";
import TabSwitch from "./compnents/TabSwitch/TabSwitch";
import AddButton from "./compnents/Buttons/AddButton";
import ListDetailPage from "./routes/ListDetailPage";

import "normalize.css";
import "./style/common.scss";

const CURR_DATE = new Date();
const CURRENT_DAY = CURR_DATE.getDate();
const CURRENT_MONTH = CURR_DATE.getMonth() + 1;

//主页面
@connect(
    state => ({records: state.allRecords}),
    {getAllRecord,analyzeDayRecords, analyzeWeekRecords, analyzeMonthRecords}
)
class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    jumpToAddPage() {
        this.props.history.push("/add");
    }

    componentDidMount() {
        this.props.getAllRecord();
    }

    timeStampToDate(timeStamp) {
        let date = new Date(timeStamp);
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            week: date.getDay(),
            H: date.getHours(),
            M: date.getMinutes(),
            S: date.getMilliseconds()
        }
    }

    isCurrDay(date) {
        return date.day === CURRENT_DAY;
    };

    isCurrWeek(date) {
    }

    currentWeekRange() {
        let date = new Date();
        let range = []; //当前周范围
        let currDay = date.getDate();       //天
        let currWeek = date.getDay();       //当前星期几
        date.setMonth(date.getMonth() + 1, 0);
        let days = date.getDate();
        let range1 = currDay - currWeek + 1;
        let range2 = currDay + (7 - currWeek);
        range1 > 1 ? range[0] = range1 : range[0] = 1;
        range2 <= days ? range[1] = range2 : range[1] = days;
        console.log(range);
        return range;
    }

    isCurrMonth(date) {
        return date.month === CURRENT_MONTH;
    };


    render() {
        // console.log("-----",this.props);
        let data = this.props.records;
        let dayRecords = [];    //日记录
        let weekRecords = [];    //周记录
        let monthRecords = [];    //月记录
        let dayCost = 0;
        let weekCost = 0;
        let monthCost = 0;
        var rangeWeek = this.currentWeekRange();
        data.forEach((val) => {
            let date = this.timeStampToDate(val.timestamp);
            // console.log(parseFloat(val.amount));
            if (this.isCurrDay(date)) {
                dayCost += parseFloat(val.amount);
                dayRecords.push(val);
            }
            if (date.day >= rangeWeek[0] && date.day <= rangeWeek[1]) {
                weekCost += parseFloat(val.amount);
                weekRecords.push(val);
            }
            if (this.isCurrMonth(date)) {
                monthCost += parseFloat(val.amount);
                monthRecords.push(val);
            }
        });
        this.props.analyzeDayRecords({payload:dayRecords});
        this.props.analyzeWeekRecords({payload:weekRecords});
        this.props.analyzeMonthRecords({payload:monthRecords});
        return (
            <div>
                <AppBar/>
                <Overview monthCost={monthCost}/>
                <ListView dayCost={dayCost} weekCost={weekCost} monthCost={monthCost}/>
                <AddButton onClick={this.jumpToAddPage.bind(this)}/>
            </div>
        )
    }
}

//添加记录页面
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

//404页面
const NotFound = () => (
    <div>
        <h1>not found</h1>
        <Link to="/">返回首页</Link>
    </div>
);



const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}
let reducers = combineReducers({allRecords:balanceFinance, countRecords:analysisRecords})
let store = createStore(
    reducers,
    applyMiddleware(...middleware)
);

ReactDOM.render(
    <Provider store={store}>
        {/* <Router basename="/pnbook"> 上传到服务器可添加basename,作为路由的前缀 */}
        <Router basename="/pnbook">
            <div>
                <Switch>
                    <Route path="/" exact component={HomePage}/>
                    <Route path="/add" component={AddPage}/>
                    {/*<Route path={"/detail"} component={ListDetailPage}/>*/}
                    <Route location={location}
                           key={location.key}
                           path={"/detail/:id"}
                           component={ListDetailPage}
                    />
                    <Route path="/" component={NotFound}/>
                </Switch>
            </div>
        </Router>
    </Provider>,
    document.getElementById("root")
);


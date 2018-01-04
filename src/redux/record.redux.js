/*
* 跟记账有关的redux
* 1.支出
* 2.收入
* */

import {COST, INCOME, RECORDS_LIST, DAY_RECORDS, WEEK_RECORDS, MONTH_RECORDS} from "../config/constants";
import {serverAddr} from "../config/config";
import axios from "axios";

//action
export const addRecord = (record) => {
    return record;
};
export const addCost = (money, catId) => {    //支出
    return {
        type: COST,
        amount: money,
        catId,
        timestamp: Date.parse(new Date())
    };
};

export const addIncome = (money, catId) => { //收入
    return {
        type: INCOME,
        amount: money,
        catId,
        timeStamp: Date.parse(new Date())
    }
};
export const recordList = (payload) => {
    return {type: RECORDS_LIST, payload}
};

export const getAllRecord = () => {
    return dispatch => {
        // 异步
        axios.get(serverAddr + "/record")
            .then(function (response) {
                dispatch(recordList(response.data));
            })
    }
};

export const addCostRecord = (money, catId) => {
    return dispatch => {
        let record = {
            type: COST,
            amount: money,
            catId,
            timestamp: Date.parse(new Date())
        };
        // 异步
        axios.post(serverAddr + "/record", {type: "ADD", data: [record]})
            .then(function (response) {
                if (response.status === 200 && response.data.status === 1) {
                    dispatch(addRecord(record));
                }
            })
    }
};

export const analyzeDayRecords = ({payload}) => {
    return {type: DAY_RECORDS, payload}
};
export const analyzeWeekRecords = ({payload}) => {
    return {type: WEEK_RECORDS, payload}
};
export const analyzeMonthRecords = ({payload}) => {
    return {type: MONTH_RECORDS, payload}
};

//reducers
// let initialState = {
//     costRecord: [],
//     incomeRecord: []
// };

let initalRecord = [];
export let balanceFinance = (state = initalRecord, action) => {
    switch (action.type) {
        case COST:
            return [
                ...state,
                action
            ];
        case INCOME:
            return [
                ...state,
                action
            ];
        case RECORDS_LIST:
            return [
                ...action.payload
            ];
        default:
            return state;
    }
};

//将所有数据整理成日，周，月数据
let initRecords = {
    dayRecords: [],
    weekRecords: [],
    monthRecords: []
};
export const analysisRecords = (state = initalRecord, action) => {
    switch (action.type) {
        case DAY_RECORDS:
            return {
                ...state,
                dayRecords: [ ...action.payload]
            };
        case WEEK_RECORDS:
            return {
                ...state,
                weekRecords: [ ...action.payload]
            };
        case MONTH_RECORDS:
            return {
                ...state,
                monthRecords: [ ...action.payload]
            };
        default:
            return state;
    }
};

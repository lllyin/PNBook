/*
* 跟记账有关的redux
* 1.支出
* 2.收入
* */

import {COST, INCOME, RECORDS_LIST} from "../config/constants";
import {serverAddr} from "../config/config";
import axios from "axios";

//action
export const addCost = (record) => {    //支出
    return record;
};

export const addIncome = (money, catId) => { //收入
    return {
        type: INCOME,
        amount: money,
        catId,
        timeStamp: Date.parse(new Date())
    }
};
export const userList = (payload) => {
    return {type: RECORDS_LIST, payload}
};

export const getAllRecord = () => {
    return dispatch => {
        // 异步
        axios.get(serverAddr + "/record")
            .then(function (response) {
                dispatch(userList(response.data));
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
        axios.post(serverAddr + "/record",{type:"ADD",data:[record]})
            .then(function (response) {
                if(response.status === 200 && response.data.status === 1){
                    console.log(response)
                    dispatch(addCost(record));
                }
            })
    }
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
                ...state,
                ...action.payload
            ];
        default:
            return state;
    }
};
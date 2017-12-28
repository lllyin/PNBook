/*
* 跟记账有关的redux
* 1.支出
* 2.收入
* */

import {COST, INCOME} from "../config/constants";

//action
export const addCost = (money, catId) => {    //支出
    return {
        type: COST,
        amount: money,
        catId,
        timeStamp: Date.parse(new Date())
    }
};

export const addIncome = (money, catId) => { //收入
    return {
        type: INCOME,
        amount: money,
        catId,
        timeStamp: Date.parse(new Date())
    }
};


//reducers
// let initialState = {
//     costRecord: [],
//     incomeRecord: []
// };

let initalRecord = [
    {type: "COST", amount: "3", catId: "c0101", timeStamp: 1514471421000},
    {type: "COST", amount: "3", catId: "c0101", timeStamp: 1514471424000},
    {type: "COST", amount: "366", catId: "c0101", timeStamp: 1514471429000},
    {type: "INCOME", amount: "25", catId: "c0101", timeStamp: 1514471435000}
    ];

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
        default:
            return state;
    }
};
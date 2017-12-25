/*
* 跟记账有关的redux
* 1.支出
* 2.收入
* */

import {COST, INCOME} from "../config/constants";

//action
export const addCost = (money) => {    //支出
    return {
        type: COST,
        amount: money,
        timeStamp: Date.parse(new Date())
    }
};

export const addIncome = (money) => { //收入
    return {
        type: COST,
        amount: money,
        timeStamp: Date.parse(new Date())
    }
};


//reducers
// let initialState = {
//     costRecord: [],
//     incomeRecord: []
// };

export let  balanceFinance = (state = [], action) => {
    switch (action.type){
        case COST:
            return[
                ...state,
                action
            ];
        case INCOME:
            return[
                ...state,
                action
            ];
        default:
            return state;
    }
};
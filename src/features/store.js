import { combineReducers } from "redux";
import manage_reducer from "./task_manage/manage_reducer";


import login_reducer from './task_manage/login/login_reducer'


import { createStore } from 'redux';
 

// 安装redux-devtools-extension的可视化工具。
import { composeWithDevTools } from 'redux-devtools-extension'
import base_reducer from "./base_reducer";



const store=combineReducers({
    manage_reducer,login_reducer,base_reducer
})
 
const store1 = createStore(store,composeWithDevTools())

 

export default store1
 
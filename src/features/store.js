import { combineReducers } from "redux";
import manage_reducer from "./task_manage/manage_reducer";


import login_reducer from './task_manage/login/login_reducer'


import { createStore } from 'redux';
 

// 安装redux-devtools-extension的可视化工具。
import { composeWithDevTools } from 'redux-devtools-extension'
import base_reducer from "./base_reducer";
//  存储机制，可换localStorage等，当前使用sessionStorage
import {persistStore, persistReducer} from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'
const storageConfig = {
    key: 'root', 
    storage:storageSession, // 缓存机制
//blacklist: ['name','age'] // reducer 里不持久化的数据,除此外均为持久化数据
}


const reducers=combineReducers({
    manage_reducer,login_reducer,base_reducer
})

const myPersistReducer = persistReducer(storageConfig, reducers); //persist包装reducer

 
const store = createStore(myPersistReducer,composeWithDevTools())

export const persistor = persistStore(store)
 

export default store
 
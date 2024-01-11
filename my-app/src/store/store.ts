import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { dataServiceListReducer } from "./dataServiceList/slice";
import { dataServiceReducer } from "./dataService/slice";
import { enqDeqReqListReducer} from "./encryptDecryptRequestList/slice"
import { userReducer } from './user/slice';

export const rootReducer = combineReducers({
    dataList: dataServiceListReducer, 
    data: dataServiceReducer,
    enqDeqReqList: enqDeqReqListReducer,
    user: userReducer,
})

export const store = configureStore({
    reducer: rootReducer
});

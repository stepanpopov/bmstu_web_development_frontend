import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { dataServiceReducer } from "./dataServiceList/slice";

export const store = configureStore({
    reducer: combineReducers({
        dataServiceReducer,
    }),
});

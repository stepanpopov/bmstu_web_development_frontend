import { configureStore, combineReducers, Middleware, UnknownAction } from '@reduxjs/toolkit';
import { dataServiceListReducer } from "./dataServiceList/slice";
import { dataServiceReducer } from "./dataService/slice";
import { enqDeqReqListReducer } from "./encryptDecryptRequestList/slice"
import { userReducer } from './user/slice';
import { RootState } from './types';


export const rootReducer = combineReducers({
    dataList: dataServiceListReducer,
    data: dataServiceReducer,
    enqDeqReqList: enqDeqReqListReducer,
    user: userReducer,
})

export const logMiddleware: Middleware<
    (action: UnknownAction) => {},
    RootState
> = storeApi => next => action => {
    console.log('Dispatching action:', action);
    const result = next(action);
    console.log('New state:', storeApi.getState());
    return result;
}


/*export const axiousErrMiddleware: Middleware<
    (action: UnknownAction) => {},
    RootState
> = () => next => action => {
    console.log('exampleMiddleware')
    try {
        next(action)
    } catch (err) {
        console.log('exampleMiddleware err', err)
        if (isAxiosError(err)) {
            err.message = err.response?.data
        }
        throw err
    }
}*/

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => (
        getDefaultMiddleware().prepend(logMiddleware)
    )
});

import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchDataListByName, fetchAddToDraft } from '../../api/dataService'
import { RootState } from '../types';
import { axiousErrResp } from '../utils';
import { FilterResponse } from '../../api/dataService/filterDataServices';
export { type FilterResponse } from '../../api/dataService/filterDataServices';

export const filterDataListByName = createAsyncThunk<FilterResponse, string, { state: RootState }>(
    'dataServices/filterDataListByName',
    async (name) => {
        const dataList = await fetchDataListByName(name)
        return dataList
    }
)

export const addToDraft = createAsyncThunk<number, number, { state: RootState, rejectValue: string }>(
    'dataServices/addToDraft',
    async (id, { rejectWithValue }) => {
        try {
            const draftID = await fetchAddToDraft(id)
            return draftID
        } catch (err) {
            throw rejectWithValue(axiousErrResp(err))
        }
    }
)

// TODO: 
// убрать из стора dataService
// можно вызывать диспатч в thunk ах
// 

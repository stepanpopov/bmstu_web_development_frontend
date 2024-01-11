import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchDataListByName, fetchAddToDraft } from '../../api/dataService'
import DataService from '../../models/dataService';
import { RootState } from '../types';

export const filterDataListByName = createAsyncThunk<DataService[], string, { state: RootState } >(
    'dataServices/filterDataListByName', 
    async (name) => {
        const dataList = await fetchDataListByName(name)
        return dataList
    }
)

export const addToDraft = createAsyncThunk<number, number, { state: RootState } >(
    'dataServices/addToDraft', 
    async (id) => {
        const draftID = await fetchAddToDraft(id)
        return draftID
    }
)

// TODO: 
// убрать из стора dataService
// можно вызывать диспатч в thunk ах
// 

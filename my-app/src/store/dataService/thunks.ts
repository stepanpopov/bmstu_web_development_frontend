import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchDsByID, fetchDataListByName } from '../../api/dataService'
import DataService from '../../models/dataService';

export const filterDataListByName = createAsyncThunk<DataService[], string>(
    'dataService/findByStatus', 
    async (name) => {
        const dataList = await fetchDataListByName(name)
        return dataList
    }
)

export const getDsByID = createAsyncThunk<DataService, number>(
    'dataService/findByStatus', 
    async (id) => {
        const data = await fetchDsByID(id)
        return data
    }
)

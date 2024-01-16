import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDsByID } from '../../api/dataService'
import DataService from '../../models/dataService';
import { dataServiceActions } from './slice'

export const getDsByID = createAsyncThunk<DataService, number>(
    'dataService/getDSByID', 
    async (id, {dispatch}) => {
        dispatch(dataServiceActions.setLoading())
        console.log('started fetching data')
        const data = await fetchDsByID(id)
        console.log('data fetched')
        return data
    }
)

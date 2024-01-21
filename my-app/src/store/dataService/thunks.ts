import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDsByID } from '../../api/dataService'
import DataService from '../../models/dataService';
import { dataServiceActions } from './slice'

export const getDsByID = createAsyncThunk<DataService, number>(
    'dataService/getDSByID',
    async (id, { dispatch }) => {
        dispatch(dataServiceActions.setLoading())

        const data = await fetchDsByID(id)

        return data
    }
)

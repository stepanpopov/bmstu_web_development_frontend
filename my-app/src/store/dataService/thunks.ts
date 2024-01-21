import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCreateDs, fetchDsByID, fetchUpdateDs, fetchPutPicDS } from '../../api/dataService'
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

interface CreateDataService {
    name: string,
    encode: boolean,
    blob: string,
}

export const createDS = createAsyncThunk<number, CreateDataService>(
    'dataService/createDS',
    async (ds, { dispatch }) => {
        dispatch(dataServiceActions.setLoading())

        const id = await fetchCreateDs({ data_name: ds.name, encode: ds.encode, blob: ds.blob })
        dispatch(dataServiceActions.setStopLoading())
        return id
    }
)

export const updateDS = createAsyncThunk<void, DataService>(
    'dataService/updateDS',
    async (ds, { dispatch }) => {
        dispatch(dataServiceActions.setLoading())
        await fetchUpdateDs({ data_id: ds.id, data_name: ds.name, encode: ds.encode, blob: ds.blob })
        dispatch(dataServiceActions.setDS(ds))
        dispatch(dataServiceActions.setStopLoading())
    }
)

interface PutPicDs {
    cover: File,
    id: number
}

export const updateCoverDS = createAsyncThunk<void, PutPicDs>(
    'dataService/updateCoverDS',
    async (arg, { dispatch }) => {
        dispatch(dataServiceActions.setLoading())

        await fetchPutPicDS(arg.id, arg.cover)
        dispatch(dataServiceActions.setStopLoading())
    }
)

interface CreateDataServiceWithCover extends CreateDataService {
    cover: File,
}

export const createDSWithCover = createAsyncThunk<number, CreateDataServiceWithCover>(
    'dataService/createDSWithCover',
    async (arg, { dispatch }) => {
        dispatch(dataServiceActions.setLoading())

        const id = await fetchCreateDs({ data_name: arg.name, encode: arg.encode, blob: arg.blob })
        await fetchPutPicDS(id, arg.cover)
        dispatch(dataServiceActions.setStopLoading())

        return id
    }
)

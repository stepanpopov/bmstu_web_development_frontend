import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchFilterReqs, fetchReqByID, fetchFormDraft } from '../../api/encryptDecryptRequest'
import { fetchDeleteFromDraft } from '../../api/dataService'

import EncryptDecryptRequst from '../../models/encryptDecryptRequest';
import DataService from '../../models/dataService';
import { RootState } from '../types';

export interface FilterReqArgs {
    status: string
    startDate: string
    endDate: string
}

export const filterReqs = createAsyncThunk<EncryptDecryptRequst[], FilterReqArgs>(
    'encryptDecryptRequestList/filterReqListByName',
    async (args) => {
        const reqList = await fetchFilterReqs(args.status, args.startDate, args.endDate)
        return reqList
    }
)

export const getReqByID = createAsyncThunk<[EncryptDecryptRequst, DataService[]], number>(
    'encryptDecryptRequestList/getReqByID',
    async (id) => {
        const req = await fetchReqByID(id);
        return req
    }
)

export const getDraft = createAsyncThunk<[EncryptDecryptRequst, DataService[]], void, { rejectValue: string, state: RootState }>(
    'encryptDecryptRequestList/getDraft',
    async (_, { getState, rejectWithValue }) => {
        const { draftID } = getState().enqDeqReqList
        
        if (!draftID) {
            throw new Error("draft id не установлен")
        }

        const req = await fetchReqByID(draftID);
        return req
    }
)

export const removeFromDraft = createAsyncThunk<void, number, { state: RootState } >(
    'encryptDecryptRequestList/deleteFromDraft', 
    async (id, { getState }) => {
        const { draftID } = getState().enqDeqReqList
        
        if (!draftID) {
            throw new Error("draft id не установлен")
        }

        const { draft } = getState().enqDeqReqList
        if (!draft) {
            throw new Error("draft не установлен")
        }
        
        await fetchDeleteFromDraft(id)
    }
)

export const formDraft = createAsyncThunk<void, number, { state: RootState } >(
    'encryptDecryptRequestList/formDraft', 
    async (id, { getState }) => {
        const { draftID } = getState().enqDeqReqList
        
        if (!draftID) {
            throw new Error("draft id не установлен")
        }

        const { draft } = getState().enqDeqReqList
        if (!draft) {
            throw new Error("draft не установлен")
        }

        await fetchFormDraft(id)
    }
)

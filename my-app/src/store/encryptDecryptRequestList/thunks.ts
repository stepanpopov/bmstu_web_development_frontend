import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchFilterReqs, FilterReqArgs, fetchReqByID, fetchFormDraft, fetchUpdateModeratorReq, UpdateModeratorReq, fetchDropDraft } from '../../api/encryptDecryptRequest'
import { fetchDeleteFromDraft } from '../../api/dataService'

export { type FilterReqArgs } from '../../api/encryptDecryptRequest'

import EncryptDecryptRequst, { Encoding } from '../../models/encryptDecryptRequest';
import DataService from '../../models/dataService';
import { RootState } from '../types';
import { Filter } from './slice';

export const filterReqs = createAsyncThunk<EncryptDecryptRequst[], FilterReqArgs>(
    'encryptDecryptRequestList/filterReqListByName',
    async (args) => {
        console.log('filterReqs', args)
        const reqList = await fetchFilterReqs({ status: args.status, startDate: args.startDate, endDate: args.endDate })
        return reqList
    }
);

export const filterReqsModerator = createAsyncThunk<EncryptDecryptRequst[], Filter>(
    'encryptDecryptRequestList/filterReqModeratorListByName',
    async (args) => {
        console.log('filterReqs', args)
        const reqList = await fetchFilterReqs({ status: args.status, startDate: args.startDate, endDate: args.endDate })
        return reqList.filter((req) => req.creator?.startsWith(args.creator ?? ''))
    }
);

export const getReqByID = createAsyncThunk<[EncryptDecryptRequst, DataService[]], number>(
    'encryptDecryptRequestList/getReqByID',
    async (id) => {
        const req = await fetchReqByID(id);
        return req
    }
)

export const removeFromDraft = createAsyncThunk<void, number, { state: RootState }>(
    'encryptDecryptRequestList/deleteFromDraft',
    async (id) => {
        await fetchDeleteFromDraft(id)
    }
)

interface FormDraft {
    id: number,
    encodingType: Encoding
}

export const formDraft = createAsyncThunk<void, FormDraft, { state: RootState }>(
    'encryptDecryptRequestList/formDraft',
    async (arg) => {
        await fetchFormDraft(arg.id, arg.encodingType)
    }
)

export const dropDraft = createAsyncThunk<void, number, { state: RootState }>(
    'encryptDecryptRequestList/dropDraft',
    async (draftID) => {
        await fetchDropDraft(draftID)
    }
)

export const updateModeratorReq = createAsyncThunk<void, UpdateModeratorReq, { state: RootState }>(
    'encryptDecryptRequestList/updateModeratorReq',
    async (req, { getState }) => {
        await fetchUpdateModeratorReq(req)
    }
)  

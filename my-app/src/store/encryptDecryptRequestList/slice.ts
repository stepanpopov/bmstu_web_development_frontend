import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import EncDeqRequest, { Status } from "../../models/encryptDecryptRequest";
import { filterReqs, getReqByID, getDraft, removeFromDraft, formDraft } from './thunks'
import DataService from "../../models/dataService";

import { addToDraft } from "../dataServiceList"

export interface Req {
  req: EncDeqRequest,
  reqDs: number[],
}

interface Reqs {
  [key: number]: Req
}

interface State {
    dsList: DataService[],
    otherReqs: Reqs,
    draftID: number | null,
    draft: Req | null 
    loading: boolean
    loadingFilterReqs: boolean
    error: string | null
}

const initialState: State = {
    draftID: null,
    draft: null,
    otherReqs: {},
    dsList: [],
    loading: true,
    loadingFilterReqs: true,
    error: null
}

const setReqs = (state: State, action: PayloadAction<EncDeqRequest[]>) => {
  const reqList = action.payload;
  state.otherReqs = reqList.reduce((reqs: Reqs, req) => {
    if (req.status === "draft" && state.draft) {
      state.draft.req = req
      state.draftID = req.id
      return reqs
    }
    if (req.status === "draft" && !state.draft) {
      state.draft = {
        req: req,
        reqDs: [],
      }
      state.draftID = req.id
      return reqs
    }

    reqs[req.id] = {
      req: req,
      reqDs: [],
    }

    return reqs
  }, {})
  state.loadingFilterReqs = false
  state.error = null
}

const setReq = (state: State, request: EncDeqRequest) => {
  if (request.status === "draft" && state.draft) {
    state.draft.req = request
    state.draftID = request.id
    return
  }
  if (request.status === "draft" && !state.draft) {
    state.draft = {
      req: request,
      reqDs: [],
    }
    state.draftID = request.id
    return
  }
  
  state.otherReqs[request.id].req = request
}

const setDSNumbersforReq = (state: State, dsList: DataService[], requestID: number, status: Status) => {

  // const dsListCurSet = new Set(state.dsList)
  const dsListCurMap = state.dsList.reduce((curMap, ds: DataService) => {
    curMap.set(ds.id, ds)
    return curMap
  }, new Map<number, DataService>());

  dsList.forEach((ds) => {
    dsListCurMap.set(ds.id, ds)
  })
  
  state.dsList = Array.from(dsListCurMap.values())
  console.log('state.dsList', state.dsList)

  const dsListNumbers = Array.from(new Set(dsList.map((ds) => ds.id)))

  if (status === "draft" && state.draft) {
    state.draft.reqDs = dsListNumbers
    return
  }

  state.otherReqs[requestID].reqDs = dsListNumbers
}

const slice = createSlice({
    name: 'enqDeqReqList',
    initialState,
    reducers: {
      setReqs,
      resetError(state) {
        state.error = null
      },
      setLoading(state, action: PayloadAction<boolean>) {
        console.log("in set loading")
        state.loading = action.payload
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(filterReqs.fulfilled, setReqs)
        .addCase(filterReqs.rejected, (state, action) => {
          state.error = action.error.message ?? "Не удалось выполнить запрос"
          state.loadingFilterReqs = false;
        })
        .addCase(filterReqs.pending, (state) => {
          state.loadingFilterReqs = true;
        })
        .addCase(getReqByID.fulfilled, (state, action) => {
          const req = action.payload[0]
          const dsList = action.payload[1]
          
          setReq(state, req)
          setDSNumbersforReq(state, dsList, req.id, req.status)

          state.loading = false;
          state.error = null
        })
        .addCase(getReqByID.rejected, (state, action) => {
          state.error = action.error.message ?? "Не удалось выполнить запрос"
          state.loading = false;
        })
        .addCase(getReqByID.pending, (state) => {
          state.loading = true;
        })
        .addCase(getDraft.fulfilled, (state, action) => {
          const req = action.payload[0]
          const dsList = action.payload[1]

          setReq(state, req)
          setDSNumbersforReq(state, dsList, req.id, req.status)

          state.loading = false;
          state.error = null
        })
        .addCase(getDraft.rejected, (state, action) => {
          state.error = action.error.message ?? "Не удалось выполнить запрос"
          state.loading = false;
        })
        .addCase(getDraft.pending, (state) => {
          state.loading = true;
        })
        .addCase(addToDraft.fulfilled, (state, action) => {
          state.draftID = action.payload
          state.loading = false;
        })
        .addCase(removeFromDraft.fulfilled, (state, action) => {
          if (state.draft) {
            state.draft.reqDs = state.draft.reqDs.filter((id) => id !== action.meta.arg)
          }
          state.loading = false;
        })
        .addCase(removeFromDraft.pending, (state) => {
          state.loading = true;
        })
        .addCase(removeFromDraft.rejected, (state, action) => {
          state.error = action.error.message ?? "Не удалось выполнить запрос"
          state.loading = false;
        })
        .addCase(formDraft.fulfilled, (state) => {
          state.draftID, state.draft = null, null
          state.loading = false;
        })
        .addCase(formDraft.pending, (state) => {
          state.loading = true;
        })
        .addCase(formDraft.rejected, (state, action) => {
          state.error = action.error.message ?? "Не удалось выполнить запрос"
          state.loading = false;
        })
    },
  });


export const { actions: enqDeqReqListActions, reducer: enqDeqReqListReducer } = slice

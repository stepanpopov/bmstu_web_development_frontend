import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import EncDeqRequest from "../../models/encryptDecryptRequest";
import { filterReqs, getReqByID, getDraft, removeFromDraft, formDraft } from './thunks'
import DataService from "../../models/dataService";

import { addToDraft } from "../dataServiceList"

export interface Req {
  req: EncDeqRequest,
  reqDs: Set<number>,
}

interface Reqs {
  [key: number]: Req
}

interface State {
    dsList: Set<DataService>,
    otherReqs: Reqs,
    draftID: number | null,
    draft: Req | null 
    loading: boolean
    error: string | null
}

const initialState: State = {
    draftID: null,
    draft: null,
    otherReqs: {},
    dsList: new Set,
    loading: true,
    error: null
}

const setReqs = (state: State, action: PayloadAction<EncDeqRequest[]>) => {
  const reqList = action.payload;
  state.otherReqs = reqList.reduce((reqs: Reqs, req) => {
    if (req.status === "draft" && state.draft) {
      return reqs
    }
    if (req.status === "draft" && !state.draft) {
      state.draft = {
        req: req,
        reqDs: new Set<number>,
      }
      return reqs
    }
    reqs[req.id].req = req
    return reqs
  }, {})
  state.loading = false
  state.error = null
}

const setReq = (state: State, request: EncDeqRequest) => {
  if (request.status === "draft" && state.draft) {
    state.draft!.req = request
  }
  if (request.status === "draft" && !state.draft) {
    state.draft = {
      req: request,
      reqDs: new Set,
    }
    return
  }
  
  state.otherReqs[request.id].req = request
}

const setDSListForReq = (state: State, dsList: DataService[], request: EncDeqRequest) => {
  const dsNumbers = new Set(dsList.map((ds) => ds.id))
  dsList.forEach((ds) => {
    state.dsList.add(ds)
  })

  if (request.status === "draft") {
    state.draft = {
      req: request,
      reqDs: dsNumbers
    }
    return
  }

  state.otherReqs[request.id].req = request
  state.otherReqs[request.id].reqDs = dsNumbers
}

const slice = createSlice({
    name: 'enqDeqReqList',
    initialState,
    reducers: {
      setReqs,
    },
    extraReducers: (builder) => {
      builder
        .addCase(filterReqs.fulfilled, setReqs)
        .addCase(filterReqs.rejected, (state, action) => {
          state.error = action.error.message ?? "Не удалось выполнить запрос"
          state.loading = false;
        })
        .addCase(filterReqs.pending, (state) => {
          state.loading = true;
        })
        .addCase(getReqByID.fulfilled, (state, action) => {
          const req = action.payload[0]
          const dsList = action.payload[1]

          setReq(state, req)
          setDSListForReq(state, dsList, req)

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
          setDSListForReq(state, dsList, req)

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
          state.draft?.reqDs.delete(action.meta.arg)
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

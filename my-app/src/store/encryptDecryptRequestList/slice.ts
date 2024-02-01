import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import EncDeqRequest, { Status } from "../../models/encryptDecryptRequest";
import { filterReqs, filterReqsModerator, getReqByID, removeFromDraft, formDraft, FilterReqArgs, dropDraft } from './thunks'
import DataService from "../../models/dataService";
import { filterDataListByName } from "../dataServiceList/thunks"
import { addToDraft } from "../dataServiceList"

export interface Req {
  req: EncDeqRequest,
  reqDs: number[],
}

interface Reqs {
  [key: number]: Req
}

export interface Filter extends FilterReqArgs {
  creator?: string
}

export interface State {
  dsList: DataService[],
  reqs: Reqs,
  loading: boolean
  loadingFilterReqs: boolean
  error: string | null

  filter: Filter
}

const initialState: State = {
  reqs: {},
  dsList: [],
  loading: true,
  loadingFilterReqs: true,
  error: null,
  filter: {},
}

const getDraftID = (state: State) => {
  let req: Req;
  for (req of (Object.values(state.reqs))) {
    if (req.req.status === 'draft') {
      return req.req.id
    }
  }

  return -1
}

const setReqs = (state: State, action: PayloadAction<EncDeqRequest[]>) => {
  const reqList = action.payload;
  state.reqs = reqList.reduce((reqs: Reqs, req) => {
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
  const curReq = state.reqs[request.id]
  if (curReq) {
    state.reqs[request.id].req = request
    return
  }

  state.reqs[request.id] = {
    req: request,
    reqDs: [],
  }
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


  const dsListNumbers = Array.from(new Set(dsList.map((ds) => ds.id)))

  state.reqs[requestID].reqDs = dsListNumbers
}

const slice = createSlice({
  name: 'enqDeqReqList',
  initialState,
  reducers: {
    setReqs,
    setFilter(state, action: PayloadAction<Filter>) {
      state.filter = action.payload
    },
    resetError(state) {
      state.error = null
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterDataListByName.fulfilled, (state, action) => {
      })
      .addCase(filterReqs.fulfilled, setReqs)
      .addCase(filterReqs.rejected, (state, action) => {
        state.error = action.error.message ?? "Не удалось выполнить запрос"
        state.loadingFilterReqs = false;
      })
      .addCase(filterReqs.pending, (state) => {
        state.loadingFilterReqs = true;
      })
      .addCase(filterReqsModerator.fulfilled, setReqs)
      .addCase(filterReqsModerator.rejected, (state, action) => {
        state.error = action.error.message ?? "Не удалось выполнить запрос"
        state.loadingFilterReqs = false;
      })
      .addCase(filterReqsModerator.pending, (state) => {
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
      .addCase(addToDraft.fulfilled, (state, action) => {
        console.log('addToDraft.fulfilled')
        console.log('action.payload', action.payload)
        state.loading = false;
      })
      .addCase(removeFromDraft.fulfilled, (state, action) => {
        const draftID = getDraftID(state)
        console.log('DRAFT ID:', draftID)
        console.log('DRAFT:', state.reqs[draftID])
        state.reqs[draftID].reqDs = state.reqs[draftID].reqDs.filter((id) => id !== action.meta.arg)
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
        console.log('formDraft.fulfilled')
        const draftID = getDraftID(state)
        if (draftID !== -1) {
          state.reqs[draftID].req.status = 'formed'
        }
        state.loading = false;
      })
      .addCase(formDraft.pending, (state) => {
        state.loading = true;
      })
      .addCase(formDraft.rejected, (state, action) => {
        state.error = action.error.message ?? "Не удалось выполнить запрос"
        state.loading = false;
      })
      .addCase(dropDraft.fulfilled, (state, action) => {
        state.reqs[action.meta.arg].req.status = "deleted"
        state.loading = false;
      })
  },
});


export const { actions: enqDeqReqListActions, reducer: enqDeqReqListReducer } = slice

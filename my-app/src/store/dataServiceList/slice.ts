import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import DataService from "../../models/dataService";
import { addToDraft, filterDataListByName } from './thunks'
import { dataServicesMock } from '../../consts'

export interface entities {
  [key: number]: DataService
}

interface state {
  ids: number[],
  entities: entities,
  loading: boolean
  successAddToDraft: boolean
  error: string | null
}

const initialState: state = {
  ids: [],
  entities: {},
  loading: true,
  successAddToDraft: false,
  error: null
}

const reduceToEntities = (dsList: DataService[]) => (
  dsList.reduce((entities: entities, ds) => {
    entities[ds.id] = ds
    return entities
  }, {})
)

const slice = createSlice({
  name: 'dataServiceList',
  initialState,
  reducers: {
    resetError(state) {
      state.error = null
    },
    resetSuccess(state) {
      state.successAddToDraft = false
    },
    addData(state, action: PayloadAction<DataService>) {
      const data = action.payload;

      state.entities[data.id] = data
      state.ids.push(data.id);
    },
    removeData(state, action: PayloadAction<number>) {
      const dsID = action.payload;
      delete state.entities[dsID];
      state.ids = state.ids.filter((id) => id !== dsID);
    },
    setDatas(state, action: PayloadAction<DataService[]>) {
      const data = action.payload;

      state.entities = reduceToEntities(data)
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(filterDataListByName.fulfilled, (state, action) => {
        const dsList = action.payload;

        state.entities = reduceToEntities(dsList.dsList)
        state.loading = false;
      })
      .addCase(filterDataListByName.rejected, (state, action) => {
        const { arg } = action.meta
        state.entities = reduceToEntities(dataServicesMock.filter((ds) => (ds.name.includes(arg))))
        state.loading = false;
      })
      .addCase(filterDataListByName.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToDraft.rejected, (state, action) => {


        state.error = action.payload ?? 'не удалось выполнить запрос'
      })
      .addCase(addToDraft.fulfilled, (state) => {
        state.successAddToDraft = true
      })
  },
});


export const { actions: dataServiceListActions, reducer: dataServiceListReducer } = slice

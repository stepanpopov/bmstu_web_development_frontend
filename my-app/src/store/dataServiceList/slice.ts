import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import DataService from "../../models/dataService";
import { filterDataListByName } from './thunks'
import { dataServicesMock } from '../../consts'

export interface entities {
    [key: number]: DataService
}

interface state {
    ids: number[],
    entities: entities,
    loading: boolean
}

const initialState: state = {
    ids: [],
    entities: {},
    loading: true
}

const reduceToEntities = (dsList: DataService[]) => (
    dsList.reduce((entities: entities, ds) => {
      entities[ds.id] = ds
      return entities
    }, {})
)

const slice = createSlice({
    name: 'dataService',
    initialState,
    reducers: {
      addData(state, action: PayloadAction<DataService>) {
        const data = action.payload;
    
        state.entities[data.id] = data
        state.ids.push(data.id);
      },
      removeData(state, action: PayloadAction<DataService>) {
        const data = action.payload;
  
        delete state.entities[data.id];
        state.ids = state.ids.filter((id) => id !== data.id);
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

          state.entities = reduceToEntities(dsList)
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
    },
  });


export const { actions: dataServiceListActions, reducer: dataServiceListReducer } = slice

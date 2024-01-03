import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import DataService from "../../models/dataService";
import { getDsByID, filterDataListByName } from './thunks'
import { dataServicesMock } from '../../consts'

interface entities {
    [key: number]: DataService
}

interface state {
    ids: number[],
    entities: entities,
    selected: number | null,
}

const initialState: state = {
    ids: [],
    entities: {},
    selected: null,
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
        /*.addCase(getDsByID.fulfilled, (state, action) => {
            const ds = action.payload;
            state.selected = ds.id
        })
        .addCase(getDsByID.rejected, (state, action) => {
          const ds = action.payload;
          //
        }) ??*/
        .addCase(filterDataListByName.fulfilled, (state, action) => {
          const dsList = action.payload;

          state.entities = reduceToEntities(dsList)
        })
        .addCase(filterDataListByName.rejected, (state) => {
          
          state.entities = reduceToEntities(dataServicesMock)
        })
    },
  });


export const { actions: dataSericeActions, reducer: dataServiceReducer } = slice

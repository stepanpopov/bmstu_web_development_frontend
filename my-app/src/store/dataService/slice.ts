import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import DataService from "../../models/dataService";
import { getDsByID } from './thunks'
import { dataServicesMock } from '../../consts'

interface state {
  id: number | null,
  ds: DataService | null,
  loading: boolean
}

const initialState: state = {
  id: null,
  ds: null,
  loading: true
}

const slice = createSlice({
  name: 'dataService',
  initialState,
  reducers: {
    setDS(state, action: PayloadAction<DataService>) {
      const data = action.payload;

      state.id = data.id
      state.ds = data
    },
    setLoading(state) {
      state.loading = true
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDsByID.fulfilled, (state, action) => {

        const ds = action.payload;
        state.ds = ds;
        state.id = ds.id;
        state.loading = false;
      })
      .addCase(getDsByID.rejected, (state, action) => {

        const id = action.meta.arg;

        const dMock = dataServicesMock.find((ds) => (ds.id === id))

        state.ds = dMock ?? dataServicesMock[0]
        state.id = id
        state.loading = false;
      })
      .addCase(getDsByID.pending, (state) => {

        state.loading = true;
      })
  },
});


export const { actions: dataServiceActions, reducer: dataServiceReducer } = slice

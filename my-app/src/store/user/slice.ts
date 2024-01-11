import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import User from "../../models/user";
import { login, register, logout } from './thunks'

interface State {
    user: User | null
    loading: boolean
    error: string | null
}

const initialState: State = {
    user: null,
    loading: true,
    error: null
}

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        },
        removeUser(state) {
            state.user = null
        }
    },
    extraReducers: (builder) => {
      builder
        .addCase(login.pending, (state) => {
            state.loading = true;
        })
        .addCase(login.rejected, (state, action) => {
            state.error = action.error.message ?? "Не удалось выполнить запрос"
            state.loading = false
        })
        .addCase(register.pending, (state) => {
            state.loading = true;
        })
        .addCase(register.rejected, (state, action) => {
            state.error = action.error.message ?? "Не удалось выполнить запрос"
            state.loading = false
        })
        .addCase(logout.pending, (state) => {
            state.loading = true;
        })
        .addCase(logout.rejected, (state, action) => {
            state.error = action.error.message ?? "Не удалось выполнить запрос"
            state.loading = false
        })
    },
  });


export const { actions: userActions, reducer: userReducer } = slice

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import User from "../../models/user";
import { login, register, logout, checkAuth } from './thunks'

interface State {
    user: User | null
    loading: boolean
    error: string | null
}

const initialState: State = {
    user: null, // {"role": "user", "login": "stepan"},
    loading: true,
    error: null
}

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload
            state.loading = false
        },
        setLoading(state, action: PayloadAction<boolean>) {
            ("in set loading")
            state.loading = action.payload
        },
        removeUser(state) {
            state.user = null
            state.loading = false
        },
        resetError(state) {
            state.error = null
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
            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.error = action.error.message ?? "Не удалось выполнить запрос"
                state.loading = false;
            })
    },
});


export const { actions: userActions, reducer: userReducer } = slice

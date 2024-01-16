import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie'
import { fetchLogin, fetchLogout, fetchRegister} from '../../api/user'
import { JWT_TOKEN_COOKIE } from '../../consts';
import { RootState } from '../types';
import { userActions } from './slice';

export interface Login {
    login: string,
    password: string,
}

export interface Register extends Login {
    isModerator: boolean
}

export const login = createAsyncThunk<string, Login, { state: RootState }>(
    'user/login', 
    async (args, { dispatch }) => {
    
       const resp =  await fetchLogin(args.login, args.password)
       Cookies.set(JWT_TOKEN_COOKIE, resp)
       console.log("before dispatch")
       dispatch(userActions.setUser({login: args.login, role: "user"}))
       return resp
    }
)

export const register = createAsyncThunk<void, Register>(
    'user/register', 
    async (args) => {
       await fetchRegister(args.login, args.password, args.isModerator)
    }
)

export const logout = createAsyncThunk<void, void, { state: RootState }>(
    'user/logout',
    async (_, { dispatch }) => {
        await fetchLogout()
        Cookies.remove(JWT_TOKEN_COOKIE)
        dispatch(userActions.removeUser())
    }
)

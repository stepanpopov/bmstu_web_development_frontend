import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie'
import { fetchLogin, fetchLogout, fetchRegister, fetchCheckAuth } from '../../api/user'
import { JWT_TOKEN_COOKIE, USERNAME_COOKIE, USER_ROLE_COOKIE } from '../../consts';
import { RootState } from '../types';
import { userActions } from './slice';
import { getRoleFromString } from '../../models/user'
import { userRoleMock } from '../../consts'

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

        const resp = await fetchLogin(args.login, args.password)
        Cookies.set(JWT_TOKEN_COOKIE, resp)
        Cookies.set(USERNAME_COOKIE, args.login)
        Cookies.set(USER_ROLE_COOKIE, userRoleMock)


        dispatch(userActions.setUser({ login: args.login, role: userRoleMock }))
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

export const checkAuth = createAsyncThunk<void, void, { state: RootState }>(
    'user/checkAuth',
    async (_, { dispatch }) => {
        const isAuth = await fetchCheckAuth()

        if (!isAuth) {
            Cookies.remove(JWT_TOKEN_COOKIE)
            Cookies.remove(USERNAME_COOKIE)
            Cookies.remove(USER_ROLE_COOKIE)
            dispatch(userActions.setLoading(false))
            return
        }


        const username = Cookies.get(USERNAME_COOKIE)
        const userRole = Cookies.get(USER_ROLE_COOKIE)
        if (username && userRole) {
            dispatch(userActions.setUser({ role: getRoleFromString(userRole), login: username }))
            return
        }
        dispatch(userActions.setLoading(false))
    }
)

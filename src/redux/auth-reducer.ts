import {Action, Dispatch} from "redux";
import {authAPI} from "../api/api";
import {ThunkDispatch} from 'redux-thunk'
import {AppStateType} from "./redux-store";
import {stopSubmit} from "redux-form";

export type authPageType = {
    userId: string
    email: string
    login: string
    isAuth: boolean
}
let initialState: authPageType = {

    userId: '',
    email: '',
    login: '',
    isAuth: false
}
// Action Creators (AC)
export const setAuthUserData = (userId: string, email: string, login: string, isAuth: boolean) => (
    {
        type: 'samurai-network/auth/SET-USER-DATA',
        payload: {userId, email, login, isAuth}
    }) as const


//Thunks
export const getAuthUserData = () => async (dispatch: Dispatch) => {
    let res = await authAPI.me();
    if (res.data.resultCode === 0) {
        let {id, login, email} = res.data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}
//Type for Dispatch from redux-thunk //!!!!
type DispatchType = ThunkDispatch<AppStateType, void, Action>

export const loginTC = (email: string, password: string, rememberMe: boolean) => async (dispatch: DispatchType) => {
    let res = await authAPI.login(email, password, rememberMe);
    if (res.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        let massage = res.data.messages.length > 0 ? res.data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: massage}))
    }
}

export const logoutTC = () => async (dispatch: DispatchType) => {
    let res = await authAPI.logout()
    if (res.data.resultCode === 0) {
        dispatch(setAuthUserData('', '', '', false))
    }
}

export type UsersActionType = ReturnType<typeof setAuthUserData>

const authReducer = (state: authPageType = initialState, action: UsersActionType): authPageType => {
    switch (action.type) {
        case "samurai-network/auth/SET-USER-DATA":
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}
export default authReducer;
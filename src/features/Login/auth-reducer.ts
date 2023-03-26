import {Dispatch} from "redux";
import {loginApi} from "../../api/auth-API";
import {handleErrorFromServer, handleNetworkError} from "../../utils/error-utils";
import axios from "axios";
import {FormDataType} from "./Login";

type AuthActionsType = ChangeLoggedIn | ChangeInitialized

type ChangeLoggedIn = ReturnType<typeof changeLoggedIn>
type ChangeInitialized = ReturnType<typeof changeInitialized>

export type AuthStateType = {
    isLoggedIn: boolean
    isInitialized: boolean
}

const initialState: AuthStateType = {
    isLoggedIn: false,
    isInitialized: false
}

export const authReducer = (state = initialState, action: AuthActionsType) => {
        switch (action.type) {
            case "CHANGE-LOGGED":
                return  {...state, isLoggedIn: action.value}
            case "CHANGE-INITIALIZED":
                return {...state, isInitialized: action.value}
        }
    return state
}

export const changeLoggedIn = (value: boolean) => ({type: 'CHANGE-LOGGED', value} as const )
export const changeInitialized = (value: boolean) => ({type: 'CHANGE-INITIALIZED', value} as const )

export const loggedInTC = (obj: FormDataType) => async (dispatch: Dispatch<AuthActionsType>) => {

    try {
        const res = await loginApi.login(obj)
        if(res.data.resultCode === 0){
            dispatch(changeLoggedIn(true))
        } else {
            handleErrorFromServer(res.data, dispatch)
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const error = err.response ? err.response.data.message : err.message
            handleNetworkError(dispatch, {message: error})
    }
}}

export const checkLoggedTC = () => async (dispatch: Dispatch) => {

    try {
        const res = await loginApi.authMe()
        if( res.data.resultCode === 0){
            dispatch(changeLoggedIn(true))
            dispatch(changeInitialized(true))
        } else {
            handleErrorFromServer(res.data, dispatch)
            dispatch(changeInitialized(true))
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const error = err.response ? err.response.data.message : err.message
            handleNetworkError(dispatch, {message: error})
        }
    }
}

export const logoutTC = () => async (dispatch: Dispatch) => {
    try {
        const res = await loginApi.deleteMe()
        if(res.data.resultCode === 0){
            dispatch(changeLoggedIn(false))
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const error = err.response ? err.response.data.message : err.message
            handleNetworkError(dispatch, {message: error})
        }
    }
}
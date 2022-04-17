import {getAuthUserData} from "./auth-reducer";

let initialState = {
    initialized: false
}

export type authPageType = typeof initialState

const appReducer = (state = initialState, action: AppActionType): authPageType => {
    switch (action.type) {
        case "SN/APP/INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true,
            }
        default:
            return state
    }
}

export type AppActionType = ReturnType<typeof initializedSuccess>

// Action Creators (AC)
export const initializedSuccess = () => ({type: 'SN/APP/INITIALIZED_SUCCESS',}) as const


//Thunks
export const initializeApp = () => (dispatch: any) => {
    const promise = dispatch(getAuthUserData());

    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })
}


export default appReducer;
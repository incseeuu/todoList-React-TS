

export type ActionsAppType = ChangeLoadingAC | ChangeErrorMessageAC

type ChangeLoadingAC = ReturnType<typeof changeLoadingAC>
type ChangeErrorMessageAC = ReturnType<typeof changeErrorMessageAC>

export type LoadingType = 'loading' | 'inProgress' | 'success' | 'idle'

const initialState = {
    loading: 'success' as LoadingType,
    error: null as null | string
}

export const appReducer = (state = initialState, action: ActionsAppType) => {
    switch (action.type){
        case "CHANGE-LOADING":
            return {...state, loading: action.loading}
        case "CHANGE-ERROR":
            return  {...state, error: action.value}
    }
    return state
}

export const changeLoadingAC  = (loading: LoadingType) => ({type: 'CHANGE-LOADING', loading} as const )
export const changeErrorMessageAC  = (value: null | string) => ({type: 'CHANGE-ERROR', value} as const )


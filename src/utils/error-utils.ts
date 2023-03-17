import {Dispatch} from "redux";
import {TaskActionsType} from "../reducers/tasks-reducer";
import {DeletePostTasksType} from "../api/todolist-API";
import {changeErrorMessageAC, changeLoadingAC} from "../reducers/app-reducer";

export const handleErrorFromServer = <T>(data: DeletePostTasksType<T>, dispatch: Dispatch) => {
    if(data.messages.length){
        dispatch(changeErrorMessageAC(data.messages[0]))
    } else {
        dispatch(changeErrorMessageAC('Something went wrong'))
    }
    dispatch(changeLoadingAC('success'))
}

export const handleNetworkError = (dispatch: Dispatch, error: {message: string}) => {
    dispatch(changeErrorMessageAC(error.message))
    dispatch(changeLoadingAC('success'))
}
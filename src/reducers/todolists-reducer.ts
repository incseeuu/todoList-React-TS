import {v1} from "uuid";
import {GetTodoType, todolistAPI} from "../api/todolist-API";
import {Dispatch} from "redux";
import {ActionsAppType, changeErrorMessageAC, changeLoadingAC, LoadingType} from "./app-reducer";
import {handleErrorFromServer} from "../utils/error-utils";


type GeneralActionType = AddNewTodoListAC
    | RemoveTodoListAC
    | UpdateTodoListsTitleAC
    | ChangeFilterTasksAC
    | SetTodoListAC
    | ActionsAppType
    | UpdateTodoListQueryAC

export type AddNewTodoListAC = ReturnType<typeof addNewTodoListAC>
export type RemoveTodoListAC = ReturnType<typeof removeTodoListAC>
export type UpdateTodoListsTitleAC = ReturnType<typeof updateTodoListsTitleAC>
export type ChangeFilterTasksAC = ReturnType<typeof changeFilterTasksAC>
export type SetTodoListAC = ReturnType<typeof setTodoListAC>
export type UpdateTodoListQueryAC = ReturnType<typeof updateTodoListQueryAC>

export type FilterTasksType = "All" | "Active" | "Completed"

export type TodoListEntityType = GetTodoType & {
    filter: FilterTasksType
    queryStatus: LoadingType
}


const initialState: TodoListEntityType[] = []

export const todoListsReducer = (state = initialState, action: GeneralActionType) => {
    switch (action.type) {
        case "SET-TODOLIST":
            return action.payload.todoList.map(el => ({...el, filter: 'All', queryStatus: 'idle'}))
        case "ADD-TODOLIST":
            let newTodoList: TodoListEntityType = {...action.payload.todolist, filter: 'All', queryStatus: 'idle'}
            return [...state, newTodoList]
        case "DELETE-TODOLIST":
            return state.filter(el => el.id !== action.payload.todoListId)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id === action.payload.todoListId
                ? {...el, title: action.payload.newValue}
                : el)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(el => el.id === action.payload.todoListId
                ? {...el, filter: action.payload.value}
                : el)
        case "CHANGE-QUERY":
            return state.map(el => el.id === action.todoListId ? {...el, queryStatus: action.status} : el)
    }
    return state
}

export const setTodoListAC = (todoList: GetTodoType[]) => {
    return {
        type: 'SET-TODOLIST',
        payload: {
            todoList
        }
    } as const
}

export const addNewTodoListAC = (todolist: GetTodoType) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todolist
        }
    } as const
}

export const removeTodoListAC = (todoListId: string) => {
    return {
        type: 'DELETE-TODOLIST',
        payload: {
            todoListId
        }
    } as const
}

export const updateTodoListsTitleAC = (todoListId: string, newValue: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todoListId,
            newValue
        }
    } as const
}

export const updateTodoListQueryAC = (todoListId: string, status: LoadingType) => ({type: 'CHANGE-QUERY', todoListId, status} as const)

export const changeFilterTasksAC = (todoListId: string, value: FilterTasksType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todoListId,
            value
        } as const
    } as const
}

export const getTodoListThunkCreator = () => (dispatch: Dispatch<GeneralActionType>) => {
    dispatch(changeLoadingAC('loading'))
    todolistAPI.getTodoList()
        .then(res => {
            dispatch(setTodoListAC(res.data))
            dispatch(changeLoadingAC('success'))
        })
}

export const addTodoListThunkCreator = (title: string) => (dispatch: Dispatch<GeneralActionType>) => {
    dispatch(changeLoadingAC('loading'))
    todolistAPI.createTodoList(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addNewTodoListAC(res.data.data.item))
            } else {
                handleErrorFromServer(res.data,dispatch)
            }
        })
        .catch((error) => {
            handleErrorFromServer(error.data, dispatch)
        })
}

export const deleteTodoListThunkCreator = (todolistId: string) => (dispatch: Dispatch<GeneralActionType>) => {
    dispatch(changeLoadingAC('loading'))
    dispatch(updateTodoListQueryAC(todolistId, 'inProgress'))
    todolistAPI.deleteTodoList(todolistId)
        .then(res => {
            if(res.data.resultCode === 0){
                dispatch(removeTodoListAC(todolistId))
                dispatch(changeLoadingAC('success'))
            } else {
                handleErrorFromServer(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleErrorFromServer(error.data, dispatch)
        })
}

export const updateTodoListThunkCreator = (todolistId: string, title: string) => (dispatch: Dispatch<GeneralActionType>) => {
    dispatch(changeLoadingAC('loading'))
    todolistAPI.updateTodoList(todolistId, title)
        .then(res => {
            if(res.data.resultCode === 0){
                dispatch(updateTodoListsTitleAC(todolistId, title))
                dispatch(changeLoadingAC('success'))
            } else {
                handleErrorFromServer(res.data, dispatch)
            }
        })
}
import {v1} from "uuid";
import {GetTodoType, todolistAPI} from "../api/todolist-API";
import {Dispatch} from "redux";


type GeneralActionType = AddNewTodoListAC
    | RemoveTodoListAC
    | UpdateTodoListsTitleAC
    | ChangeFilterTasksAC
    | SetTodoListAC

export type AddNewTodoListAC = ReturnType<typeof addNewTodoListAC>
export type RemoveTodoListAC = ReturnType<typeof removeTodoListAC>
type UpdateTodoListsTitleAC = ReturnType<typeof updateTodoListsTitleAC>
type ChangeFilterTasksAC = ReturnType<typeof changeFilterTasksAC>
export type SetTodoListAC = ReturnType<typeof setTodoListAC>

export type FilterTasksType = "All" | "Active" | "Completed"

export type TodoListEntityType = GetTodoType & {
    filter: FilterTasksType
}


const initialState: TodoListEntityType[] = []

export const todoListsReducer = (state = initialState, action: GeneralActionType) => {
    switch (action.type){
        case "SET-TODOLIST":
            return action.payload.todoList.map(el => ({...el, filter: 'All'}))
        case "ADD-TODOLIST":
            let newTodoList: TodoListEntityType = {id: action.payload.idForNewTodoList ,title: action.payload.newTodoListTitle, filter: 'All', addedDate: '', order: 0}
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

export const addNewTodoListAC = (newTodoListTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            idForNewTodoList: v1(),
            newTodoListTitle
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
    }as const
}

export const changeFilterTasksAC = (todoListId: string, value: FilterTasksType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todoListId,
            value
        } as const
    } as const
}

export const getTodoListThunkCreator = () => (dispatch: Dispatch) => {
    todolistAPI.getTodoList()
        .then(res => dispatch(setTodoListAC(res.data)))
}

export const addTodoListThunkCreator = (title: string) => (dispatch: Dispatch<GeneralActionType>) => {
    todolistAPI.createTodoList(title)
        .then(res => {
            dispatch(addNewTodoListAC(title))
        })
}

export const deleteTodoListThunkCreator = (todolistId: string) => (dispatch: Dispatch<GeneralActionType>) => {
    todolistAPI.deleteTodoList(todolistId)
        .then(res => {
            dispatch(removeTodoListAC(todolistId))
        })
}

export const updateTodoListThunkCreator = (todolistId: string, title: string) => (dispatch: Dispatch<GeneralActionType>) => {
    todolistAPI.updateTodoList(todolistId, title)
        .then(res => {
            dispatch(updateTodoListsTitleAC(todolistId, title))
        })
}
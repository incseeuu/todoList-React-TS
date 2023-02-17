import {FilterTasksType, TodoListType} from "../App";
import {v1} from "uuid";


type GeneralActionType = AddNewTodoListAC
    | RemoveTodoListAC
    | UpdateTodoListsTitleAC
    | ChangeFilterTasksAC

export type AddNewTodoListAC = ReturnType<typeof addNewTodoListAC>
export type RemoveTodoListAC = ReturnType<typeof removeTodoListAC>
type UpdateTodoListsTitleAC = ReturnType<typeof updateTodoListsTitleAC>
type ChangeFilterTasksAC = ReturnType<typeof changeFilterTasksAC>

const initialState: TodoListType[] = []

export const todoListsReducer = (state = initialState, action: GeneralActionType) => {
    switch (action.type){
        case "ADD-TODOLIST":
            let newTodoList: TodoListType = {id: action.payload.idForNewTodoList ,title: action.payload.newTodoListTitle, filter: 'All'}
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
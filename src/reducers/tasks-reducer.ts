import {TodoListsTasksType} from "../App";
import {TasksType} from "../TodoList";
import {v1} from "uuid";
import {AddNewTodoListAC, RemoveTodoListAC} from "./todolists-reducer";


type GeneralTaskType = AddTaskAC | RemoveTaskAC | ChangeIsDoneStatusAC | UpdateTitleTasksAC | AddNewTodoListAC | RemoveTodoListAC

type AddTaskAC = ReturnType<typeof addTaskAC>
type RemoveTaskAC = ReturnType<typeof removeTaskAC>
type ChangeIsDoneStatusAC = ReturnType<typeof changeIsDoneStatusAC>
type UpdateTitleTasksAC = ReturnType<typeof updateTitleTasksAC>

export const tasksReducer = (state: TodoListsTasksType, action: GeneralTaskType) => {
    switch (action.type){
        case "ADD-TASK":
            const newTask = {id: v1(), title: action.payload.newTaskTitle, isDone: false}
            return {...state, [action.payload.todoListId]: [newTask, ...state[action.payload.todoListId]]}
        case "DELETE-TASK":
            return {...state, [action.payload.todoListId]: state[action.payload.todoListId]
                    .filter(el => el.id !== action.payload.taskId)}
        case "CHANGE-IS-DONE":
            return {...state, [action.payload.todoListId]: state[action.payload.todoListId].map(el =>
                    el.id === action.payload.taskId
                        ? {...el, isDone: action.payload.checked}
                        : el )}
        case "CHANGE-TITLE-TASK":
            return {...state, [action.payload.todoListId]: state[action.payload.todoListId]
                    .map(el => el.id === action.payload.tasksId
                        ? {...el, title: action.payload.newValue}
                        : el )}
        case "ADD-TODOLIST":
            return {...state, [action.payload.idForNewTodoList]: [] }
        case "DELETE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.payload.todoListId]
            return copyState
    }
    return state
}

export const addTaskAC = (todoListId: string, newTaskTitle: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            newTaskTitle,
            todoListId
        }
    } as const
}

export const removeTaskAC = (todoListId: string, taskId: string) => {
    return {
        type: 'DELETE-TASK',
        payload: {
            todoListId,
            taskId
        }
    } as const
}

export const changeIsDoneStatusAC = (todoListId: string, taskId: string, checked: boolean) => {
    return {
        type: 'CHANGE-IS-DONE',
        payload: {
            todoListId,
            taskId,
            checked
        }
    } as const
}

export const updateTitleTasksAC = (todoListId: string, tasksId: string, newValue: string) => {
    return {
        type: 'CHANGE-TITLE-TASK',
        payload: {
            todoListId,
            tasksId,
            newValue
        }
    } as const
}
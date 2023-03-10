import {v1} from "uuid";
import {PostTaskType, TaskStatuses, TasksType, todolistAPI} from "../api/todolist-API";
import {AddNewTodoListAC, RemoveTodoListAC, SetTodoListAC} from "./todolists-reducer";
import {Dispatch} from "redux";
import {AppRootStateType} from "../store/store";


type GeneralTaskType = AddTaskAC
    | RemoveTaskAC
    | ChangeIsDoneStatusAC
    | UpdateTitleTasksAC
    | AddNewTodoListAC
    | RemoveTodoListAC
    | SetTodoListAC
    | SetTaskAC

type AddTaskAC = ReturnType<typeof addTaskAC>
type RemoveTaskAC = ReturnType<typeof removeTaskAC>
type ChangeIsDoneStatusAC = ReturnType<typeof changeIsDoneStatusAC>
type UpdateTitleTasksAC = ReturnType<typeof updateTitleTasksAC>
type SetTaskAC = ReturnType<typeof setTaskAC>

export type TodoListsTasksType = {
    [key: string]: TasksType[]
}

const initialState: TodoListsTasksType = {}

export const tasksReducer = (state = initialState, action: GeneralTaskType) => {
    switch (action.type) {
        case "SET-TODOLIST": {
            let copyState = {...state}
            action.payload.todoList.forEach(el => copyState[el.id] = [])
            return copyState
        }
        case "SET-TASK":
            return {...state, [action.payload.todoListId]: action.payload.task}
        case "ADD-TASK":
            return {...state, [action.payload.todolistId]: [action.payload.task, ...state[action.payload.todolistId]]}
        case "DELETE-TASK":
            return {
                ...state, [action.payload.todoListId]: state[action.payload.todoListId]
                    .filter(el => el.id !== action.payload.taskId)
            }
        case "CHANGE-IS-DONE":
            return {...state, [action.payload.todoListId]: state[action.payload.todoListId].map(el =>
                    el.id === action.payload.taskId
                        ? action.payload.task
                        : el )}

        case "CHANGE-TITLE-TASK":
            return {
                ...state, [action.payload.todoListId]: state[action.payload.todoListId]
                    .map(el => el.id === action.payload.tasksId
                        ? {...el, title: action.payload.newValue}
                        : el)
            }
        case "ADD-TODOLIST":
            return {...state, [action.payload.idForNewTodoList]: []}
        case "DELETE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.payload.todoListId]
            return copyState
    }
    return state
}

export const setTaskAC = (todoListId: string, task: TasksType[]) => {
    return {
        type: 'SET-TASK',
        payload: {
            todoListId,
            task
        }
    } as const
}

export const addTaskAC = (todolistId: string, task: TasksType) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistId,
            task
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

export const changeIsDoneStatusAC = (todoListId: string, taskId: string, task: TasksType) => {
    return {
        type: 'CHANGE-IS-DONE',
        payload: {
            todoListId,
            taskId,
            task
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

export const getTaskThunkCreator = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.getTasks(todolistId)
        .then(res => dispatch(setTaskAC(todolistId, res.data.items)))
}

export const addTaskThunkCreator = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.addTasks(todolistId, title)
        .then(res => dispatch(addTaskAC(todolistId, res.data.item)))
}

export const removeTaskThunkCreator = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTask(todolistId, taskId)
        .then(res => dispatch(removeTaskAC(todolistId, taskId)))
}



export const updateTaskThunkCreator = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType)=> {

        const task = getState().tasksReducer[todolistId].find((t) => t.id === taskId)

        if(task){
            let modelTask: PostTaskType = {
                title: task.title,
                status,
                deadline: task.deadline,
                priority: task.priority,
                startDate: task.startDate,
                description: task.description,
                completed: task.completed
            }

            todolistAPI.updateTask(todolistId, taskId, modelTask)
            .then(res => dispatch(changeIsDoneStatusAC(todolistId, taskId, res.data.item)))
        }
    }
}
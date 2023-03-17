import {TasksType, TaskTypeForChangeApi, todolistAPI} from "../api/todolist-API";
import {AddNewTodoListAC, RemoveTodoListAC, SetTodoListAC} from "./todolists-reducer";
import {Dispatch} from "redux";
import {AppRootStateType} from "../store/store";
import {ActionsAppType, changeLoadingAC} from "./app-reducer";
import {handleErrorFromServer, handleNetworkError} from "../utils/error-utils";
import axios from "axios";


export type TaskActionsType = AddTaskAC
    | RemoveTaskAC
    | ChangeIsDoneStatusAC
    | AddNewTodoListAC
    | RemoveTodoListAC
    | SetTodoListAC
    | SetTaskAC
    | ActionsAppType

type AddTaskAC = ReturnType<typeof addTaskAC>
type RemoveTaskAC = ReturnType<typeof removeTaskAC>
type ChangeIsDoneStatusAC = ReturnType<typeof updateTaskAC>
type SetTaskAC = ReturnType<typeof setTaskAC>


export type TodoListsTasksType = {
    [key: string]: TasksType[]
}

const initialState: TodoListsTasksType = {}

export const tasksReducer = (state = initialState, action: TaskActionsType) => {
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
        case 'UPDATE-TASK':
            return {
                ...state, [action.payload.todoListId]: state[action.payload.todoListId].map(el =>
                    el.id === action.payload.taskId
                        ? {...el, ...action.payload.task}
                        : el)
            }
        case "ADD-TODOLIST":
            return {...state, [action.payload.todolist.id]: []}
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

export const updateTaskAC = (todoListId: string, taskId: string, task: TaskModelTypeForChangeApi) => {
    return {
        type: 'UPDATE-TASK',
        payload: {
            todoListId,
            taskId,
            task
        }
    } as const
}

// export const getTaskThunkCreator = (todolistId: string) => (dispatch: Dispatch) => {
//     dispatch(changeLoadingAC('loading'))
//     todolistAPI.getTasks(todolistId)
//         .then(res => {
//             dispatch(setTaskAC(todolistId, res.data.items))
//             dispatch(changeLoadingAC('success'))
//         })
//         .catch((err: AxiosError<{ message: string }>) => {
//         handleNetworkError(dispatch, err)
//     })
// }
export const getTaskThunkCreator = (todolistId: string) => async (dispatch: Dispatch) => {
    dispatch(changeLoadingAC('loading'))
    try {
        const res = await todolistAPI.getTasks(todolistId)
        dispatch(setTaskAC(todolistId, res.data.items))
        dispatch(changeLoadingAC('success'))
    } catch (e) {
        if (axios.isAxiosError<{ message: string }>(e)) {
            handleNetworkError(dispatch, e)
        }
    }
}

export const addTaskThunkCreator = (todolistId: string, title: string) => async (dispatch: Dispatch) => {
    dispatch(changeLoadingAC('loading'))
    try {
        const res = await todolistAPI.addTasks(todolistId, title)
        if (res.data.resultCode === 0) {
            dispatch(addTaskAC(todolistId, res.data.data.item))
            dispatch(changeLoadingAC('success'))
        } else {
            handleErrorFromServer(res.data, dispatch)
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            handleNetworkError(dispatch, e)
        }
    }
}

export const removeTaskThunkCreator = (todolistId: string, taskId: string) => async (dispatch: Dispatch) => {
    dispatch(changeLoadingAC('loading'))
    try {
        const res = await todolistAPI.deleteTask(todolistId, taskId)
        if (res.data.resultCode === 0) {
            dispatch(removeTaskAC(todolistId, taskId))
            dispatch(changeLoadingAC('success'))
        } else {
            handleErrorFromServer(res.data, dispatch)
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            handleNetworkError(dispatch, e)
        }
    }

}

export type TaskModelTypeForChangeApi = {
    title?: string
    description?: string | null
    deadline?: string | null
    completed?: boolean
    priority?: number
    startDate?: string | null
    status?: number
}

export const updateTaskThunkCreator = (todolistId: string, taskId: string, model: TaskModelTypeForChangeApi) => {
    return async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(changeLoadingAC('loading'))

        const task = getState().tasksReducer[todolistId].find(t => t.id === taskId)

        if (task) {
            const modelTask: TaskTypeForChangeApi = {
                title: task.title,
                status: task.status,
                deadline: task.deadline,
                priority: task.priority,
                startDate: task.startDate,
                description: task.description,
                completed: task.completed,
                ...model
            }

            try {
                const res = await todolistAPI.updateTask(todolistId, taskId, modelTask)
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(todolistId, taskId, model))
                } else {
                    handleErrorFromServer(res.data, dispatch)
                }

            } catch (err) {
                if (axios.isAxiosError(err)) {
                    const error = err.response ? err.response.data.message : err.message
                    handleNetworkError(dispatch, {message: error}) //обернул в объект т.к. принимаю в утилс объект,
                    // можно было принимать строку, тогда и передаю тоже просто строку
                }
            }
        }
    }
}
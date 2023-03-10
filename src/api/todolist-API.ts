import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        "API-KEY": "c86fcc47-e583-4484-828e-83b5a5d8bf0d",
    }
})
//типизация тудулистов из API
export type GetTodoType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type PostUpdateDeleteTodoType<D> = {
    resultCode: number
    messages: string[]
    data: D
}

//enum для тасок status и priority

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

//типизация тасок из API
export type TasksType = {
    addedDate: string
    deadline: string | null
    description: string | null
    completed: boolean
    id: string
    order: number
    priority: TaskPriorities
    startDate: string | null
    status: TaskStatuses
    title : string
    todoListId: string
}

type GetTasksType = {
    items: TasksType[]
    totalCount: number
    error: string | null
}

export type DeletePostTasksType<T> = {
    data: T
    messages: string[] | []
    resultCode: number
}

export type PostTaskType = {
    title: string
    description: string | null
    deadline: string | null
    completed: boolean
    priority: number
    startDate: string | null
    status: number
}

export const todolistAPI = {
    getTodoList: () => {
        return instance.get<GetTodoType[]>(``)
    },
    createTodoList: (title: string) => {
        return instance.post<PostUpdateDeleteTodoType<{ item: GetTodoType }>>('', {title})
    },
    deleteTodoList: (todolistId: string) => {
        return instance.delete<PostUpdateDeleteTodoType<{}>>(`${todolistId}`)
    },
    updateTodoList: (todolistId: string, title: string) => {
        return instance.put<PostUpdateDeleteTodoType<{}>>(`${todolistId}`, {title})
    },
    getTasks: (todoListId: string) => {
        return instance.get<GetTasksType>(`${todoListId}/tasks`)
    },
    addTasks: (todoListId: string, title: string) => {
        return instance.post<DeletePostTasksType<{item: TasksType}>>(`${todoListId}/tasks`, {title}).then(res => res.data)
    },
    deleteTask: (todolistId: string, taskId: string) => {
        return instance.delete<DeletePostTasksType<{}>>(`${todolistId}/tasks/${taskId}`)
    },
    updateTask: (todolistId: string, taskId: string, task: PostTaskType) => {
        return instance.put<DeletePostTasksType<{item: TasksType}>>(`${todolistId}/tasks/${taskId}`, task).then(res => res.data)
    },
}
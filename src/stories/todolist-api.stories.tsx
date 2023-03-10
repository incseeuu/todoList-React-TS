import React, {useEffect, useState} from 'react';
import axios from "axios";
import {DeletePostTasksType, GetTodoType, PostUpdateDeleteTodoType, TasksType, todolistAPI} from "../api/todolist-API";

export default {
    title: 'TODOLIST/api'
}

let idTodoList: string = ''
let taskId: string = ''



export const GetTodoLists = () => {

    const [state, setState] = useState<GetTodoType[]>()

    useEffect(() => {

        todolistAPI.getTodoList()
            .then(res => {
            setState(res.data)
                idTodoList = res.data[0].id
        })


    }, [])

    return <div>Hey its response: {JSON.stringify(state)}</div>
}

export const PostTodoLists = () => {

    const [state, setState] = useState<GetTodoType | null>(null)

    useEffect(() => {

            todolistAPI.createTodoList('Hey, its new todo')
            .then(res => {
                setState(res.data.data.item)
            })

    }, [])

    return <div>Hey its response: {JSON.stringify(state)}</div>
}

export const DeleteTodoLists = () => {

    const [state, setState] = useState<PostUpdateDeleteTodoType<{}> | null>(null)

    useEffect(() => {

        todolistAPI.deleteTodoList(idTodoList)
            .then(res => {
                setState(res.data)
            })

    }, [])

    return <div>Hey its response: {JSON.stringify(state)}</div>
}

export const UpdateTodoLists = () => {

    const [state, setState] = useState<PostUpdateDeleteTodoType<{}> | null>(null)

    useEffect(() => {

        todolistAPI.updateTodoList(idTodoList, 'AEOEOE')
        .then(res => {
                setState(res.data)
            })

    }, [])

    return <div>Hey its response: {JSON.stringify(state)}</div>
}

export const GetTasks = () => {

    const [state, setState] = useState<TasksType[]>()

    useEffect(() => {

        todolistAPI.getTasks(idTodoList)
            .then(res => {
                setState(res.data.items)
                taskId = res.data.items[0].id
            })


    }, [])

    return <div>Hey its response: {JSON.stringify(state)}</div>
}

export const PostTasks = () => {

    const [state, setState] = useState<TasksType | null>(null)

    useEffect(() => {

        todolistAPI.addTasks(idTodoList, 'AEOEOOEEO')
            .then(res => {
                setState(res.data.item)
                console.log(res.data)
            })

    }, [])

    return <div>Hey its response: {JSON.stringify(state)}</div>
}

export const DeleteTasks = () => {

    const [state, setState] = useState<DeletePostTasksType<{}> | null>(null)

    useEffect(() => {

        todolistAPI.deleteTask(idTodoList, taskId)
            .then(res => {
                setState(res.data)
            })

    }, [])

    return <div>Hey its response: {JSON.stringify(state)}</div>
}

export const UpdateTasks = () => {

    const [state, setState] = useState<DeletePostTasksType<{}> | null>(null)

    let task = {
        title: 'AEOEOEO',
        description: 'Have a nice day',
        status: 1,
        priority: 1,
        completed: false,
        startDate: new Date().toLocaleString(),
        deadline: null
    }

    useEffect(() => {

        todolistAPI.updateTask(idTodoList, taskId, task)
            .then(res => {
                setState(res)
            })

    }, [])

    return <div>Hey its response: {JSON.stringify(state)}</div>
}



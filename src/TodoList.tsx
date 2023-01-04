import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterTasksType} from "./App";
import './App.css';

type ListPropsType = {
    title: string
    tasks: Array<TasksType>
    todoListId: string
    filterTasks: string
    removeTask: (todoListId: string,taskId: string) => void
    filterButton: (todoListId: string,element: FilterTasksType) => void
    addTask: (todoListId:string, title: string) => void
    changeIsDoneStatus: (todoListId:string ,taskId: string, checked: boolean) => void
    deleteTodoList: (todoListId: string) => void
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList = (props: ListPropsType) => {

    const [localStateForNewTask, setLocalStateForNewTask] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onChangeInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setLocalStateForNewTask(event.currentTarget.value)
        setError(null)
    }

    const onChangeTaskStatusHandler = (checked: boolean, el: string) => {
        props.changeIsDoneStatus(props.todoListId,el, checked)
    }

    const onClickButtonHandler = () => {
        if(localStateForNewTask.trim() === ''){
            setError('Failed, please write something')
            setLocalStateForNewTask('')
            return
        }
        props.addTask(props.todoListId,localStateForNewTask.trim())
        setLocalStateForNewTask('')
        setError(null)
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => event.key === "Enter" && onClickButtonHandler()

    // const onClickSetAllFilter = () => props.filterButton("All")
    // const onClickSetActiveFilter = () => props.filterButton("Active")
    // const onClickSetCompletedFilter = () => props.filterButton("Completed")

    const takeOnClickFilterHandler = (filter: FilterTasksType) => () => props.filterButton(props.todoListId, filter)

    const deleteTodoListHandler = () => {
        props.deleteTodoList(props.todoListId)
    }

    const TasksItems = props.tasks.length ?
        props.tasks.map((el: TasksType) => {

            const onClickDeleteHandler = () => props.removeTask(props.todoListId, el.id)
            const onChangeTaskStatusMap = (event: ChangeEvent<HTMLInputElement>) => onChangeTaskStatusHandler(event.currentTarget.checked, el.id)

            return <li className={el.isDone ? 'is-done' : ''} key={el.id}>
                <input onChange={onChangeTaskStatusMap} type="checkbox" checked={el.isDone}/>
                <span>{el.title}</span>
                <button onClick={onClickDeleteHandler}>x</button>
            </li>
        })
        :
        <span>List is empty</span>


    return (
        <div>
            <span style={{display: "flex", alignItems: "center"}}>
                <h3>{props.title}</h3>
                <button onClick={deleteTodoListHandler}>x</button>
            </span>

            <div>
                <input
                    className={ error ? 'error' : ''}
                    value={localStateForNewTask}
                    onChange={onChangeInputValueHandler}
                    onKeyDown={onKeyDownHandler}
                />
                <button onClick={onClickButtonHandler}>+</button>
            </div>
            {error && <div className={'error-message'}>{error}</div>}
            <ul>
                {TasksItems}
            </ul>
            <div>
                <button className={props.filterTasks === 'All' ? 'active-filter': ''} onClick={takeOnClickFilterHandler('All')}>All</button>
                <button className={props.filterTasks === 'Active' ? 'active-filter': ''} onClick={takeOnClickFilterHandler('Active')}>Active</button>
                <button className={props.filterTasks === 'Completed' ? 'active-filter': ''} onClick={takeOnClickFilterHandler('Completed')}>Completed</button>
            </div>
        </div>
    )
}
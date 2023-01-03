import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterTasksType} from "./App";
import './App.css';

type ListPropsType = {
    title: string
    tasks: Array<TasksType>
    filterTasks: string
    removeTask: (taskId: string) => void
    filterButton: (element: FilterTasksType) => void
    addTask: (title: string) => void
    changeIsDoneStatus: (taskId: string, checked: boolean) => void
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
        props.changeIsDoneStatus(el, checked)
    }

    const onClickButtonHandler = () => {
        if(localStateForNewTask.trim() === ''){
            setError('Failed, please write something')
            setLocalStateForNewTask('')
            return
        }
        props.addTask(localStateForNewTask.trim())
        setLocalStateForNewTask('')
        setError(null)
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => event.key === "Enter" && onClickButtonHandler()

    // const onClickSetAllFilter = () => props.filterButton("All")
    // const onClickSetActiveFilter = () => props.filterButton("Active")
    // const onClickSetCompletedFilter = () => props.filterButton("Completed")

    const takeOnClickFilterHandler = (filter: FilterTasksType) => () => props.filterButton(filter)

    const TasksItems = props.tasks.length ?
        props.tasks.map((el: TasksType) => {

            const onClickDeleteHandler = () => props.removeTask(el.id)
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
            <h3>{props.title}</h3>
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
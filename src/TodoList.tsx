import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterTasksType} from "./App";
import './App.css';
import UltraInput from "./ultraComponents/UltraInput";
import UltraSpanForChangeValue from "./ultraComponents/UltraSpanForChangeValue";

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
    updateTasks: (todoListId:string, tasksId:string, newValue: string) => void
    updateTodolistsTitle: (todoListId:string, newValue: string) => void
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList = (props: ListPropsType) => {

    const onChangeTaskStatusHandler = (checked: boolean, el: string) => {
        props.changeIsDoneStatus(props.todoListId,el, checked)
    }

    const takeOnClickFilterHandler = (filter: FilterTasksType) => () => props.filterButton(props.todoListId, filter)

    const deleteTodoListHandler = () => {
        props.deleteTodoList(props.todoListId)
    }

    const updateTodolistsTitleCallBack = (newValue: string) => {
        props.updateTodolistsTitle(props.todoListId, newValue)
    }

    const addTask = (newValue: string) => {
        props.addTask(props.todoListId, newValue)
    }

    const changeTaskTitleForMap = (elId: string, newValue: string) => {
        props.updateTasks(props.todoListId, elId, newValue)
    }

    const TasksItems = props.tasks.length ?
        props.tasks.map((el: TasksType) => {

            const onClickDeleteHandler = () => props.removeTask(props.todoListId, el.id)
            const onChangeTaskStatusMap = (event: ChangeEvent<HTMLInputElement>) => onChangeTaskStatusHandler(event.currentTarget.checked, el.id)
            const changeTasksTitle = (newValue: string) => {
                changeTaskTitleForMap(el.id,newValue)
            }


            return <li className={el.isDone ? 'is-done' : ''} key={el.id}>
                <input onChange={onChangeTaskStatusMap} type="checkbox" checked={el.isDone}/>
                <UltraSpanForChangeValue oldTitle={el.title} callBack={changeTasksTitle}/>
                <button onClick={onClickDeleteHandler}>x</button>
            </li>
        })
        :
        <span>List is empty</span>


    return (
        <div>
            <span style={{display: "flex", alignItems: "center"}}>
                <h3>
                    <UltraSpanForChangeValue oldTitle={props.title} callBack={updateTodolistsTitleCallBack}/>
                </h3>
                <button onClick={deleteTodoListHandler}>x</button>
            </span>

            <div>
                <UltraInput callback={addTask} />
            </div>

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
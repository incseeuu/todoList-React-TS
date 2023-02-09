import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterTasksType} from "./App";
import './App.css';
import UltraInput from "./ultraComponents/UltraInput";
import UltraSpanForChangeValue from "./ultraComponents/UltraSpanForChangeValue";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

type ListPropsType = {
    title: string
    tasks: Array<TasksType>
    todoListId: string
    filterTasks: string
    removeTask: (todoListId: string, taskId: string) => void
    filterButton: (todoListId: string, element: FilterTasksType) => void
    addTask: (todoListId: string, title: string) => void
    changeIsDoneStatus: (todoListId: string, taskId: string, checked: boolean) => void
    deleteTodoList: (todoListId: string) => void
    updateTasks: (todoListId: string, tasksId: string, newValue: string) => void
    updateTodoListsTitle: (todoListId: string, newValue: string) => void
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList = (props: ListPropsType) => {

    const onChangeTaskStatusHandler = (checked: boolean, el: string) => {
        props.changeIsDoneStatus(props.todoListId, el, checked)
    }

    const takeOnClickFilterHandler = (filter: FilterTasksType) => () => props.filterButton(props.todoListId, filter)

    const deleteTodoListHandler = () => {
        props.deleteTodoList(props.todoListId)
    }

    const updateTodolistsTitleCallBack = (newValue: string) => {
        props.updateTodoListsTitle(props.todoListId, newValue)
    }

    const addTask = (newValue: string) => {
        props.addTask(props.todoListId, newValue)
    }

    const changeTaskTitleForMap = (elId: string, newValue: string) => {
        props.updateTasks(props.todoListId, elId, newValue)
    }

    const TasksItems = props.tasks && props.tasks.length ?
        props.tasks.map((el: TasksType) => {

            const onClickDeleteHandler = () => props.removeTask(props.todoListId, el.id)
            const onChangeTaskStatusMap = (event: ChangeEvent<HTMLInputElement>) => onChangeTaskStatusHandler(event.currentTarget.checked, el.id)
            const changeTasksTitle = (newValue: string) => {
                changeTaskTitleForMap(el.id, newValue)
            }


            return <li className={el.isDone ? 'is-done' : ''} key={el.id}>
                <Checkbox  onChange={onChangeTaskStatusMap} checked={el.isDone} color="secondary" />
                <UltraSpanForChangeValue oldTitle={el.title} callBack={changeTasksTitle}/>
                <IconButton aria-label="delete" onClick={onClickDeleteHandler}>
                    <DeleteIcon/>
                </IconButton>
            </li>
        })
        :
        <span>List is empty</span>


    return (
        <div >
            <span style={{display: "flex", alignItems: "center", justifyContent: 'center'}}>
                <h3>
                    <UltraSpanForChangeValue oldTitle={props.title} callBack={updateTodolistsTitleCallBack}/>
                </h3>
                {/*<button onClick={deleteTodoListHandler}>x</button>*/}
                <IconButton aria-label="delete" onClick={deleteTodoListHandler}>
                    <DeleteIcon/>
                </IconButton>
            </span>

            <div>
                <UltraInput callback={addTask}/>
            </div>

            <ul>
                {TasksItems}
            </ul>
            <div>
                <Button variant={props.filterTasks === 'All' ? 'contained' : "outlined"} color="secondary"
                        onClick={takeOnClickFilterHandler('All')}>All</Button>
                <Button variant={props.filterTasks === 'Active' ? 'contained' : "outlined"} color="success"
                        onClick={takeOnClickFilterHandler('Active')}>Active</Button>
                <Button variant={props.filterTasks === 'Completed' ? 'contained' : "outlined"} color="error"
                        onClick={takeOnClickFilterHandler('Completed')}>Completed</Button>
            </div>
        </div>
    )
}
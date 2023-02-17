import React, {ChangeEvent, useCallback} from 'react';
import Checkbox from "@mui/material/Checkbox";
import UltraSpanForChangeValue from "./ultraComponents/UltraSpanForChangeValue";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {changeIsDoneStatusAC, removeTaskAC, updateTitleTasksAC} from "./reducers/tasks-reducer";
import {useDispatch} from "react-redux";

type PropsType = {
    todoListId: string
    taskId: string
    isDone: boolean
    title: string
}

const Task: React.FC<PropsType> = (
    {todoListId, taskId,isDone, title}
) => {

    const dispatch = useDispatch()

    const changeTaskTitle = useCallback((taskId: string, newValue: string) => {
        dispatch(updateTitleTasksAC(todoListId, taskId, newValue))
    }, [todoListId])

    const onChangeTaskStatusHandler = (checked: boolean, value: string) => {
        dispatch(changeIsDoneStatusAC(todoListId, value, checked))
    }

    const onClickDeleteHandler = () => dispatch(removeTaskAC(todoListId, taskId))
    const onChangeTaskStatusMap = (event: ChangeEvent<HTMLInputElement>) => onChangeTaskStatusHandler(event.currentTarget.checked, taskId)
    const changeTasksTitle = useCallback((newValue: string) => {
        changeTaskTitle(taskId, newValue)
    }, [taskId])

    return (
        <li className={isDone ? 'is-done' : ''} key={taskId}>
            <Checkbox  onChange={onChangeTaskStatusMap} checked={isDone} color="secondary" />
            <UltraSpanForChangeValue oldTitle={title} callBack={changeTasksTitle}/>
            <IconButton aria-label="delete" onClick={onClickDeleteHandler}>
                <DeleteIcon/>
            </IconButton>
        </li>
    );
};

export default Task;
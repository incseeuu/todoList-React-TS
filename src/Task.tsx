import React, {ChangeEvent, useCallback} from 'react';
import Checkbox from "@mui/material/Checkbox";
import UltraSpanForChangeValue from "./ultraComponents/UltraSpanForChangeValue";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    changeIsDoneStatusAC,
    removeTaskAC,
    removeTaskThunkCreator,
    updateTaskThunkCreator,
    updateTitleTasksAC
} from "./reducers/tasks-reducer";
import {useDispatch} from "react-redux";
import {TaskStatuses} from "./api/todolist-API";
import {useAppDispatch} from "./store/store";

type PropsType = {
    todoListId: string
    taskId: string
    status: TaskStatuses
    title: string
}

const Task: React.FC<PropsType> = (
    {todoListId, taskId,status, title}
) => {

    const dispatch = useAppDispatch()

    const changeTaskTitle = useCallback((taskId: string, newValue: string) => {
        dispatch(updateTitleTasksAC(todoListId, taskId, newValue))
    }, [todoListId])

    const onChangeTaskStatusHandler = (checked: boolean, taskId: string) => {
        let status: TaskStatuses = checked ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(updateTaskThunkCreator(todoListId, taskId, status))

    }

    const onClickDeleteHandler = () => dispatch(removeTaskThunkCreator(todoListId, taskId))

    const onChangeTaskStatusMap = (event: ChangeEvent<HTMLInputElement>) => onChangeTaskStatusHandler(event.currentTarget.checked, taskId)

    const changeTasksTitle = useCallback((newValue: string) => {
        changeTaskTitle(taskId, newValue)
    }, [taskId])

    return (
        <li className={status === TaskStatuses.Completed ? 'is-done' : ''} key={taskId}>
            <Checkbox  onChange={onChangeTaskStatusMap} checked={status === TaskStatuses.Completed} color="secondary" />
            <UltraSpanForChangeValue oldTitle={title} callBack={changeTasksTitle}/>
            <IconButton aria-label="delete" onClick={onClickDeleteHandler}>
                <DeleteIcon/>
            </IconButton>
        </li>
    );
};

export default Task;
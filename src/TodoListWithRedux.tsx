import React, {ChangeEvent, memo, useCallback, useMemo} from "react";
import {FilterTasksType} from "./App";
import './App.css';
import UltraInput from "./ultraComponents/UltraInput";
import UltraSpanForChangeValue from "./ultraComponents/UltraSpanForChangeValue";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import {TodoListType} from "./AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {addTaskAC, changeIsDoneStatusAC, removeTaskAC, updateTitleTasksAC} from "./reducers/tasks-reducer";
import {changeFilterTasksAC, removeTodoListAC, updateTodoListsTitleAC} from "./reducers/todolists-reducer";
import Task from "./Task";
import MUButtonMemo from "./components/MUButtonMemo";
import task from "./Task";

type PropsType = {
    todoList: TodoListType
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoListWithRedux = memo(({todoList}: PropsType) => {
    const {id, title, filter} = todoList

    const tasks = useSelector<AppRootStateType, TasksType[]>(state => state.tasksReducer[id])

    const dispatch = useDispatch()

    const takeOnClickFilterHandler = useCallback((filter: FilterTasksType) => {
        dispatch(changeFilterTasksAC(id, filter))
    }, [])


    const updateTodolistsTitleCallBack = useCallback((newValue: string) => {
        dispatch(updateTodoListsTitleAC(id, newValue))
    }, [id])

    const addTask = useCallback((newValue: string) => {
        dispatch(addTaskAC(id, newValue))
    }, [id])

    const deleteTodoListHandler = () => {
        dispatch(removeTodoListAC(id))
    }

    const getFilteredTasksForRender = useMemo(() => {
        switch (filter) {
            case "Active":
                return tasks.filter((el) => !el.isDone)
            case "Completed":
                return tasks.filter((el) => el.isDone)
            default:
                return tasks;
        }
        return tasks
    }, [tasks, filter])

    const TasksItems = getFilteredTasksForRender.length
        ? getFilteredTasksForRender.map((el: TasksType) => {
            return <Task
                key={el.id}
                todoListId={id}
                taskId={el.id}
                isDone={el.isDone}
                title={el.title}
            />
        })
        : <span>List is empty</span>


    return (
        <div>
            <span style={{display: "flex", alignItems: "center", justifyContent: 'center'}}>
                <h3>
                    <UltraSpanForChangeValue oldTitle={title} callBack={updateTodolistsTitleCallBack}/>
                </h3>
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
                <MUButtonMemo value={'All'} filter={filter} takeOnClickFilterHandlerCallBack={takeOnClickFilterHandler} />
                <MUButtonMemo value={'Active'} filter={filter} takeOnClickFilterHandlerCallBack={takeOnClickFilterHandler} />
                <MUButtonMemo value={'Completed'} filter={filter} takeOnClickFilterHandlerCallBack={takeOnClickFilterHandler} />
            </div>
        </div>
    )
})
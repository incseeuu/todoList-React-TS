import React, {memo, useCallback, useEffect, useMemo} from "react";

import './App.css';
import UltraInput from "./ultraComponents/UltraInput";
import UltraSpanForChangeValue from "./ultraComponents/UltraSpanForChangeValue";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch, useAppSelector} from "./store/store";
import {addTaskAC, addTaskThunkCreator, getTaskThunkCreator} from "./reducers/tasks-reducer";
import {
    changeFilterTasksAC,
    FilterTasksType,
    removeTodoListAC,
    TodoListEntityType,
    updateTodoListsTitleAC
} from "./reducers/todolists-reducer";
import Task from "./Task";
import MUButtonMemo from "./components/MUButtonMemo";
import {TaskStatuses, TasksType} from "./api/todolist-API";

type PropsType = {
    todoList: TodoListEntityType
}


export const TodoListWithRedux = memo(({todoList}: PropsType) => {
    const {id, title, filter} = todoList



    const tasks = useAppSelector<TasksType[]>(state => state.tasksReducer[id])

    const dispatch = useAppDispatch()
    useEffect( () => {
        dispatch(getTaskThunkCreator(id))
    },[])

    const takeOnClickFilterHandler = useCallback((filter: FilterTasksType) => {
        dispatch(changeFilterTasksAC(id, filter))
    }, [])


    const updateTodolistsTitleCallBack = useCallback((newValue: string) => {
        dispatch(updateTodoListsTitleAC(id, newValue))
    }, [id])

    const addTask = useCallback((newValue: string) => {
        dispatch(addTaskThunkCreator(id,newValue))
    }, [id])

    const deleteTodoListHandler = () => {
        dispatch(removeTodoListAC(id))
    }

    const getFilteredTasksForRender = useMemo(() => {
        switch (filter) {
            case "Active":
                return tasks.filter((el) => el.status === TaskStatuses.New)
            case "Completed":
                return tasks.filter((el) => el.status === TaskStatuses.Completed)
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
                status={el.status}
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
import React, {memo, useCallback, useEffect, useMemo} from "react";

import './App.css';
import UltraInput from "./ultraComponents/UltraInput";
import UltraSpanForChangeValue from "./ultraComponents/UltraSpanForChangeValue";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {useAppDispatch, useAppSelector} from "./store/store";
import {addTaskThunkCreator, getTaskThunkCreator} from "./reducers/tasks-reducer";
import {
    changeFilterTasksAC,
    deleteTodoListThunkCreator,
    FilterTasksType,
    TodoListEntityType,
    updateTodoListThunkCreator
} from "./reducers/todolists-reducer";
import Task from "./Task";
import MUButtonMemo from "./components/MUButtonMemo";
import {TaskStatuses, TasksType} from "./api/todolist-API";

type PropsType = {
    todoList: TodoListEntityType
}


export const TodoListWithRedux = memo(({todoList}: PropsType) => {
    const {id, title, filter, queryStatus} = todoList



    const tasks = useAppSelector<TasksType[]>(state => state.tasksReducer[id])

    const dispatch = useAppDispatch()
    useEffect( () => {
        dispatch(getTaskThunkCreator(id))
    },[])

    const takeOnClickFilterHandler = useCallback((filter: FilterTasksType) => {
        dispatch(changeFilterTasksAC(id, filter))
    }, [])


    const updateTodolistsTitleCallBack = useCallback((newValue: string) => {
        dispatch(updateTodoListThunkCreator(id, newValue))
    }, [id])

    const addTask = useCallback((newValue: string) => {
        dispatch(addTaskThunkCreator(id,newValue))
    }, [id])

    const deleteTodoListHandler = () => {
        dispatch(deleteTodoListThunkCreator(id))
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
                    <UltraSpanForChangeValue disable={queryStatus === 'inProgress'} oldTitle={title} callBack={updateTodolistsTitleCallBack}/>
                </h3>
                <IconButton disabled={queryStatus === 'inProgress'} aria-label="delete" onClick={deleteTodoListHandler}>
                    <DeleteIcon/>
                </IconButton>
            </span>

            <div>
                <UltraInput disable={queryStatus === 'inProgress'} callback={addTask}/>
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
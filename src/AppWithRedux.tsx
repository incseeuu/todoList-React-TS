import React, {useCallback} from 'react';
import './App.css';
import {TasksType} from "./TodoList";
import UltraInput from "./ultraComponents/UltraInput";
import ButtonAppBar from "./components/Header";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {addNewTodoListAC} from "./reducers/todolists-reducer";

import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TodoListWithRedux} from "./TodoListWithRedux";


export type FilterTasksType = "All" | "Active" | "Completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterTasksType
}


export type TodoListsTasksType = {
    [key: string]: TasksType[]
}

function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todoListsReducer)

    const dispatch = useDispatch()

    const addNewTodoList = useCallback((newValue: string) => {
        let action = addNewTodoListAC(newValue)
        dispatch(action)
    }, [dispatch])



    return (
        <div className="App">
            <ButtonAppBar/>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px'}}> ADD NEW
                TODOLIST
                <div style={{display: "flex", marginTop: "5px", marginBottom: '10px'}}>
                    <UltraInput callback={addNewTodoList}/>
                </div>
            </div>
            <Grid container spacing={4} direction="row"
                  justifyContent="center"
                  alignItems="center">
                {todoLists.map(el => {



                    return (
                        <Grid key={el.id} item >
                            <Paper elevation={12}>
                                <TodoListWithRedux
                                    key={el.id}
                                    todoList={el}
                                />
                            </Paper>
                        </Grid>

                    )
                })}
            </Grid>
        </div>
    )
        ;
}

export default AppWithRedux;

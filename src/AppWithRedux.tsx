import React, {useCallback, useEffect} from 'react';
import './App.css';
import UltraInput from "./ultraComponents/UltraInput";
import ButtonAppBar from "./components/Header";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    addTodoListThunkCreator,
    addNewTodoListAC,
    getTodoListThunkCreator,
    TodoListEntityType
} from "./reducers/todolists-reducer";
import {useAppDispatch, useAppSelector} from "./store/store";
import {TodoListWithRedux} from "./TodoListWithRedux";


function AppWithRedux() {

    const todoLists = useAppSelector<TodoListEntityType[]>(state => state.todoListsReducer)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTodoListThunkCreator())
    }, [])

    const addNewTodoList = useCallback((newValue: string) => {
        // let action = addNewTodoListAC(newValue)
        dispatch(addTodoListThunkCreator(newValue))
    }, [])



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

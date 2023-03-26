import React, {useCallback, useEffect} from 'react';
import './App.css';
import UltraInput from "./ultraComponents/UltraInput";
import ButtonAppBar from "./components/Header";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {addTodoListThunkCreator, getTodoListThunkCreator, TodoListEntityType} from "./reducers/todolists-reducer";
import {useAppDispatch, useAppSelector} from "./store/store";
import {TodoListWithRedux} from "./TodoListWithRedux";
import LinearProgress from '@mui/material/LinearProgress';
import {LoadingType} from "./reducers/app-reducer";
import Error from "./components/Error";
import {AuthStateType, checkLoggedTC} from "./features/Login/auth-reducer";
import {Navigate} from "react-router-dom";
import Loader from './components/Loader/Loader';


function AppWithRedux() {

    const todoLists = useAppSelector<TodoListEntityType[]>(state => state.todoListsReducer)
    const loading = useAppSelector<LoadingType>(state => state.appReducer.loading)
    const isInitialized = useAppSelector(state => state.authReducer.isInitialized)
    const isLoggedIn = useAppSelector(state => state.authReducer.isLoggedIn)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if(isLoggedIn){
            dispatch(getTodoListThunkCreator())
        } else {
            dispatch(checkLoggedTC())
        }


    }, [])

    const addNewTodoList = useCallback((newValue: string) => {
        // let action = addNewTodoListAC(newValue)
        dispatch(addTodoListThunkCreator(newValue))
    }, [])


    if(!isLoggedIn){
        return <Navigate to={'/login'}/>
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            {loading === 'loading' && <LinearProgress color="secondary"/>}
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
                        <Grid key={el.id} item>
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
            <Error/>
        </div>
    );
}

export default AppWithRedux;

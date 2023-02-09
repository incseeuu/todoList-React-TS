import React, {useReducer, useState} from 'react';
import './App.css';
import {TasksType, TodoList} from "./TodoList";
import {v1} from "uuid";
import UltraInput from "./ultraComponents/UltraInput";
import ButtonAppBar from "./components/Header";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    addNewTodoListAC,
    changeFilterTasksAC,
    removeTodoListAC,
    todoListsReducer,
    updateTodoListsTitleAC
} from "./reducers/todolists-reducer";
import {
    addTaskAC,
    changeIsDoneStatusAC,
    removeTaskAC,
    tasksReducer,
    updateTitleTasksAC
} from "./reducers/tasks-reducer";


export type FilterTasksType = "All" | "Active" | "Completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterTasksType
}


export type TodoListsTasksType = {
    [key: string]: TasksType[]
}

function App() {

    const todolistID1 = v1()
    const todolistID2 = v1()

    let [todoLists, dispatchTodoLists] = useReducer(todoListsReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ])

    let [firstListTasks, dispatchFirstListTasks] = useReducer(tasksReducer,{
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    console.log(firstListTasks)

    //ТАСКИ

    const removeTask = (todoListId: string, taskId: string) => {
        // setFirstListTasks({...firstListTasks, [todoListId]: firstListTasks[todoListId].filter(el => el.id !== taskId)})
        dispatchFirstListTasks(removeTaskAC(todoListId, taskId))
    }

    const changeIsDoneStatus = (todoListId: string, taskId: string, checked: boolean) => {
        // setFirstListTasks({
        //     ...firstListTasks,
        //     [todoListId]: firstListTasks[todoListId].map(el => el.id === taskId ? {...el, isDone: checked} : el)
        // })
        dispatchFirstListTasks(changeIsDoneStatusAC(todoListId, taskId, checked))
    }

    const updateTitleTasks = (todoListId: string, tasksId: string, newValue: string) => {
        // setFirstListTasks({
        //     ...firstListTasks,
        //     [todoListId]: firstListTasks[todoListId].map(el => el.id === tasksId ? {...el, title: newValue} : el)
        // })
        dispatchFirstListTasks(updateTitleTasksAC(todoListId, tasksId, newValue))
    }

    const addTask = (todoListId: string, value: string) => {
        // const newTask = {id: v1(), title: name, isDone: false}
        // setFirstListTasks({...firstListTasks, [todoListId]: [newTask, ...firstListTasks[todoListId]]})
        dispatchFirstListTasks(addTaskAC(todoListId, value))
    }

    //ТУДУ-ЛИСТЫ

    const changeFilterTasks = (todoListId: string, value: FilterTasksType) => {
        // setTodolists(todoLists.map(el => el.id === todoListId ? {...el, filter: value} : el))
        dispatchTodoLists(changeFilterTasksAC(todoListId, value))
    }

    const removeTodoList = (todoListId: string) => {
        // setTodolists(todoLists.filter(el => el.id !== todoListId))
        let action = removeTodoListAC(todoListId)
        dispatchTodoLists(action)
        dispatchFirstListTasks(action)
    }

    const addNewTodoList = (newValue: string) => {
        // const idForNewTodoList = v1()
        // let newTodoList: TodoListType = {id: idForNewTodoList, title: newValue, filter: 'All'}
        // setTodolists([newTodoList, ...todoLists])
        // setFirstListTasks({...firstListTasks, [idForNewTodoList]: []})
        let action = addNewTodoListAC(newValue)
        dispatchTodoLists(action)
        dispatchFirstListTasks(action)
    }

    const updateTodoListsTitle = (todoListId: string, newValue: string) => {
        // setTodolists(todoLists.map(el => el.id === todoListId ? {...el, title: newValue} : el))
        dispatchTodoLists(updateTodoListsTitleAC(todoListId, newValue))
    }

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

                    const getFilteredTasksForRender = () => {

                        switch (el.filter) {
                            case "Active":
                                return firstListTasks[el.id].filter((el) => !el.isDone)
                            case "Completed":
                                return firstListTasks[el.id].filter((el) => el.isDone)
                            default:
                                return firstListTasks[el.id];
                        }
                    }

                    return (
                        <Grid item spacing={2}>
                            <Paper elevation={12}>
                                <TodoList
                                    key={el.id}
                                    title={el.title}
                                    todoListId={el.id}
                                    tasks={getFilteredTasksForRender()}
                                    removeTask={removeTask}
                                    filterButton={changeFilterTasks}
                                    changeIsDoneStatus={changeIsDoneStatus}
                                    addTask={addTask}
                                    filterTasks={el.filter}
                                    deleteTodoList={removeTodoList}
                                    updateTasks={updateTitleTasks}
                                    updateTodoListsTitle={updateTodoListsTitle}
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

export default App;

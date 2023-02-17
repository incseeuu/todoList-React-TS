import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../reducers/tasks-reducer";
import {todoListsReducer} from "../reducers/todolists-reducer";


const rootReducer = combineReducers({
    tasksReducer,
    todoListsReducer
})

export const store = legacy_createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>
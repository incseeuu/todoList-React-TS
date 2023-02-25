import React from "react";
import {Provider} from "react-redux";
import { v1 } from "uuid";
import {store} from "./store";
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../reducers/tasks-reducer";
import {todoListsReducer} from "../reducers/todolists-reducer";

// const rootReducer = combineReducers({
//     tasksReducer,
//     todoListsReducer
// })

// const initialGlobalState = {
//     todolist: [
//         {id: 'todolistId1', title: 'What to learn', filter: 'all'},
//         {id: 'todolistId2', title: 'What to buy', filter: 'all'}
//     ],
//     tasks: {
//         ['todolistId1']: [
//             {id: v1(), title: 'HTML&CSS', isDone: true},
//             {id: v1(), title: 'JS', isDone: true}
//         ],
//         ['todolistId2']: [
//             {id: v1(), title: 'Milk', isDone: true},
//             {id: v1(), title: 'React Book', isDone: true}
//         ]
//     }
// }

// export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType )

export const ReduxStoreProviderDecoratorHOC = (storyFn: () => React.ReactNode) => {
    return <Provider store={store}>{storyFn()}</Provider>
}
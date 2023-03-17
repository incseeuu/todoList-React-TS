import { v1 } from "uuid";
import {
    addNewTodoListAC, changeFilterTasksAC,
    removeTodoListAC, setTodoListAC, TodoListEntityType,
    todoListsReducer,
    updateTodoListsTitleAC
} from "../reducers/todolists-reducer";

let todolistID1: string
let todolistID2: string

let startState: TodoListEntityType[]

beforeEach(() => {
    todolistID1 = v1()
    todolistID2 = v1()

    startState = [
        {id: todolistID1, title: 'What to learn', filter: 'All', addedDate: '', order: 0, queryStatus: 'idle'},
        {id: todolistID2, title: 'What to buy', filter: 'All', addedDate: '', order: 0, queryStatus: 'idle'},
    ]
})

test('add todolist reducer', () => {

    let newTodoListTitle = {id: todolistID1, title: 'New Todo List', filter: 'All', addedDate: '', order: 0}

    const endState = todoListsReducer(startState, addNewTodoListAC(newTodoListTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('New Todo List')
    expect(startState.length).toBe(2)
    expect(endState.map(el=> el.filter)).toStrictEqual(['All', 'All', 'All'])
    expect(endState[2].id).toBeDefined()
})

test('remove todolist reducer', () => {

    const endState = todoListsReducer(startState, removeTodoListAC(todolistID1))

    expect(endState.length).toBe(1)
    expect(endState[0].title).toBe('What to buy')
    expect(endState[0].id).toBe(todolistID2)
    expect(startState.length).toBe(2)
})

test('update todolist title', () => {

    const titleFirstTodo = 'What to couch'

    const endState = todoListsReducer(startState, updateTodoListsTitleAC(todolistID1,titleFirstTodo))

    expect(endState[0].title).toBe(titleFirstTodo)
    expect(startState[0].title).toBe('What to learn')
})

test('change todolist filter', () => {

    const endState = todoListsReducer(startState, changeFilterTasksAC(todolistID1, 'Active'))
    endState[1].filter = 'Completed'

    expect(endState[0].filter).toBe('Active')
    expect(endState[1].filter).toBe('Completed')
})

test('set todolist', () => {
    const endState = todoListsReducer(startState, setTodoListAC( [
        {id: todolistID1, title: 'Set Todo One', addedDate: '', order: 0},
        {id: todolistID2, title: 'Set Todo Two', addedDate: '', order: 0}
    ]))

    expect(endState[0].title).toBe('Set Todo One')
    expect(endState[1].filter).toBe('All')
    expect(endState.length).toBe(2)
})

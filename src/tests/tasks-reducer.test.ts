import {v1} from "uuid";
import {TodoListsTasksType} from "../App";
import {
    addTaskAC,
    changeIsDoneStatusAC,
    removeTaskAC,
    tasksReducer,
    updateTitleTasksAC
} from "../reducers/tasks-reducer";

let todolistID1: string
let todolistID2: string
let taskId: string

let startState: TodoListsTasksType;

beforeEach(() => {

    todolistID1 = v1()
    todolistID2 = v1()
    taskId = v1()

    startState = {
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: taskId, title: "JS", isDone: true},
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
    }
})

test('add new task reducer', () => {

    const newTaskTitle = 'React Native'

    const endState = tasksReducer(startState, addTaskAC(todolistID2,newTaskTitle))

    expect(endState[todolistID2].length).toBe(6)
    expect(endState[todolistID2][0].title).toBe("React Native")
    expect(endState[todolistID2][1].title).toBe("HTML&CSS2")
    expect(endState[todolistID2][5].title).toBe("GraphQL2")
    expect(endState[todolistID2][5].isDone).toBe(false)
    expect(endState[todolistID2][1].isDone).toBe(true)
    expect(endState[todolistID2][1].id).toBeDefined()
    expect(startState[todolistID2].length).toBe(5)
})

test('remove task reducer', () => {

    const endState = tasksReducer(startState, removeTaskAC(todolistID1, taskId))

    expect(endState[todolistID1].length).toBe(4)
    expect(startState[todolistID1].length).toBe(5)
    expect(endState[todolistID1][1].title).toBe('ReactJS')
})

test('change task status reducer', () => {

    const endState = tasksReducer(startState,changeIsDoneStatusAC(todolistID1,taskId, false))

    expect(endState[todolistID1][1].isDone).toBe(false)
    expect(startState[todolistID1][1].isDone).toBe(true)
})

test('change title tasks reducer', () => {

    const newTitle = 'VANILLA JS'

    const endState = tasksReducer(startState, updateTitleTasksAC(todolistID1, taskId, newTitle))

    expect(endState[todolistID1][1].title).toBe(newTitle)
    expect(startState[todolistID1][1].title).toBe('JS')
})
import {v1} from "uuid";
import {
    addTaskAC,
    updateTaskAC,
    removeTaskAC,
    tasksReducer,
    TodoListsTasksType,
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
            {id: v1(), title: "HTML&CSS", status: 2, addedDate:'',deadline:'', order: 0, completed: false, todoListId: todolistID1, startDate: '', description: '', priority: 0},
            {id: taskId, title: "JS", status: 2, addedDate:'',deadline:'', order: 0, completed: false, todoListId: todolistID1, startDate: '', description: '', priority: 0},
            {id: v1(), title: "ReactJS", status: 0, addedDate:'',deadline:'', order: 0, completed: false, todoListId: todolistID1, startDate: '', description: '', priority: 0},
            {id: v1(), title: "Rest API", status: 0, addedDate:'',deadline:'', order: 0, completed: false, todoListId: todolistID1, startDate: '', description: '', priority: 0},
            {id: v1(), title: "GraphQL", status: 0, addedDate:'',deadline:'', order: 0, completed: false, todoListId: todolistID1, startDate: '', description: '', priority: 0},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", status: 2, addedDate:'',deadline:'', order: 0, completed: false, todoListId: todolistID2, startDate: '', description: '', priority: 0},
            {id: v1(), title: "JS2", status: 2, addedDate:'',deadline:'', order: 0, completed: false, todoListId: todolistID2, startDate: '', description: '', priority: 0},
            {id: v1(), title: "ReactJS2", status: 0, addedDate:'',deadline:'', order: 0, completed: false, todoListId: todolistID2, startDate: '', description: '', priority: 0},
            {id: v1(), title: "Rest API2", status: 0, addedDate:'',deadline:'', order: 0, completed: false, todoListId: todolistID2, startDate: '', description: '', priority: 0},
            {id: v1(), title: "GraphQL2", status: 0, addedDate:'',deadline:'', order: 0, completed: false, todoListId: todolistID2, startDate: '', description: '', priority: 0},
        ]
    }
})

test('add new task reducer', () => {

    const newTask = {id: v1(), title: 'React Native', status: 2, addedDate:'',deadline:'', order: 0, completed: false, todoListId: todolistID2, startDate: '', description: '', priority: 0}

    const endState = tasksReducer(startState, addTaskAC(todolistID2,newTask))

    expect(endState[todolistID2].length).toBe(6)
    expect(endState[todolistID2][0].title).toBe("React Native")
    expect(endState[todolistID2][1].title).toBe("HTML&CSS2")
    expect(endState[todolistID2][5].title).toBe("GraphQL2")
    expect(endState[todolistID2][5].status).toBe(0)
    expect(endState[todolistID2][1].status).toBe(2)
    expect(startState[todolistID2].length).toBe(5)
})

test('remove task reducer', () => {

    const endState = tasksReducer(startState, removeTaskAC(todolistID1, taskId))

    expect(endState[todolistID1].length).toBe(4)
    expect(startState[todolistID1].length).toBe(5)
    expect(endState[todolistID1][1].title).toBe('ReactJS')
})

test('change task status reducer', () => {

    const newTask = {id: v1(), title: 'React Native', status: 2, addedDate:'',deadline:'', order: 0, completed: false, todoListId: todolistID2, startDate: '', description: '', priority: 0}


    const endState = tasksReducer(startState,updateTaskAC(todolistID1,taskId, newTask))

    expect(endState[todolistID1][1].status).toBe(0)
    expect(startState[todolistID1][1].status).toBe(2)
})

test('change title tasks reducer', () => {

    const newTitle = 'VANILLA JS'

    const endState = tasksReducer(startState, updateTaskAC(todolistID1, taskId, {title: newTitle}))

    expect(endState[todolistID1][1].title).toBe(newTitle)
    expect(startState[todolistID1][1].title).toBe('JS')
})
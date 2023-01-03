import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from "./TodoList";
import {v1} from "uuid";


export type FilterTasksType = "All" | "Active" | "Completed"

function App() {

    const [firstListTasks, setFirstListTasks] = useState<Array<TasksType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
    ])

    const [filterTasks, setFilterTasks] = useState<FilterTasksType>("All")

    const removeTask = (taskId: string) => {
        setFirstListTasks(firstListTasks.filter((e) => e.id !== taskId))
    }

    const changeFilterTasks = (element: FilterTasksType) => {
        setFilterTasks(element)
    }

    const changeIsDoneStatus = (taskId: string, checked: boolean) => {
        setFirstListTasks(firstListTasks.map(el => el.id === taskId ? {...el, isDone: checked} : el))
    }

    const addTask = (name: string) => {
        const newTask = {id: v1(), title: name, isDone: false}
        setFirstListTasks([newTask, ...firstListTasks])
    }



    const getFilteredTasksForRender = () => {
        switch (filterTasks) {
            case "Active":
                return firstListTasks.filter((el) => !el.isDone)
            case "Completed":
                return firstListTasks.filter((el) => el.isDone)
            default:
                return firstListTasks;
        }
    }

    const filteredTasksForRender: Array<TasksType> = getFilteredTasksForRender()

    return (
        <div className="App">
            <TodoList title={"What to learn"}
                      tasks={filteredTasksForRender}
                      removeTask={removeTask}
                      filterButton={changeFilterTasks}
                      changeIsDoneStatus={changeIsDoneStatus}
                      addTask={addTask}
                      filterTasks={filterTasks}
            />
        </div>
    );
}

export default App;

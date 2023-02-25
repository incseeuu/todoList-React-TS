import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Task from "../Task";
import {Provider} from "react-redux";
import {store} from "../store/store";
import {ReduxStoreProviderDecoratorHOC} from "../store/ReduxStoreProviderDecoratorHOC";


export default {
    title: 'TODOLIST/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecoratorHOC]
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskNotDoneStory = Template.bind({})

TaskNotDoneStory.args = {
    todoListId: '123',
    taskId: '1233',
    isDone: false,
    title: 'Test task for example'
}

const Template1: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskDoneStory = Template1.bind({})

TaskDoneStory.args = {
    todoListId: '123',
    taskId: '1233',
    isDone: true,
    title: 'Test task for example'
}
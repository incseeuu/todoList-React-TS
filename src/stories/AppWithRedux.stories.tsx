import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import AppWithRedux from "../AppWithRedux";
import {ReduxStoreProviderDecoratorHOC} from "../store/ReduxStoreProviderDecoratorHOC";

export default {
    title: 'TODOLIST/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecoratorHOC]
} as ComponentMeta<typeof AppWithRedux>;

const Template: ComponentStory<typeof AppWithRedux> = (args) => <AppWithRedux />;

export const AppWithReduxStory = Template.bind({})


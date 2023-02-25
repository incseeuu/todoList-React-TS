import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import AppWithRedux from "../AppWithRedux";
import {Provider} from "react-redux";
import {store} from "../store/store";
import {ReduxStoreProviderDecoratorHOC} from "../store/ReduxStoreProviderDecoratorHOC";

export default {
    title: 'TODOLIST/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecoratorHOC]
} as ComponentMeta<typeof AppWithRedux>;

const Template: ComponentStory<typeof AppWithRedux> = (args) => <AppWithRedux />;

export const AppWithReduxStory = Template.bind({})


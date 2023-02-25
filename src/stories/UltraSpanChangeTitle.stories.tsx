import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import UltraSpanForChangeValue from "../ultraComponents/UltraSpanForChangeValue";

export default {
    title: 'TODOLIST/UltraSpan',
    component: UltraSpanForChangeValue,
    argTypes: {
        callback: {
            newValue: 'newValue'
        }
    }
} as ComponentMeta<typeof UltraSpanForChangeValue>;

const Template: ComponentStory<typeof UltraSpanForChangeValue> = (args) => <UltraSpanForChangeValue {...args} />;

export const UltraSpanStory = Template.bind({})

UltraSpanStory.args = {
    oldTitle: 'Click on me for change',
    callBack: action('Title will changed')
}
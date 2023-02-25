import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import UltraInput from "../ultraComponents/UltraInput";
import {action} from "@storybook/addon-actions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default {
    title: 'TODOLIST/UltraInput',
    component: UltraInput,
    argTypes: {
        callback: {
            description: 'Button clicked inside'
        }
    }
} as ComponentMeta<typeof UltraInput>;

const Template: ComponentStory<typeof UltraInput> = (args) => <UltraInput {...args} />;

export const UltraInputStory = Template.bind({})

UltraInputStory.args = {
    callback: action('Button clicked inside form')
}

const Template1: ComponentStory<typeof UltraInput> = (args) => {

    const [newValue, setNewValue] = useState<string>('')

    const [error, setError] = useState<string | null>('Failed, please write something')

    const onChangeInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewValue(event.currentTarget.value)
        setError(null)
    }

    const onClickButtonHandler = () => {
        if(newValue.trim() === ''){
            setError('Failed, please write something')
            setNewValue('')
            return
        }
        args.callback(newValue.trim())
        setNewValue('')
        setError(null)
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => event.key === "Enter" && onClickButtonHandler()

    return (
        <>
            <TextField id="outlined-basic" size="small"
                       label={error ? 'Failed, please write something' : 'Write something'}
                       variant="outlined"
                       error={!!error}
                       value={newValue}
                       onChange={onChangeInputValueHandler}
                       onKeyDown={onKeyDownHandler}/>
            <Button size="medium" variant="contained" onClick={onClickButtonHandler}>+</Button>
        </>
    )
};

export const UltraInputStoryWithError = Template1.bind({})

UltraInputStoryWithError.args = {
    callback: action('Button clicked inside form')
}
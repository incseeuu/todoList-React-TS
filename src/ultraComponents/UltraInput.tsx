import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type TypeProps = {
    callback: (newValue: string) => void
}

const UltraInput = memo((props: TypeProps) => {

    const [newValue, setNewValue] = useState<string>('')

    const [error, setError] = useState<string | null>(null)

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
        props.callback(newValue.trim())
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
})

export default UltraInput;
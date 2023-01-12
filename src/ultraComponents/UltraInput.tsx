import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type TypeProps = {
    callback: (newValue: string) => void
}

const UltraInput = (props: TypeProps) => {
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
            <input
                className={ error ? 'error' : ''}
                value={newValue}
                onChange={onChangeInputValueHandler}
                onKeyDown={onKeyDownHandler}
            />
            <button onClick={onClickButtonHandler}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </>
    )
}

export default UltraInput;
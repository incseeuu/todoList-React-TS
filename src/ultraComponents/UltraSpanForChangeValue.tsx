import React, {ChangeEvent, memo} from 'react';

type PropsType = {
    oldTitle: string
    callBack: (newValue: string) => void
    disable?: boolean
}

const UltraSpanForChangeValue: React.FC<PropsType> = memo(({oldTitle, callBack, disable}) => {

    const [active, setActive] = React.useState(false)
    const [newTitle, setNewTitle] = React.useState(oldTitle)

    const onClickHandler = () => {
        if(disable){
            return
        }
        setActive(!active)
        callBack(newTitle)
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return active
        ? <input
            value={newTitle}
            onChange={changeTitle}
            autoFocus
            onBlur={onClickHandler}
        />
        : <span onDoubleClick={onClickHandler}>{newTitle}</span>
});

export default UltraSpanForChangeValue;
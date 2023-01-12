import React, {ChangeEvent} from 'react';

type PropsType = {
    oldTitle: string
    callBack: (newValue: string) => void
}

const UltraSpanForChangeValue: React.FC<PropsType> = ({oldTitle, callBack}) => {
    const [active, setActive] = React.useState(false)
    const [newTitle, setNewTitle] = React.useState(oldTitle)

    const onClickHandler = () => {
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
};

export default UltraSpanForChangeValue;
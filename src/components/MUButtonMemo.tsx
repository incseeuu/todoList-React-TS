import React, {memo} from 'react';
import Button from "@mui/material/Button";
import {FilterTasksType} from "../AppWithRedux";

type PropsType = {
    value: FilterTasksType
    filter: FilterTasksType
    takeOnClickFilterHandlerCallBack: (value: FilterTasksType) => void
}

const MuButtonMemo: React.FC<PropsType> = memo(({value, filter, takeOnClickFilterHandlerCallBack}) => {

    return (
        <Button variant={filter === value ? 'contained' : "outlined"}
                color="secondary"
                onClick={() => takeOnClickFilterHandlerCallBack(value)}>{value}</Button>
    );
});

export default MuButtonMemo;
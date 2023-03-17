import React from 'react';
import MuiAlert, {AlertProps} from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import {useAppDispatch, useAppSelector} from "../store/store";
import {changeErrorMessageAC} from "../reducers/app-reducer";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Error = () => {
    const error = useAppSelector<null | string>(state => state.appReducer.error)
    const dispatch = useAppDispatch()

    // const [open, setOpen] = useState(false)

    // useEffect(() => {
    //     if(!!error){
    //         setOpen(true)
    //     }
    // }, [error])

    const openHandler = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(changeErrorMessageAC(null))
    };

    return (
        <Snackbar open={!!error} autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} onClose={openHandler}>
            <Alert onClose={openHandler} severity="error" sx={{ width: "100%" }}>
                {error}
            </Alert>
        </Snackbar>
    );
};

export default Error;




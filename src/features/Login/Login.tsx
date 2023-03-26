import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import React from 'react';
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import s from './Login.module.css'
import {useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {AuthStateType, loggedInTC} from "./auth-reducer";
import {Navigate, redirect} from "react-router-dom";
import Loader from "../../components/Loader/Loader";


export type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const Login = () => {

    const isLoggedIn = useAppSelector(state => state.authReducer.isLoggedIn)
    const isInitialized = useAppSelector(state => state.authReducer.isInitialized)
    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: {errors}
    } = useForm<FormDataType>({
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false
        }
    })

    const onSubmitHandler = (data: FormDataType) => {
        dispatch(loggedInTC({...data}))
        reset()
    }

    if(isLoggedIn){
        return <Navigate to={'/'}/>
    }

    return (
        <Grid className={s.container} container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <FormControl>
                    <FormLabel></FormLabel>
                    <FormGroup>
                        <form onSubmit={handleSubmit(onSubmitHandler)}>
                            <TextField label={'Email'} margin={'normal'} {...register('email', {
                                required: true,
                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
                            })}/>
                            {errors?.email?.type === "pattern"
                                ? <span style={{color: "red"}}>Write correct email address</span>
                                : errors?.email?.type === "required" ?
                                    <span style={{color: "red"}}>This field is required</span>
                                    : ''
                            }
                            <TextField type={'password'} label={'Password'} margin={'normal'} {...register('password', {
                                required: true,
                                maxLength: 15,
                                minLength: 3
                            })}/>
                            {errors?.password?.type === "required"
                                ? <span style={{color: "red"}}>This field is required</span>
                                : errors?.password?.type === "minLength"
                                    ? <span style={{color: "red"}}>Min length of password 3 characters</span>
                                    : errors?.password?.type === "maxLength"
                                        ? <span style={{color: "red"}}>Max length of password must be 15</span>
                                        : ''
                            }
                            <FormControlLabel
                                control={<Checkbox checked={watch("rememberMe")} {...register('rememberMe')}/>}
                                label={'Remember me'}/>
                            <Button type={'submit'} variant={'outlined'} color={'secondary'}>Login</Button>
                        </form>
                    </FormGroup>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default Login;
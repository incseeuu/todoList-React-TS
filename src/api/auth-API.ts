import axios from "axios";
import {DeletePostTasksType} from "./todolist-API";
import {FormDataType} from "../features/Login/Login";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "API-KEY": "c86fcc47-e583-4484-828e-83b5a5d8bf0d",
    }
})

type ResponseDataLoginType = {
    userId: number
}

type ResponseDataAuthMeType = {
    id: number
    email: string
    login: string
}

export const loginApi = {
    login(obj: FormDataType){
        return instance.post<DeletePostTasksType<ResponseDataLoginType>>('auth/login', obj)
    },
    authMe() {
        return instance.get<DeletePostTasksType<ResponseDataAuthMeType>>('auth/me')
    },
    deleteMe(){
      return instance.delete<DeletePostTasksType<{}>>('auth/login')
    }
}
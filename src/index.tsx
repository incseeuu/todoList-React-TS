import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppWithRedux from './AppWithRedux';
import {Provider} from "react-redux";
import {store} from "./store/store";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Login from "./features/Login/Login";
import PageNotFound from "./components/PageNotFound";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <Routes>
                <Route path={'/'} element={<AppWithRedux/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/error'} element={<PageNotFound/>}/>
                <Route path={'*'} element={<Navigate to={'/error'}/>}/>
            </Routes>
        </Provider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


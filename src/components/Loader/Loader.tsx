import React from 'react';
import s from './Loader.module.css'

const Loader = () => {

    console.log('loader')
    return (
        <div className={s.ldsDefault}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default Loader;
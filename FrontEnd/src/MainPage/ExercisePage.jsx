import React from 'react';
import {LeftTab} from './LeftTab';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export function ExercisePage() {

    const navigate = useNavigate();



    useEffect(() => {
        if(JSON.parse(localStorage.getItem('user')) == null) {
            navigate('/')
        }
    }, [])


    return (
        <div className="flex flex-row min-h-[100vh]">
            <LeftTab current='Exercise'/>
            <div className='w-full'>Exercise</div>
        </div>
    )
}
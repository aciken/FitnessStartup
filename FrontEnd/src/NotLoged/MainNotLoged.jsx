import React, { useState, useEffect } from 'react';
import { LeftTabNotLoged } from './LeftTabNotLoged';
import { useNavigate } from 'react-router-dom';

export function MainNotLoged() {

    const navigate = useNavigate();

    const [selected, setSelected] = useState('Home');

    const addSelection = (selection) => {
        setSelected(selection);
    }




    useEffect(() => {
        if(JSON.parse(localStorage.getItem('user')) != null) {
            navigate('/feed/home')
        }
    }, [])
    


    return (
        <div className="flex flex-row min-h-[100vh]">
            <LeftTabNotLoged selected={selected} addSelection={addSelection}  />
            <div className='w-full'>{selected}</div>
        </div>
    )
} 
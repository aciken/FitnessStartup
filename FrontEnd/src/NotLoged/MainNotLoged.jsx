import React, { useState } from 'react';
import { LeftTabNotLoged } from './LeftTabNotLoged';

export function MainNotLoged() {

    const [selected, setSelected] = useState('Home');

    const addSelection = (selection) => {
        setSelected(selection);
    }


    return (
        <div className="flex flex-row min-h-[100vh]">
            <LeftTabNotLoged selected={selected} addSelection={addSelection}  />
            <div className='w-full'>{selected}</div>
        </div>
    )
} 
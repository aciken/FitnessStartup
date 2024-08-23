import React from 'react';
import {LeftTab} from './LeftTab';
import {useState} from 'react';

export function MainPage() {

    const [selected, setSelected] = useState('Home');

    const addSelection = (selection) => {
        setSelected(selection);
    }

    return (
        <div className="flex flex-row min-h-[100vh]">
            <LeftTab selected={selected} addSelection={addSelection}  />
            <div className='w-full'>{selected}</div>
        </div>
    )
}
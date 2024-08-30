import {LeftTab} from '../MainPage/LeftTab'; 
import { useState } from 'react';

export function ProfilePage(){

    const [selected, setSelected] = useState('diet')
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')).user)
    
    return (
        <div className="flex flex-row min-h-[100vh]">
            <LeftTab current='Profile'/>
            <div className='flex flex-col items-center w-full'>
                <div className='flex flex-row justify-center items-start w-full p-6 gap-4 '>
                    <button onClick={() => setSelected('diet')} className={`font-poppins font-semibold  drop-shadow-xl rounded-lg px-4   h-8 ${selected != 'diet' ? ' text-gray-700 border border-gray-700 bg-white hover:bg-gray-100' : 'text-white bg-blue-500 hover:bg-blue-600 '}` }>Diet</button>
                    <button onClick={() => setSelected('exercise')} className={`font-poppins font-semibold  drop-shadow-xl rounded-lg px-4   h-8 ${selected != 'exercise' ? ' text-gray-700 border border-gray-700 bg-white hover:bg-gray-100' : 'text-white bg-blue-500 hover:bg-blue-600 '}` }>Exercise</button>
                    <button onClick={() => setSelected('sleep')} className={`font-poppins font-semibold  drop-shadow-xl rounded-lg px-4   h-8 ${selected != 'sleep' ? ' text-gray-700 border border-gray-700 bg-white hover:bg-gray-100' : 'text-white bg-blue-500 hover:bg-blue-600 '}` }>Sleep</button>
                </div>
                {selected === 'diet' ? (
                    <div className='flex flex-col font-poppins font-medium text-gray-700'>
                        <h1>{user.setup.diet}</h1>
                        <h1>{user.setup.meals}</h1>
                        <h1>{user.setup.fast}</h1>
                    </div>
                ) : selected == 'exercise' ? (
                    <div className='flex flex-col font-poppins font-medium text-gray-700'>
                        <h1>{user.setup.exercise1}</h1>
                        <h1>{user.setup.exercise1Times}</h1>
                    </div>
                ) : (
                
                    <div className='flex flex-col font-poppins font-medium text-gray-700'>
                        <h1>{user.setup.sleep}</h1>
                        <h1>{user.setup.bed}</h1>
                        <h1>{user.setup.varies}</h1>
                    </div>
                )}
            </div>

        </div>
    )
}
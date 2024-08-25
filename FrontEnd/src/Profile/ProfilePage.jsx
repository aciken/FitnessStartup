import {LeftTab} from '../MainPage/LeftTab'; 

export function ProfilePage(){
    return (
        <div className="flex flex-row min-h-[100vh]">
            <LeftTab current='Profile'/>
            <div className='w-full'>Profile</div>
        </div>
    )
}
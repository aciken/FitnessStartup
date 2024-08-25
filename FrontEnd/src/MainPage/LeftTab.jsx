import { useState,useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export function LeftTab({current}) {

    const [selected, setSelected] = useState(current);



    
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');

    useEffect(() => {
        console.log(JSON.parse(localStorage.getItem('user')))
        if(JSON.parse(localStorage.getItem('user')) == null) {
            navigate('/')
        } else {
            setUser(JSON.parse(localStorage.getItem('user')))
            setUsername(JSON.parse(localStorage.getItem('user')).user.username)
        }
    }, [])



    console.log(user)

    const [logoutPop, setLogoutPop] = useState(false);

    
 useEffect(() => {
    console.log(selected);
 }, [selected])

    


    console.log(selected);

    return(
        <div onClick={() => setLogoutPop(false)} className="flex flex-col w-72 border border-r-gray-300 items-center relative ">
            <h1 className="text-3xl font-poppins font-bold text-gray-700">Logo</h1>
            <div className="flex flex-col w-full items-start">
                <h1 className="pl-2 pt-4 pb-2 font-poppins text-black font-bold text-lg ">Categories</h1>
                <div className="flex flex-col space-y-1 w-full mb-2 ">
                    <button onClick={() => {if(selected != 'Home'){ navigate('/feed/home')}}} className={`w-[95%] h-12 flex flex-row items-center rounded-xl m-1 fill-gray-700  ${selected == 'Home' ? `bg-gray-200` : null}`}><svg className="w-8 h-8 p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>home</title><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" /></svg><h1 className={`font-poppins  text-gray-700 text-base ${selected == 'Home' ? `font-bold` : `font-medium`}`}>Home</h1></button>
                    <button onClick={() => {if(selected !='Diet'){ navigate('/feed/diet')} }} className={`w-[95%] h-12 flex flex-row items-center rounded-xl m-1 fill-gray-700  ${selected == 'Diet' ? `bg-gray-200` : null}`}><svg className="w-8 h-8 p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>food-apple</title><path d="M20,10C22,13 17,22 15,22C13,22 13,21 12,21C11,21 11,22 9,22C7,22 2,13 4,10C6,7 9,7 11,8V5C5.38,8.07 4.11,3.78 4.11,3.78C4.11,3.78 6.77,0.19 11,5V3H13V8C15,7 18,7 20,10Z" /></svg><h1 className={`font-poppins  text-gray-700 text-base ${selected == 'Diet' ? `font-bold` : `font-medium`}`}>Diet</h1></button>
                    <button onClick={() => {if(selected !='Exercise'){ navigate('/feed/exercise')}}} className={`w-[95%] h-12 flex flex-row items-center rounded-xl m-1 fill-gray-700  ${selected == 'Exercise' ? `bg-gray-200` : null}`}><svg className="w-8 h-8 p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>weight-lifter</title><path d="M12 5C10.89 5 10 5.89 10 7S10.89 9 12 9 14 8.11 14 7 13.11 5 12 5M22 1V6H20V4H4V6H2V1H4V3H20V1H22M15 11.26V23H13V18H11V23H9V11.26C6.93 10.17 5.5 8 5.5 5.5L5.5 5H7.5L7.5 5.5C7.5 8 9.5 10 12 10S16.5 8 16.5 5.5L16.5 5H18.5L18.5 5.5C18.5 8 17.07 10.17 15 11.26Z" /></svg><h1 className={`font-poppins  text-gray-700 text-base ${selected == 'Exercise' ? `font-bold` : `font-medium`}`}>Exercise</h1></button>
                    <button onClick={() => {if(selected !='Sleep'){ navigate('/feed/sleep')}}} className={`w-[95%] h-12 flex flex-row items-center rounded-xl m-1 fill-gray-700  ${selected == 'Sleep' ? `bg-gray-200` : null}`}><svg className="w-8 h-8 p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>power-sleep</title><path d="M18.73,18C15.4,21.69 9.71,22 6,18.64C2.33,15.31 2.04,9.62 5.37,5.93C6.9,4.25 9,3.2 11.27,3C7.96,6.7 8.27,12.39 12,15.71C13.63,17.19 15.78,18 18,18C18.25,18 18.5,18 18.73,18Z" /></svg><h1 className={`font-poppins  text-gray-700 text-base ${selected == 'Sleep' ? `font-bold` : `font-medium`}`}>Sleep</h1></button>
                </div>
            </div>
            <div className="flex flex-col w-full items-start border-t border-t-gray-300">
                <h1 className="pl-2 pt-4 pb-2 font-poppins text-black font-bold text-lg ">Personal</h1>
                <div className="flex flex-col space-y-1 w-full  ">
                    <button onClick={() => {if(selected != 'Likes'){ navigate('/feed/likes')}}} className={`w-[95%] h-12 flex flex-row items-center rounded-xl m-1 fill-gray-700  ${selected == 'Likes' ? `bg-gray-200` : null}`}><svg className="w-8 h-8 p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>thumb-up</title><path d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z" /></svg><h1 className={`font-poppins  text-gray-700 text-base ${selected == 'Likes' ? `font-bold` : `font-medium`}`}>Likes</h1></button>
                    <button onClick={() => {if(selected != 'Changes'){ navigate('/feed/changes')}}} className={`w-[95%] h-12 flex flex-row items-center rounded-xl m-1 fill-gray-700  ${selected == 'Changes' ? `bg-gray-200` : null}`}><svg className="w-8 h-8 p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pencil</title><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg><h1 className={`font-poppins  text-gray-700 text-base ${selected == 'Changes' ? `font-bold` : `font-medium`}`}>Changes</h1></button>
                </div>
            </div>

            <button onClick={() => navigate('/profile')} className={`w-[95%] h-12 flex flex-row justify-center items-center rounded-full m-1 mt-4  border-2 border-blue-500 hover:drop-shadow-lg ${selected == 'Profile' ? 'bg-blue-500 hover:bg-blue-600' :  'bg-white  hover:bg-gray-200'}`}>
                <svg className={`w-8 h-8 p-1 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24 ${selected == 'Profile' ? 'fill-white' : 'fill-blue-500'}`}><title>account</title><path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" /></svg>
                <h1 className={`font-poppins  text-base font-semibold ${selected == 'Profile' ? 'text-white' : 'text-blue-500'}`}>Profile</h1>
            </button>

            <div className="flex flex-row absolute w-full bottom-2 px-4 justify-between items-center ">
            <div className="relative">
                <button onClick={(e) => {if(!logoutPop){e.stopPropagation(); setLogoutPop(true)}}} className="flex flex-row space-x-1 items-center rounded-2xl hover:bg-gray-200 p-2 cursor-pointer w-48 ">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <h1 className="font-poppins font-medium text-gray-700 text-sm">@{username}</h1>

                </button>
                {logoutPop && (
                        <div onClick={(e) => e.stopPropagation()} className="w-52 h-36 shadow-2xl bg-white border border-gray-400 rounded-lg left-0 absolute top-0 transform -translate-y-full flex flex-col justify-center items-center">
                            
                            <button className="font-poppins font-normal  text-gray-700 w-full h-full rounded-lg hover:bg-gray-100 flex flex-row items-center p-2"><svg className="h-6 w-6 fill-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>cog</title><path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" /></svg>Settings</button>
                            <button className="font-poppins font-normal  text-gray-700 w-full h-full rounded-lg hover:bg-gray-100 flex flex-row items-center p-2"><svg className="h-6 w-6 fill-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>format-color-fill</title><path d="M19,11.5C19,11.5 17,13.67 17,15A2,2 0 0,0 19,17A2,2 0 0,0 21,15C21,13.67 19,11.5 19,11.5M5.21,10L10,5.21L14.79,10M16.56,8.94L7.62,0L6.21,1.41L8.59,3.79L3.44,8.94C2.85,9.5 2.85,10.47 3.44,11.06L8.94,16.56C9.23,16.85 9.62,17 10,17C10.38,17 10.77,16.85 11.06,16.56L16.56,11.06C17.15,10.47 17.15,9.5 16.56,8.94Z" /></svg>Apearence</button>
                            <button onClick={() => {localStorage.removeItem('user'); navigate('/')}} className="font-poppins font-normal text-gray-700 w-full h-full rounded-lg hover:bg-gray-100 flex flex-row items-center p-2 " ><svg className="h-6 w-6 fill-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>logout</title><path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12M4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" /></svg>Log out</button>
                        </div>
                    )}
            </div>

                <button className="relative">
                    <svg className="fill-gray-500 w-8 h-8 relative" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>bell-outline</title><path d="M10 21H14C14 22.1 13.1 23 12 23S10 22.1 10 21M21 19V20H3V19L5 17V11C5 7.9 7 5.2 10 4.3V4C10 2.9 10.9 2 12 2S14 2.9 14 4V4.3C17 5.2 19 7.9 19 11V17L21 19M17 11C17 8.2 14.8 6 12 6S7 8.2 7 11V18H17V11Z" />dov
                    </svg>
                    <div className="absolute top-0 right-0 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <h1 className="text-white text-xs">3</h1>
                        </div>  
                </button>


            </div>
        </div>
    )
}


LeftTab.propTypes = {
    current: PropTypes.string
}

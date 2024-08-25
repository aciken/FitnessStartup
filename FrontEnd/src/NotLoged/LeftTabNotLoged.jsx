import { useState } from "react";
import PropTypes from "prop-types";
import { Signup } from "../Auth/Routes/Signup";
import {useNavigate} from 'react-router-dom';

export function LeftTabNotLoged({selected, addSelection}){

    const navigate = useNavigate();

    console.log(selected);

    return(
        <div className="flex flex-col w-72 border border-r-gray-300 items-center relative ">
            <h1 className="text-3xl font-poppins font-bold text-gray-700">Logo</h1>
            <div className="flex flex-col w-full items-start">
                <h1 className="pl-2 pt-4 pb-2 font-poppins text-black font-bold text-lg">Categories</h1>
                <div className="flex flex-col space-y-1 w-full ">
                    <button onClick={() => addSelection('Home')} className={`w-full h-12 flex flex-row items-center fill-gray-700  ${selected == 'Home' ? `bg-gray-300` : null}`}><svg className="w-8 h-8 p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>home</title><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" /></svg><h1 className={`font-poppins  text-gray-700 text-base ${selected == 'Home' ? `font-bold` : `font-medium`}`}>Home</h1></button>
                    <button onClick={() => navigate('/signup')} className={`w-full h-12 flex flex-row items-center fill-gray-700  ${selected == 'Diet' ? `bg-gray-300` : null}`}><svg className="w-8 h-8 p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>food-apple</title><path d="M20,10C22,13 17,22 15,22C13,22 13,21 12,21C11,21 11,22 9,22C7,22 2,13 4,10C6,7 9,7 11,8V5C5.38,8.07 4.11,3.78 4.11,3.78C4.11,3.78 6.77,0.19 11,5V3H13V8C15,7 18,7 20,10Z" /></svg><h1 className={`font-poppins  text-gray-700 text-base ${selected == 'Diet' ? `font-bold` : `font-medium`}`}>Diet</h1></button>
                    <button onClick={() => navigate('/signup')} className={`w-full h-12 flex flex-row items-center fill-gray-700  ${selected == 'Exercise' ? `bg-gray-300` : null}`}><svg className="w-8 h-8 p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>weight-lifter</title><path d="M12 5C10.89 5 10 5.89 10 7S10.89 9 12 9 14 8.11 14 7 13.11 5 12 5M22 1V6H20V4H4V6H2V1H4V3H20V1H22M15 11.26V23H13V18H11V23H9V11.26C6.93 10.17 5.5 8 5.5 5.5L5.5 5H7.5L7.5 5.5C7.5 8 9.5 10 12 10S16.5 8 16.5 5.5L16.5 5H18.5L18.5 5.5C18.5 8 17.07 10.17 15 11.26Z" /></svg><h1 className={`font-poppins  text-gray-700 text-base ${selected == 'Exercise' ? `font-bold` : `font-medium`}`}>Exercise</h1></button>
                    <button onClick={() => navigate('/signup')} className={`w-full h-12 flex flex-row items-center fill-gray-700  ${selected == 'Sleep' ? `bg-gray-300` : null}`}><svg className="w-8 h-8 p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>power-sleep</title><path d="M18.73,18C15.4,21.69 9.71,22 6,18.64C2.33,15.31 2.04,9.62 5.37,5.93C6.9,4.25 9,3.2 11.27,3C7.96,6.7 8.27,12.39 12,15.71C13.63,17.19 15.78,18 18,18C18.25,18 18.5,18 18.73,18Z" /></svg><h1 className={`font-poppins  text-gray-700 text-base ${selected == 'Sleep' ? `font-bold` : `font-medium`}`}>Sleep</h1></button>
                </div>

            </div>

            <div className="flex flex-row absolute w-full bottom-2 px-4 justify-center items-center">
            <button onClick={() => navigate('/signup')} className="bg-blue-500 w-48 h-10 text-white rounded-full font-poppins font-semibold hover:bg-blue-600">Sign up</button>
            </div>
        </div>
    )
}

LeftTabNotLoged.propTypes = {
    selected: PropTypes.string.isRequired,
    addSelection: PropTypes.func.isRequired,
};


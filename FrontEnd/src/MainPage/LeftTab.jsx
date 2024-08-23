import { useState } from "react";
import PropTypes from "prop-types";

export function LeftTab({selected, addSelection}){

    console.log(selected);

    return(
        <div className="flex flex-col w-72 border border-r-gray-300 items-center relative ">
            <h1 className="text-3xl font-poppins font-bold text-gray-700">Logo</h1>
            <div className="flex flex-col w-full items-start">
                <h1 className="pl-2 pt-4 pb-2 font-poppins text-black font-bold text-lg">Categories</h1>
                <div className="flex flex-col space-y-1 w-full ">
                    <button onClick={() => addSelection('Home')} className={`w-full h-12 flex flex-row items-center fill-gray-700  ${selected == 'Home' ? `bg-gray-300` : null}`}><svg className="w-9 h-9 p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>home</title><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" /></svg><h1 className={`font-poppins  text-gray-700 text-lg ${selected == 'Home' ? `font-bold` : `font-medium`}`}>Home</h1></button>
                    <button onClick={() => addSelection('Diet')} className={`w-full h-12 flex flex-row items-center fill-gray-700  ${selected == 'Diet' ? `bg-gray-300` : null}`}><svg className="w-9 h-9 p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>food-apple</title><path d="M20,10C22,13 17,22 15,22C13,22 13,21 12,21C11,21 11,22 9,22C7,22 2,13 4,10C6,7 9,7 11,8V5C5.38,8.07 4.11,3.78 4.11,3.78C4.11,3.78 6.77,0.19 11,5V3H13V8C15,7 18,7 20,10Z" /></svg><h1 className={`font-poppins  text-gray-700 text-lg ${selected == 'Diet' ? `font-bold` : `font-medium`}`}>Diet</h1></button>
                    <button onClick={() => addSelection('Exercise')} className={`w-full h-12 flex flex-row items-center fill-gray-700  ${selected == 'Exercise' ? `bg-gray-300` : null}`}><svg className="w-9 h-9 p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>weight-lifter</title><path d="M12 5C10.89 5 10 5.89 10 7S10.89 9 12 9 14 8.11 14 7 13.11 5 12 5M22 1V6H20V4H4V6H2V1H4V3H20V1H22M15 11.26V23H13V18H11V23H9V11.26C6.93 10.17 5.5 8 5.5 5.5L5.5 5H7.5L7.5 5.5C7.5 8 9.5 10 12 10S16.5 8 16.5 5.5L16.5 5H18.5L18.5 5.5C18.5 8 17.07 10.17 15 11.26Z" /></svg><h1 className={`font-poppins  text-gray-700 text-lg ${selected == 'Exercise' ? `font-bold` : `font-medium`}`}>Exercise</h1></button>
                    <button onClick={() => addSelection('Sleep')} className={`w-full h-12 flex flex-row items-center fill-gray-700  ${selected == 'Sleep' ? `bg-gray-300` : null}`}><svg className="w-9 h-9 p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>power-sleep</title><path d="M18.73,18C15.4,21.69 9.71,22 6,18.64C2.33,15.31 2.04,9.62 5.37,5.93C6.9,4.25 9,3.2 11.27,3C7.96,6.7 8.27,12.39 12,15.71C13.63,17.19 15.78,18 18,18C18.25,18 18.5,18 18.73,18Z" /></svg><h1 className={`font-poppins  text-gray-700 text-lg ${selected == 'Sleep' ? `font-bold` : `font-medium`}`}>Sleep</h1></button>
                </div>

            </div>

            <div className="flex flex-row absolute w-full bottom-2 px-4 justify-between items-center ">
                <button className="flex flex-row space-x-1 items-center rounded-2xl hover:bg-gray-200 p-2 cursor-pointer">
                    <div className="w-8 h-8 bg-gray-300 rounded-full">
                    </div>
                    <h1 className="font-poppins font-medium text-gray-700 text-sm">@adrianmarton</h1>
                </button>

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
    selected: PropTypes.string.isRequired,
    addSelection: PropTypes.func.isRequired,
};


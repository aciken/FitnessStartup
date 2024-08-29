import { HomePage } from "../MainPage/HomePage"
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { ProfilePage } from "../Profile/ProfilePage";

export function SetupStep1() {
    
    const navigate = useNavigate();

    const [diet, setDiet] = useState('none');
    const [meals, setMeals] = useState('none');
    const [fast, setFast] = useState('none');





    const skipSetup = () => {
        axios.put('http://localhost:3000/skipSetup', {
            email: JSON.parse(localStorage.getItem('user')).user.email
        }).then((res) => {
            localStorage.setItem('user', JSON.stringify(res.data))
            navigate('/feed/home')
    }).catch((err) => {
        console.log(err)
    })
    }



    return (
        <div className="min-h-[100vh] w-full relative">
                <div className="fixed inset-0 flex items-center  justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
                    <div className="bg-white w-[500px] h-[500px] flex flex-col  rounded shadow-lg relative">
                        <div className="flex flex-row px-4 pt-6 pb-4 justify-between items-center">
                            <h2 className="text-xl text-gray-600 font-poppins font-bold">Let's Set up your profile</h2>
                            <button onClick={() => skipSetup()} className="font-poppins font-medium text-base text-gray-400 underline hover:text-gray-500 ">Skip for now</button>
                        </div>
                        <div className="flex-1 flex-col items-center pt-4 w-full border-t border-t-gray-400">
                            <h1 className="text-2xl text-gray-800 font-poppins font-bold text-center">Diet</h1>
                            <div className="flex flex-col w-full py-4 px-8 gap-6 ">
                                <div className="flex flex-row justify-between selection:outline-gray-600 items-center">
                                    <h1 className="text-gray-500 font-poppins font-medium">Which type of diet are you on:</h1>
                                    <select onChange={(e) => setDiet(e.target.value)}  className="rounded-md px-2 py-1 w-32 bg-gray-200 border border-gray-400 text-gray-700 font-poppins">
                                    <option value="none" disabled selected></option>
                                    <option value="Keto">Keto</option>
                                    <option value="Vegan">Vegan</option>
                                    <option value="Vegetarian">Vegetarian</option>
                                    <option value="Paleo">Paleo</option>
                                </select>
                                </div>
                                <div className="flex flex-row justify-between items-center">
                                    <h1 className="text-gray-500 font-poppins font-medium">How many times a day you eat:</h1>
                                    <select onChange={(e) => setMeals(e.target.value)} className="rounded-md px-2 py-1 w-32 bg-gray-200 border border-gray-400 text-gray-700 font-poppins">
                                    <option value="none" disabled selected></option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                                <div className="flex flex-row justify-between items-center">
                                    <h1 className="text-gray-500 font-poppins font-medium">Do you fast:</h1>
                                    <select onChange={(e) => setFast(e.target.value)}  className=" rounded-md px-2 py-1 w-32 bg-gray-200 border border-gray-400 text-gray-700 font-poppins">
                                        <option disabled selected></option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>  
                            </div>
                        </div>
                        <div className="px-4 py-2 border-t border-gray-300 flex justify-end">
                        <button onClick={() => {if(diet != 'none' && meals != 'none' && fast != 'none' ){navigate('/setup/exercise')}}} className={`px-4 py-1 bg-blue-500 text-white rounded-md text-lg font-poppins font-semibold hover:bg-blue-600 ${diet != 'none' && meals != 'none' && fast != 'none' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'}`}>Next</button>
                    </div>
                        
                    </div>
                </div>
                
                {JSON.parse(localStorage.getItem('user')).user.step == 0 ? <ProfilePage /> : <HomePage/>}

        </div>
    );
}
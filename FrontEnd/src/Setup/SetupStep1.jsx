import { HomePage } from "../MainPage/HomePage"
import React, { useState,useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import axios from 'axios';
import { ProfilePage } from "../Profile/ProfilePage";

import oneOFthree from '../../assets/images/oneOFthree.png'

export function SetupStep1() {
    
    const navigate = useNavigate();
    const location = useLocation();





    const [setup, setSetup] = useState({
        diet: 'none',
        meals: 'none',
        fast: 'none',
        fastHours: 'none',
        exercise1: 'none',
        exercise1Times: 'none',
        exercise2: 'none',
        exercise2Times: 'none',
        exercise3: 'none',
        exercise3Times: 'none',
        sleep: 'none',
        bed: 'none',
        varies: 'none',
        number: 1,
    });



    useEffect(() => {
        console.log(setup)
    if(location.state){
        setSetup(location.state.setup)
    }
    }, [])

    const next = () => {
        if(setup.diet != 'none' && setup.meals != 'none' && setup.fast != 'none' ){
            console.log(setup)
            navigate('/setup/exercise', {state: {setup: setup}})
        }
    }


    const changeDiet = (e) => {
        setSetup({...setup, diet: e.target.value})
    }

    const changeMeals = (e) => {
        setSetup({...setup, meals: e.target.value})
    }

    const changeFast = (e) => {
        setSetup({...setup, fast: e.target.value})
    }


    const [value, setValue] = useState(2000);

    const handleChange = (e) => {
        setValue(Number(e.target.value));
    };



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
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
                <div className="bg-white w-[500px] h-[600px] flex flex-col rounded-lg shadow-2xl relative">
                    <div className="flex flex-row px-4 pt-4 pb-2 justify-between items-center border-b border-gray-200">
                        <h2 className="text-2xl text-gray-700 font-poppins font-bold">Let's Set up your profile</h2>
                        <button onClick={() => skipSetup()} className="font-poppins font-medium text-base text-gray-500 underline hover:text-gray-600">Skip for now</button>
                    </div>
                    <div className="flex-1 flex-col items-center pt-4 w-full overflow-y-auto">
                        <h1 className="text-3xl text-gray-800 font-poppins font-bold text-center mb-4">Diet</h1>
                        <div className="flex flex-col w-full px-6 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                                <h1 className="text-gray-600 font-poppins font-medium mb-2 text-center">Daily Calorie Intake</h1>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="flex flex-row gap-2 items-center">
                                        <input
                                            type="number"
                                            value={value}
                                            onChange={handleChange}
                                            className="rounded-md px-3 py-2 w-24 h-10 text-sm bg-white border border-gray-300 text-gray-700 font-poppins shadow-sm"
                                        />
                                        <h1 className="text-gray-700 text-sm font-poppins font-medium">Kcal</h1>
                                    </div>
                                    <input
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                        min={1}
                                        max={10000}
                                        type="range"
                                        value={value}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                                <h1 className="text-gray-600 font-poppins font-medium mb-2 text-center">Which type of diet are you on:</h1>
                                <div className="flex flex-row justify-center">
                                    <select value={setup.diet} onChange={(e) => changeDiet(e)} className="rounded-md px-3 py-2 w-36 bg-white border border-gray-300 text-gray-700 font-poppins shadow-sm">
                                        <option value="none" disabled selected></option>
                                        <option value="Keto">Keto</option>
                                        <option value="Vegan">Vegan</option>
                                        <option value="Vegetarian">Vegetarian</option>
                                        <option value="Paleo">Paleo</option>
                                    </select>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                                <h1 className="text-gray-600 font-poppins font-medium mb-2 text-center">How many times a day you eat:</h1>
                                <div className="flex flex-row justify-center">
                                    <select value={setup.meals} onChange={(e) => changeMeals(e)} className="rounded-md px-3 py-2 w-36 bg-white border border-gray-300 text-gray-700 font-poppins shadow-sm">
                                        <option value="none" disabled selected></option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg shadow-md mb-4">
                                <h1 className="text-gray-600 font-poppins font-medium mb-2 text-center">Do you fast:</h1>
                                <div className="flex flex-row justify-center">
                                    <select value={setup.fast} onChange={(e) => changeFast(e)} className="rounded-md px-3 py-2 w-36 bg-white border border-gray-300 text-gray-700 font-poppins shadow-sm">
                                        <option value="none" disabled selected></option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                {setup.fast == 'Yes' && <div className="flex flex-row justify-center mt-2">
                                    <h1 className="text-gray-500 font-poppins font-light mr-2">How many hours:</h1>
                                    <select value={setup.fastHours} onChange={(e) => setSetup({...setup, fastHours: e.target.value})} className="rounded-md px-3 py-2 w-36 bg-white border border-gray-300 text-gray-700 font-poppins shadow-sm">
                                        <option value="none" disabled selected></option>
                                        <option value="8">8</option>
                                        <option value="10">10</option>
                                        <option value="12">12</option>
                                        <option value="14">14</option>
                                        <option value="16">16</option>
                                        <option value="18">18</option>
                                        <option value="20">20</option>
                                        <option value="22">22</option>
                                    </select>
                                </div>}
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-4 border-t border-gray-200 flex justify-end relative">
                        <img className="absolute inset-0 m-auto w-20" src={oneOFthree} alt="" />
                        <button onClick={() => next()} className={`px-6 py-2 bg-blue-500 text-white rounded-md text-lg font-poppins font-semibold hover:bg-blue-600 ${setup.diet != 'none' && setup.meals != 'none' && setup.fast != 'none' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'}`}>Next</button>
                    </div>
                </div>
            </div>
            {JSON.parse(localStorage.getItem('user')).user.step == 0 ? <ProfilePage /> : <HomePage />}
        </div>
    );
}

// {if(diet != 'none' && meals != 'none' && fast != 'none' ){navigate('/setup/exercise')}}
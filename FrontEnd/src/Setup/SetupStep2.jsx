import { HomePage } from "../MainPage/HomePage";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ProfilePage } from "../Profile/ProfilePage";

export function SetupStep2() {

    const navigate = useNavigate();

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

    const [number, setNumber] = useState(1);
    const [active, setActive] = useState(false);

    const [exerciseOne, setExerciseOne] = useState({
        type: 'none',
        times: 'none'
    })
    
    const [exerciseTwo, setExerciseTwo] = useState({
        type: 'none',
        times: 'none'
    })

    const [exerciseThree, setExerciseThree] = useState({
        type: 'none',
        times: 'none'
    })

    useEffect(() => {
        console.log(exerciseOne, exerciseTwo, exerciseThree)
        if(number == 1){
            if(exerciseOne.type !== 'none' && exerciseOne.times !== 'none'){
                setActive(true)
            } else {
                setActive(false)
            }
        } else if(number == 2){
            if(exerciseOne.type !== 'none' && exerciseOne.times !== 'none' && exerciseTwo.type !== 'none' && exerciseTwo.times !== 'none'){
                setActive(true)
            } else {
                setActive(false)
            }
        } else {
            if(exerciseOne.type !== 'none' && exerciseOne.times !== 'none' && exerciseTwo.type !== 'none' && exerciseTwo.times !== 'none' && exerciseThree.type !== 'none' && exerciseThree.times !== 'none'){
                setActive(true)
            } else {
                setActive(false)
            }
        }

    } , [exerciseOne, exerciseTwo, exerciseThree, number]) 

    const handleTypeChange1 = (e) => {
        setExerciseOne((prevState) => ({
            ...prevState,
            type: e.target.value
        }));
    };

    const handleTimesChange1 = (e) => {
        setExerciseOne((prevState) => ({
            ...prevState,
            times: e.target.value
        }));
    };

    const handleTypeChange2 = (e) => {
        setExerciseTwo((prevState) => ({
            ...prevState,
            type: e.target.value
        }));
    }

    const handleTimesChange2 = (e) => {
        setExerciseTwo((prevState) => ({
            ...prevState,
            times: e.target.value
        }));
    }

    const handleTypeChange3 = (e) => {
        setExerciseThree((prevState) => ({
            ...prevState,
            type: e.target.value
        }));
    }

    const handleTimesChange3 = (e) => {
        setExerciseThree((prevState) => ({
            ...prevState,
            times: e.target.value
        }));
    }

    const lower = () => {
        setNumber(number - 1)
        if(number - 1 == 1){
            setExerciseTwo({
                type: 'none',
                times: 'none'
            })
        } else {
            setExerciseThree({
                type: 'none',
                times: 'none'
            })
        }
    }


    return (
        <div className="min-h-[100vh] w-full relative">
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
                <div className="bg-white w-[500px] h-[500px] flex flex-col rounded shadow-lg relative">
                    <div className="flex flex-row px-4 pt-6 pb-4 justify-between items-center border-b border-gray-300">
                        <h2 className="text-xl text-gray-600 font-poppins font-bold">Let's Set up your profile</h2>
                        <button onClick={() => skipSetup()} className="font-poppins font-medium text-base text-gray-400 underline hover:text-gray-500">Skip for now</button>
                    </div>
                    <div className="flex-1 overflow-y-auto px-8 py-4">
                        <div className="flex flex-col items-center w-full">
                            <h1 className="text-2xl text-gray-800 font-poppins font-bold">Exercise</h1>
                            <div className="flex flex-col w-full gap-6">
                                <div className="flex flex-col gap-2 items-center w-full">
                                    <div className="flex flex-row justify-between selection:outline-gray-600 w-full">
                                        <h1 className="text-gray-500 font-poppins font-medium">Types of exercise</h1>
                                        <select onChange={(e) => handleTypeChange1(e)} className="rounded-md px-2 py-1 w-32 bg-gray-200 border border-gray-400 text-gray-700 font-poppins">
                                            <option value="none" disabled selected></option>
                                            <option value="Bodybuilding">Bodybuilding</option>
                                            <option value="Powerlifting">Powerlifting</option>
                                            <option value="Running">Running</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-row justify-between selection:outline-gray-600 w-full">
                                        <h1 className="text-gray-400 font-poppins font-light">Times a week:</h1>
                                        <select onChange={(e) => handleTimesChange1(e)} className="rounded-md px-2 py-1 w-32 bg-gray-200 border border-gray-400 text-gray-700 font-poppins">
                                            <option value="none" disabled selected></option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                        </select>
                                    </div>

                                    {number > 1 && (
                                        <div className="w-full mt-4 flex flex-col gap-2">
                                            <div className="flex flex-row justify-between selection:outline-gray-600 w-full">
                                                <h1 className="text-gray-500 font-poppins font-medium">Types of exercise</h1>
                                                <select onChange={(e) => handleTypeChange2(e)} className="rounded-md px-2 py-1 w-32 bg-gray-200 border border-gray-400 text-gray-700 font-poppins">
                                                    <option value="none" disabled selected></option>
                                                    <option value="Bodybuilding">Bodybuilding</option>
                                                    <option value="Powerlifting">Powerlifting</option>
                                                    <option value="Running">Running</option>
                                                </select>
                                            </div>
                                            <div className="flex flex-row justify-between selection:outline-gray-600 w-full">
                                                <h1 className="text-gray-400 font-poppins font-light">Times a week:</h1>
                                                <select onChange={(e) => handleTimesChange2(e)} className="rounded-md px-2 py-1 w-32 bg-gray-200 border border-gray-400 text-gray-700 font-poppins">
                                                    <option value="none" disabled selected></option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}

                                    {number > 2 && (
                                        <div className="w-full mt-4 flex flex-col gap-2">
                                            <div className="flex flex-row justify-between selection:outline-gray-600 w-full">
                                                <h1 className="text-gray-500 font-poppins font-medium">Types of exercise</h1>
                                                <select onChange={(e) => handleTypeChange3(e)} className="rounded-md px-2 py-1 w-32 bg-gray-200 border border-gray-400 text-gray-700 font-poppins">
                                                    <option value="none" disabled selected></option>
                                                    <option value="Bodybuilding">Bodybuilding</option>
                                                    <option value="Powerlifting">Powerlifting</option>
                                                    <option value="Running">Running</option>
                                                </select>
                                            </div>
                                            <div className="flex flex-row justify-between selection:outline-gray-600 w-full">
                                                <h1 className="text-gray-400 font-poppins font-light">Times a week:</h1>
                                                <select onChange={(e) => handleTimesChange3(e)} className="rounded-md px-2 py-1 w-32 bg-gray-200 border border-gray-400 text-gray-700 font-poppins">
                                                    <option value="none" disabled selected></option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}

                                    

                                    <div className="flex flex-row gap-4">
                                        {number < 3 && <button onClick={() => setNumber(number + 1)} className="bg-gray-400 text-xl text-gray-100 h-6 w-16 flex flex-row justify-center items-center rounded-2xl pb-1 hover:bg-gray-500">+</button>}
                                        {number > 1 && <button onClick={() => lower()} className="bg-gray-400 text-xl text-gray-100 h-6 w-16 flex flex-row justify-center items-center rounded-2xl pb-1 hover:bg-gray-500">-</button>}
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-2 border-t border-gray-300 flex justify-between">
                        <button onClick={() => navigate('/setup/food')} className="px-4 py-1 bg-blue-500 text-white rounded-md text-lg font-poppins font-semibold hover:bg-blue-600">Back</button>
                        <button onClick={() => {if(active){navigate('/setup/sleep')}}} className={`px-4 py-1 text-white rounded-md text-lg font-poppins font-semibold  ${active ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'}`}>Next</button>
                    </div>
                </div>
            </div>
            {JSON.parse(localStorage.getItem('user')).user.step == 0 ? <ProfilePage /> : <HomePage />}
        </div>
    );
}
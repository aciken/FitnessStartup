import { HomePage } from "../MainPage/HomePage";
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ProfilePage } from "../Profile/ProfilePage";
import threeOFthree from '../../assets/images/threeOFthree.png';

export function SetupStep3() {
    const navigate = useNavigate();
    const location = useLocation();

    const [setup, setSetup] = useState({
        sleep: 'none',
        bed: 'none',
        varies: 'none',
        number: 3,
    });

    useEffect(() => {
        if(location.state){
            setSetup(location.state.setup)
        }
    }, [])

    const finishSetup = () => {
        if(setup.sleep != 'none' && setup.bed != 'none' && setup.varies != 'none'){
            axios.put('http://localhost:3000/finishSetup', {
                email: JSON.parse(localStorage.getItem('user')).user.email,
                setup: setup
            }).then((res) => {
                localStorage.setItem('user', JSON.stringify(res.data))
                navigate('/feed/home')
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    const changeSleep = (e) => {
        setSetup({...setup, sleep: e.target.value})
    }

    const changeBed = (e) => {
        setSetup({...setup, bed: e.target.value})
    }

    const changeVaries = (e) => {
        setSetup({...setup, varies: e.target.value})
    }

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
                        <h1 className="text-3xl text-gray-800 font-poppins font-bold text-center mb-4">Sleep</h1>
                        <div className="flex flex-col w-full px-6 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                                <h1 className="text-gray-600 font-poppins font-medium mb-2 text-center">Hours of sleep:</h1>
                                <div className="flex flex-row justify-center">
                                    <select value={setup.sleep} onChange={(e) => changeSleep(e)} className="rounded-md px-3 py-2 w-36 bg-white border border-gray-300 text-gray-700 font-poppins shadow-sm">
                                        <option value="none" disabled selected></option>
                                        {[3,4,5,6,7,8,9,10].map(hour => (
                                            <option key={hour} value={hour}>{hour}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                                <h1 className="text-gray-600 font-poppins font-medium mb-2 text-center">Bedtime:</h1>
                                <div className="flex flex-row justify-center">
                                    <select value={setup.bed} onChange={(e) => changeBed(e)} className="rounded-md px-3 py-2 w-36 bg-white border border-gray-300 text-gray-700 font-poppins shadow-sm">
                                        <option value="none" disabled selected></option>
                                        {Array.from({length: 24}, (_, i) => (
                                            <option key={i} value={i}>{`${String(i).padStart(2, '0')}:00`}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                                <h1 className="text-gray-600 font-poppins font-medium mb-2 text-center">Sleep schedule variation (1-10):</h1>
                                <div className="flex flex-row justify-center">
                                    <select value={setup.varies} onChange={(e) => changeVaries(e)} className="rounded-md px-3 py-2 w-36 bg-white border border-gray-300 text-gray-700 font-poppins shadow-sm">
                                        <option value="none" disabled selected></option>
                                        {Array.from({length: 10}, (_, i) => (
                                            <option key={i+1} value={i+1}>{i+1}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center relative">
                        <button onClick={() => navigate('/setup/exercise', {state: {setup: setup}})} className="px-6 py-2 bg-blue-500 text-white rounded-md text-lg font-poppins font-semibold hover:bg-blue-600">Back</button>
                        <img className="absolute left-1/2 transform -translate-x-1/2 w-20" src={threeOFthree} alt="" />
                        <button onClick={() => finishSetup()} className={`px-6 py-2 bg-blue-500 text-white rounded-md text-lg font-poppins font-semibold hover:bg-blue-600 ${setup.sleep != 'none' && setup.bed != 'none' && setup.varies != 'none' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'}`}>Finish</button>
                    </div>
                </div>
            </div>
            {JSON.parse(localStorage.getItem('user')).user.step == 0 ? <ProfilePage /> : <HomePage />}
        </div>
    );
}
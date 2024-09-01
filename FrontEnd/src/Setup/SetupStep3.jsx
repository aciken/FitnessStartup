import { HomePage } from "../MainPage/HomePage";
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ProfilePage } from "../Profile/ProfilePage";
import threeOFthree from '../../assets/images/threeOFthree.png';

export function SetupStep3() {
    const navigate = useNavigate();
    const location = useLocation();
    const [setup, setSetup] = useState(location.state.setup);
    const [active, setActive] = useState(false);

    const skipSetup = () => {
        axios.put('http://localhost:3000/skipSetup', {
            email: JSON.parse(localStorage.getItem('user')).user.email
        }).then((res) => {
            localStorage.setItem('user', JSON.stringify(res.data));
            navigate('/feed/home');
        }).catch((err) => {
            console.log(err);
        });
    };

    const finishSetup = () => {
        axios.put('http://localhost:3000/finishSetup', {
            email: JSON.parse(localStorage.getItem('user')).user.email,
            setup: setup
        }).then((res) => {
            localStorage.setItem('user', JSON.stringify(res.data));
            navigate('/feed/home');
        }).catch((err) => {
            console.log(err);
        });
    };

    const changeSleep = (e) => {
        setSetup({ ...setup, sleep: e.target.value });
    };

    const changeBed = (e) => {
        setSetup({ ...setup, bed: e.target.value });
    };

    const changeVaries = (e) => {
        setSetup({ ...setup, varies: e.target.value });
    };

    useEffect(() => {
        if (setup.sleep !== 'none' && setup.bed !== 'none' && setup.varies !== 'none') {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [setup]);

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
                                <div className="flex flex-row justify-between items-center w-full">
                                    <div className="flex flex-col items-center">
                                        <h1 className="text-gray-600 font-poppins font-medium mb-1">How many hours do you usually sleep:</h1>
                                        <select value={setup.sleep} onChange={changeSleep} className="rounded-md px-3 py-1 w-36 bg-white border border-gray-300 text-gray-700 font-poppins shadow-sm">
                                            <option value="none" disabled selected></option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                                <div className="flex flex-row justify-between items-center w-full">
                                    <div className="flex flex-col items-center">
                                        <h1 className="text-gray-600 font-poppins font-medium mb-1">When do you usually go to bed:</h1>
                                        <select value={setup.bed} onChange={changeBed} className="rounded-md px-3 py-1 w-36 bg-white border border-gray-300 text-gray-700 font-poppins shadow-sm">
                                            <option value="none" disabled selected></option>
                                            <option value="0">00:00</option>
                                            <option value="1">01:00</option>
                                            <option value="2">02:00</option>
                                            <option value="3">03:00</option>
                                            <option value="4">04:00</option>
                                            <option value="5">05:00</option>
                                            <option value="6">06:00</option>
                                            <option value="7">07:00</option>
                                            <option value="8">08:00</option>
                                            <option value="9">09:00</option>
                                            <option value="10">10:00</option>
                                            <option value="11">11:00</option>
                                            <option value="12">12:00</option>
                                            <option value="13">13:00</option>
                                            <option value="14">14:00</option>
                                            <option value="15">15:00</option>
                                            <option value="16">16:00</option>
                                            <option value="17">17:00</option>
                                            <option value="18">18:00</option>
                                            <option value="19">19:00</option>
                                            <option value="20">20:00</option>
                                            <option value="21">21:00</option>
                                            <option value="22">22:00</option>
                                            <option value="23">23:00</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                                <div className="flex flex-row justify-between items-center w-full">
                                    <div className="flex flex-col items-center">
                                        <h1 className="text-gray-600 font-poppins font-medium mb-1">How much does your sleep schedule vary from 1 (least) to 10 (most):</h1>
                                        <select value={setup.varies} onChange={changeVaries} className="rounded-md px-3 py-1 w-36 bg-white border border-gray-300 text-gray-700 font-poppins shadow-sm">
                                            <option value="none" disabled selected></option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-4 border-t border-gray-200 flex justify-between relative">
                        <button onClick={() => navigate('/setup/exercise', { state: { setup: setup } })} className="px-4 py-1 bg-blue-500 text-white rounded-md text-lg font-poppins font-semibold hover:bg-blue-600">Back</button>
                        <img className="absolute inset-0 m-auto w-20" src={threeOFthree} alt="" />
                        <button onClick={() => { if (active) { finishSetup() } }} className={`px-4 py-1 text-white rounded-md text-lg font-poppins font-semibold ${active ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'}`}>Finish</button>
                    </div>
                </div>
            </div>
            {JSON.parse(localStorage.getItem('user')).user.step == 0 ? <ProfilePage /> : <HomePage />}
        </div>
    );
}
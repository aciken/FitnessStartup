import { HomePage } from "../MainPage/HomePage";
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ProfilePage } from "../Profile/ProfilePage";
import twoOFthree from '../../assets/images/twoOFthree.png';

export function SetupStep2() {
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

    useEffect(() => {
        if (setup.number == 1) {
            if (setup.exercise1 !== 'none' && setup.exercise1Times !== 'none') {
                setActive(true);
            } else {
                setActive(false);
            }
        } else if (setup.number == 2) {
            if (setup.exercise1 !== 'none' && setup.exercise1Times !== 'none' && setup.exercise2 !== 'none' && setup.exercise2Times !== 'none') {
                setActive(true);
            } else {
                setActive(false);
            }
        } else {
            if (setup.exercise1 !== 'none' && setup.exercise1Times !== 'none' && setup.exercise2 !== 'none' && setup.exercise2Times !== 'none' && setup.exercise3 !== 'none' && setup.exercise3Times !== 'none') {
                setActive(true);
            } else {
                setActive(false);
            }
        }
    }, [setup]);

    const handleTypeChange1 = (e) => {
        setSetup({ ...setup, exercise1: e.target.value });
    };

    const handleTimesChange1 = (e) => {
        setSetup({ ...setup, exercise1Times: e.target.value });
    };

    const handleTypeChange2 = (e) => {
        setSetup({ ...setup, exercise2: e.target.value });
    };

    const handleTimesChange2 = (e) => {
        setSetup({ ...setup, exercise2Times: e.target.value });
    };

    const handleTypeChange3 = (e) => {
        setSetup({ ...setup, exercise3: e.target.value });
    };

    const handleTimesChange3 = (e) => {
        setSetup({ ...setup, exercise3Times: e.target.value });
    };

    const lower = () => {
        setSetup({ ...setup, number: setup.number - 1 });
        if (setup.number - 1 == 1) {
            setSetup({ ...setup, exercise2: 'none', exercise2Times: 'none', number: 1 });
        } else {
            setSetup({ ...setup, exercise3: 'none', exercise3Times: 'none', number: 2 });
        }
    };

    return (
        <div className="min-h-[100vh] w-full relative">
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
                <div className="bg-white w-[500px] h-[600px] flex flex-col rounded-lg shadow-2xl relative">
                    <div className="flex flex-row px-4 pt-4 pb-2 justify-between items-center border-b border-gray-200">
                        <h2 className="text-2xl text-gray-700 font-poppins font-bold">Let's Set up your profile</h2>
                        <button onClick={() => skipSetup()} className="font-poppins font-medium text-base text-gray-500 underline hover:text-gray-600">Skip for now</button>
                    </div>
                    <div className="flex-1 flex-col items-center pt-4 w-full overflow-y-auto">
                        <h1 className="text-3xl text-gray-800 font-poppins font-bold text-center mb-4">Exercise</h1>
                        <div className="flex flex-col w-full px-6 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                                <div className="flex flex-row justify-between items-center w-full">
                                    <div className="flex flex-col items-center">
                                        <h1 className="text-gray-600 font-poppins font-medium mb-1">Types of exercise</h1>
                                        <select value={setup.exercise1} onChange={handleTypeChange1} className="rounded-md px-3 py-1 w-36 bg-white border border-gray-300 text-gray-700 font-poppins shadow-sm">
                                            <option value="none" disabled selected></option>
                                            <option value="Bodybuilding">Bodybuilding</option>
                                            <option value="Powerlifting">Powerlifting</option>
                                            <option value="Running">Running</option>
                                            <option value="Cycling">Cycling</option>
                                            <option value="Swimming">Swimming</option>
                                            <option value="Yoga">Yoga</option>
                                            <option value="Pilates">Pilates</option>
                                            <option value="CrossFit">CrossFit</option>
                                            <option value="HIIT">HIIT</option>
                                            <option value="Dancing">Dancing</option>
                                            <option value="Boxing">Boxing</option>
                                            <option value="Martial Arts">Martial Arts</option>
                                            <option value="Hiking">Hiking</option>
                                            <option value="Rowing">Rowing</option>
                                            <option value="Tennis">Tennis</option>
                                            <option value="Basketball">Basketball</option>
                                            <option value="Soccer">Soccer</option>
                                            <option value="Golf">Golf</option>
                                            <option value="Skiing">Skiing</option>
                                            <option value="Snowboarding">Snowboarding</option>
                                            <option value="Skating">Skating</option>
                                            <option value="Climbing">Climbing</option>
                                            <option value="Surfing">Surfing</option>
                                            <option value="Kayaking">Kayaking</option>
                                            <option value="Horseback Riding">Horseback Riding</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <h1 className="text-gray-600 font-poppins font-medium mb-1">Hours per week</h1>
                                        <select value={setup.exercise1Times} onChange={handleTimesChange1} className="rounded-md px-3 py-1 w-36 bg-white border border-gray-300 text-gray-700 font-poppins shadow-sm">
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
                            </div>

                            {setup.number > 1 && (
                                <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                                    <div className="flex flex-row justify-between items-center w-full">
                                        <div className="flex flex-col items-center">
                                            <h1 className="text-gray-600 font-poppins font-medium mb-1">Types of exercise</h1>
                                            <select value={setup.exercise2} onChange={handleTypeChange2} className="rounded-md px-3 py-1 w-36 bg-white border border-gray-300 text-gray-700 font-poppins shadow-sm">
                                                <option value="none" disabled selected></option>
                                                <option value="Bodybuilding">Bodybuilding</option>
                                                <option value="Powerlifting">Powerlifting</option>
                                                <option value="Running">Running</option>
                                                <option value="Cycling">Cycling</option>
                                                <option value="Swimming">Swimming</option>
                                                <option value="Yoga">Yoga</option>
                                                <option value="Pilates">Pilates</option>
                                                <option value="CrossFit">CrossFit</option>
                                                <option value="HIIT">HIIT</option>
                                                <option value="Dancing">Dancing</option>
                                                <option value="Boxing">Boxing</option>
                                                <option value="Martial Arts">Martial Arts</option>
                                                <option value="Hiking">Hiking</option>
                                                <option value="Rowing">Rowing</option>
                                                <option value="Tennis">Tennis</option>
                                                <option value="Basketball">Basketball</option>
                                                <option value="Soccer">Soccer</option>
                                                <option value="Golf">Golf</option>
                                                <option value="Skiing">Skiing</option>
                                                <option value="Snowboarding">Snowboarding</option>
                                                <option value="Skating">Skating</option>
                                                <option value="Climbing">Climbing</option>
                                                <option value="Surfing">Surfing</option>
                                                <option value="Kayaking">Kayaking</option>
                                                <option value="Horseback Riding">Horseback Riding</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <h1 className="text-gray-600 font-poppins font-medium mb-1">Hours per week</h1>
                                            <select value={setup.exercise2Times} onChange={handleTimesChange2} className="rounded-md px-3 py-1 w-36 bg-white border border-gray-300 text-gray-700 font-poppins shadow-sm">
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
                                </div>
                            )}

                            {setup.number > 2 && (
                                <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                                    <div className="flex flex-row justify-between items-center w-full">
                                        <div className="flex flex-col items-center">
                                            <h1 className="text-gray-600 font-poppins font-medium mb-1">Types of exercise</h1>
                                            <select value={setup.exercise3} onChange={handleTypeChange3} className="rounded-md px-3 py-1 w-36 bg-white border border-gray-300 text-gray-700 font-poppins shadow-sm">
                                                <option value="none" disabled selected></option>
                                                <option value="Bodybuilding">Bodybuilding</option>
                                                <option value="Powerlifting">Powerlifting</option>
                                                <option value="Running">Running</option>
                                                <option value="Cycling">Cycling</option>
                                                <option value="Swimming">Swimming</option>
                                                <option value="Yoga">Yoga</option>
                                                <option value="Pilates">Pilates</option>
                                                <option value="CrossFit">CrossFit</option>
                                                <option value="HIIT">HIIT</option>
                                                <option value="Dancing">Dancing</option>
                                                <option value="Boxing">Boxing</option>
                                                <option value="Martial Arts">Martial Arts</option>
                                                <option value="Hiking">Hiking</option>
                                                <option value="Rowing">Rowing</option>
                                                <option value="Tennis">Tennis</option>
                                                <option value="Basketball">Basketball</option>
                                                <option value="Soccer">Soccer</option>
                                                <option value="Golf">Golf</option>
                                                <option value="Skiing">Skiing</option>
                                                <option value="Snowboarding">Snowboarding</option>
                                                <option value="Skating">Skating</option>
                                                <option value="Climbing">Climbing</option>
                                                <option value="Surfing">Surfing</option>
                                                <option value="Kayaking">Kayaking</option>
                                                <option value="Horseback Riding">Horseback Riding</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <h1 className="text-gray-600 font-poppins font-medium mb-1">Hours per week</h1>
                                            <select value={setup.exercise3Times} onChange={handleTimesChange3} className="rounded-md px-3 py-1 w-36 bg-white border border-gray-300 text-gray-700 font-poppins shadow-sm">
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
                                </div>
                            )}

                            <div className="flex flex-row gap-4 justify-center">
                                {+setup.number < 3 && <button onClick={() => setSetup({ ...setup, number: setup.number + 1 })} className="bg-gray-400 text-xl text-gray-100 h-6 w-16 flex flex-row justify-center items-center rounded-2xl pb-1 hover:bg-gray-500">+</button>}
                                {+setup.number > 1 && <button onClick={() => lower()} className="bg-gray-400 text-xl text-gray-100 h-6 w-16 flex flex-row justify-center items-center rounded-2xl pb-1 hover:bg-gray-500">-</button>}
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-4 border-t border-gray-200 flex justify-between relative">
                        <button onClick={() => navigate('/setup/food', { state: { setup: setup } })} className="px-4 py-1 bg-blue-500 text-white rounded-md text-lg font-poppins font-semibold hover:bg-blue-600">Back</button>
                        <img className="absolute inset-0 m-auto w-20" src={twoOFthree} alt="" />
                        <button onClick={() => { if (active) { navigate('/setup/sleep', { state: { setup: setup } }) } }} className={`px-4 py-1 text-white rounded-md text-lg font-poppins font-semibold ${active ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'}`}>Next</button>
                    </div>
                </div>
            </div>
            {JSON.parse(localStorage.getItem('user')).user.step == 0 ? <ProfilePage /> : <HomePage />}
        </div>
    );
}
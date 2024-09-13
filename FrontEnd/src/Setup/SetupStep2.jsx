import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import { ProfilePage } from "../Profile/ProfilePage";
import { HomePage } from "../MainPage/HomePage";
import twoOFthree from '../../assets/images/twoOFthree.png';
import { FaDumbbell } from 'react-icons/fa';

export function SetupStep2() {
    const navigate = useNavigate();
    const location = useLocation();
    const [setup, setSetup] = useState(location.state.setup);
    const [active, setActive] = useState(false);

    const skipSetup = () => {
        axios.put('http://localhost:3000/skipSetup', {
            id: JSON.parse(localStorage.getItem('user'))._id
        }).then((res) => {
            localStorage.setItem('user', JSON.stringify(res.data));
            navigate('/feed/home');
        }).catch((err) => {
            console.log(err);
        });
    };

    useEffect(() => {
        if (setup.number === 1) {
            if (setup.exercise1 !== 'none' && setup.exercise1Times !== 'none') {
                setActive(true);
            } else {
                setActive(false);
            }
        } else if (setup.number === 2) {
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
        if (setup.number - 1 === 1) {
            setSetup({ ...setup, exercise2: 'none', exercise2Times: 'none', number: 1 });
        } else {
            setSetup({ ...setup, exercise3: 'none', exercise3Times: 'none', number: 2 });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <div className="flex flex-row justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                        <FaDumbbell className="inline-block mr-2" />
                        Step 2: Exercise Setup
                    </h2>
                    <button onClick={skipSetup} className="text-gray-500 underline hover:text-gray-600">Skip for now</button>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Exercise 1</label>
                    <select 
                        value={setup.exercise1} 
                        onChange={handleTypeChange1}
                        className="w-full p-2 border rounded"
                    >
                        <option value="none" disabled selected>Select Exercise</option>
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
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Hours per week</label>
                    <select 
                        value={setup.exercise1Times} 
                        onChange={handleTimesChange1}
                        className="w-full p-2 border rounded"
                    >
                        <option value="none" disabled selected>Select Hours</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                    </select>
                </div>
                {setup.number > 1 && <hr className="my-4 border-gray-300" />}
                {setup.number > 1 && (
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Exercise 2</label>
                        <select 
                            value={setup.exercise2} 
                            onChange={handleTypeChange2}
                            className="w-full p-2 border rounded"
                        >
                            <option value="none" disabled selected>Select Exercise</option>
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
                )}
                {setup.number > 1 && (
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Hours per week</label>
                        <select 
                            value={setup.exercise2Times} 
                            onChange={handleTimesChange2}
                            className="w-full p-2 border rounded"
                        >
                            <option value="none" disabled selected>Select Hours</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                        </select>
                    </div>
                )}
                {setup.number > 2 && <hr className="my-4 border-gray-300" />}
                {setup.number > 2 && (
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Exercise 3</label>
                        <select 
                            value={setup.exercise3} 
                            onChange={handleTypeChange3}
                            className="w-full p-2 border rounded"
                        >
                            <option value="none" disabled selected>Select Exercise</option>
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
                )}
                {setup.number > 2 && (
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Hours per week</label>
                        <select 
                            value={setup.exercise3Times} 
                            onChange={handleTimesChange3}
                            className="w-full p-2 border rounded"
                        >
                            <option value="none" disabled selected>Select Hours</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                        </select>
                    </div>
                )}
                <div className="flex justify-between">
                    {setup.number > 1 && (
                        <button 
                            onClick={lower}
                            className="bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-200"
                        >
                            -
                        </button>
                    )}
                    {setup.number < 3 && (
                        <button 
                            onClick={() => setSetup({ ...setup, number: setup.number + 1 })}
                            className="bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-200"
                        >
                            +
                        </button>
                    )}
                </div>
                <div className="flex justify-end mt-4">
                    <button 
                        onClick={() => navigate('/setup/food', { state: { setup: setup } })}
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200"
                    >
                        Back
                    </button>
                    <button 
                        onClick={() => { if (active) { navigate('/setup/sleep', { state: { setup: setup } }) } }}
                        className={`ml-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200 ${active ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'}`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
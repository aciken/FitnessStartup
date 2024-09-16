import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUtensils, FaClock, FaFire, FaBed, FaArrowLeft, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { ProfilePage } from "../Profile/ProfilePage";
import { HomePage } from "../MainPage/HomePage";
import oneOFthree from '../../assets/images/oneOFthree.png';

export function SetupStep1() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const intervalId = setInterval(() => {
            const user = JSON.parse(localStorage.getItem('user'))._id
            console.log('User from localStorage:', user);
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    const [setup, setSetup] = useState({
        diet: 'none',
        meals: 'none',
        fast: 'none',
        exercise1: 'none',
        exercise1Times: 'none',
        exercise2: 'none',
        exercise2Times: 'none',
        exercise3: 'none',
        exercise3Times: 'none',
        sleep: 'none',
        bed: 'none',
        varies: 'none',
        calories: 2000,
        number: 1,
    });

    useEffect(() => {
        console.log(setup);
        if (location.state) {
            setSetup(location.state.setup);
        }
    }, [location.state]);

    const next = () => {
        if (setup.diet !== 'none' && setup.meals !== 'none' && setup.fast !== 'none') {
            console.log(setup);
            navigate('/setup/exercise', { state: { setup: setup } });
        }
    };

    const changeDiet = (e) => {
        setSetup({ ...setup, diet: e.target.value });
    };

    const changeMeals = (e) => {
        setSetup({ ...setup, meals: e.target.value });
    };

    const changeFast = (e) => {
        setSetup({ ...setup, fast: e.target.value });
    };

    const handleCaloriesChange = (e) => {
        setSetup({ ...setup, calories: Number(e.target.value) });
    };

    const skipSetup = () => {
        console.log(JSON.parse(localStorage.getItem('user')));
        axios.put('http://localhost:3000/skipSetup', {
            id: JSON.parse(localStorage.getItem('user'))._id
        }).then((res) => {
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/feed/all');
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full backdrop-blur-sm">
                <div className="flex flex-row justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                        <FaUtensils className="inline-block mr-2" />
                        Step 1: Diet Setup
                    </h2>
                    <button onClick={skipSetup} className="text-gray-500 underline hover:text-gray-600">Skip for now</button>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Daily Calorie Intake</label>
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex flex-row gap-2 items-center">
                            <input
                                type="number"
                                value={setup.calories}
                                onChange={handleCaloriesChange}
                                className="rounded-md px-3 py-2 w-24 h-10 text-sm bg-white border border-gray-300 text-gray-700 shadow-sm"
                            />
                            <span className="text-gray-700 text-sm">Kcal</span>
                        </div>
                        <input
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            min={1}
                            max={10000}
                            type="range"
                            value={setup.calories}
                            onChange={handleCaloriesChange}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Diet Type</label>
                    <select 
                        value={setup.diet} 
                        onChange={changeDiet}
                        className="w-full p-2 border rounded"
                    >
                        <option value="none" disabled selected>Select Diet Type</option>
                        <option value="Omnivore">Omnivore</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Vegan">Vegan</option>
                        <option value="Pescatarian">Pescatarian</option>
                        <option value="Keto">Keto</option>
                        <option value="Paleo">Paleo</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Meals per Day</label>
                    <select 
                        value={setup.meals} 
                        onChange={changeMeals}
                        className="w-full p-2 border rounded"
                    >
                        <option value="none" disabled selected>Select Meals per Day</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
                <div className="mb-4">
                        <div className="mt-2">
                            <label className="block text-gray-700 mb-2">Fasting Hours</label>
                            <select 
                                value={setup.fast} 
                                onChange={(e) => changeFast(e)}
                                className="w-full p-2 border rounded"
                            >
                                <option value="none" disabled selected>Select Fasting Hours</option>
                                <option value="No">Not Fasting</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>  
                                <option value="24">24</option>
                            </select>
                        </div>
                </div>
                <div className="flex justify-end">
                    <button 
                        onClick={next}
                        className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200 ${setup.diet !== 'none' && setup.meals !== 'none' && setup.fast !== 'none' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'}`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
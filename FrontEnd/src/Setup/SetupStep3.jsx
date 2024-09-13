import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import { ProfilePage } from "../Profile/ProfilePage";
import { HomePage } from "../MainPage/HomePage";
import threeOFthree from '../../assets/images/threeOFthree.png';
import { FaBed } from 'react-icons/fa';

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
        if (location.state) {
            setSetup(location.state.setup);
        }
    }, [location.state]);

    const finishSetup = () => {
        console.log(JSON.parse(localStorage.getItem('user'))._id)
        if (setup.sleep !== 'none' && setup.bed !== 'none' && setup.varies !== 'none') {
            axios.put('http://localhost:3000/finishSetup', {
                id: JSON.parse(localStorage.getItem('user'))._id,
                setup: setup
            }).then((res) => {
                localStorage.setItem('user', JSON.stringify(res.data));
                navigate('/feed/home');
            }).catch((err) => {
                console.log(err);
            });
        }
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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <div className="flex flex-row justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                        <FaBed className="inline-block mr-2" />
                        Step 3: Sleep Setup
                    </h2>
                    <button onClick={skipSetup} className="text-gray-500 underline hover:text-gray-600">Skip for now</button>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Hours of sleep</label>
                    <select 
                        value={setup.sleep} 
                        onChange={changeSleep}
                        className="w-full p-2 border rounded"
                    >
                        <option value="none" disabled selected>Select Hours</option>
                        {[3, 4, 5, 6, 7, 8, 9, 10].map(hour => (
                            <option key={hour} value={hour}>{hour}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Bedtime</label>
                    <input 
                        type="time" 
                        value={setup.bed} 
                        onChange={changeBed}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Sleep schedule variation (1-10)</label>
                    <select 
                        value={setup.varies} 
                        onChange={changeVaries}
                        className="w-full p-2 border rounded"
                    >
                        <option value="none" disabled selected>Select Variation</option>
                        {Array.from({ length: 10 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-end mt-4">
                    <button 
                        onClick={() => navigate('/setup/exercise', { state: { setup: setup } })}
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200"
                    >
                        Back
                    </button>
                    <button 
                        onClick={finishSetup}
                        className={`ml-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200 ${setup.sleep !== 'none' && setup.bed !== 'none' && setup.varies !== 'none' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'}`}
                    >
                        Finish
                    </button>
                </div>
            </div>
        </div>
    );
}
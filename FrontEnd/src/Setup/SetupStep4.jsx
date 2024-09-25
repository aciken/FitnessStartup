import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaVenusMars, FaWeight, FaRuler, FaExchangeAlt } from 'react-icons/fa';
import axios from 'axios';

export function SetupStep4() {
    const navigate = useNavigate();
    const location = useLocation();

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
        description: '',
        gender: 'none',
        weight: '',
        height: '',
        unitWeight: 'kg',
        unitHeight: 'cm'
    });

    useEffect(() => {
        console.log(setup);
        if (location.state) {
            console.log('yesss')
            
            setSetup(location.state.setup);
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSetup(prevSetup => ({ ...prevSetup, [name]: value }));
    };

    const toggleUnits = (type) => {
        if (type === 'weight') {
            const newUnit = setup.unitWeight === 'kg' ? 'lbs' : 'kg';
            setSetup(prev => ({ 
                ...prev, 
                unitWeight: newUnit,
                weight: newUnit === 'kg' ? 
                    (parseFloat(prev.weight) / 2.20462).toFixed(1) : 
                    (parseFloat(prev.weight) * 2.20462).toFixed(1)
            }));
        } else if (type === 'height') {
            const newUnit = setup.unitHeight === 'cm' ? 'ft' : 'cm';
            setSetup(prev => ({ 
                ...prev, 
                unitHeight: newUnit,
                height: newUnit === 'cm' ? 
                    (parseFloat(prev.height) * 30.48).toFixed(1) : 
                    (parseFloat(prev.height) / 30.48).toFixed(2)
            }));
        }
    };

    const next = () => {
        if (setup.gender !== 'none' && setup.weight && setup.height && setup.description) {
            navigate('/setup/food', { state: { setup: setup } });
        }
    };

    const skipSetup = () => {
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
                        <FaUser className="inline-block mr-2" />
                        Step 1: Personal Details
                    </h2>
                    <button onClick={skipSetup} className="text-gray-500 underline hover:text-gray-600">Skip for now</button>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Description</label>
                    <textarea
                        name="description"
                        value={setup.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        rows="3"
                        placeholder="Tell us about yourself..."
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                        <FaVenusMars className="inline mr-2" /> Gender
                    </label>
                    <select 
                        name="gender"
                        value={setup.gender} 
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="none" disabled>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2 flex justify-between items-center">
                        <span><FaWeight className="inline mr-2" /> Weight ({setup.unitWeight})</span>
                        <button onClick={() => toggleUnits('weight')} className="text-blue-500 hover:text-blue-600">
                            <FaExchangeAlt className="inline mr-1" /> 
                            Switch to {setup.unitWeight === 'kg' ? 'lbs' : 'kg'}
                        </button>
                    </label>
                    <div className="flex items-center space-x-4">
                        <input
                            type="number"
                            name="weight"
                            value={setup.weight}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder={`Enter your weight in ${setup.unitWeight}`}
                        />
                        <span>{setup.unitWeight}</span>
                    </div>
                    <input 
                        type="range" 
                        min={setup.unitWeight === 'kg' ? 30 : 66}
                        max={setup.unitWeight === 'kg' ? 230 : 507}
                        step="1"
                        value={setup.weight} 
                        onChange={(e) => setSetup(prev => ({ ...prev, weight: e.target.value }))}
                        className="w-full mt-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2 flex justify-between items-center">
                        <span><FaRuler className="inline mr-2" /> Height ({setup.unitHeight})</span>
                        <button onClick={() => toggleUnits('height')} className="text-blue-500 hover:text-blue-600">
                            <FaExchangeAlt className="inline mr-1" /> 
                            Switch to {setup.unitHeight === 'cm' ? 'ft' : 'cm'}
                        </button>
                    </label>
                    {setup.unitHeight === 'cm' ? (
                        <input
                            type="number"
                            name="height"
                            value={setup.height}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Enter your height in cm"
                        />
                    ) : (
                        <div className="flex items-center space-x-2">
                            <input 
                                type="number" 
                                value={Math.floor(setup.height)}
                                onChange={(e) => setSetup(prev => ({ ...prev, height: parseFloat(e.target.value) + (prev.height % 1) }))}
                                className="w-1/2 p-2 border rounded"
                                placeholder="Feet"
                            />
                            <span>ft</span>
                            <input 
                                type="number" 
                                value={Math.round((setup.height % 1) * 12)}
                                onChange={(e) => setSetup(prev => ({ ...prev, height: Math.floor(prev.height) + (e.target.value / 12) }))}
                                className="w-1/2 p-2 border rounded"
                                placeholder="Inches"
                            />
                            <span>in</span>
                        </div>
                    )}
                    <input 
                        type="range" 
                        min={setup.unitHeight === 'cm' ? 120 : 3.94}
                        max={setup.unitHeight === 'cm' ? 240 : 7.87}
                        step={setup.unitHeight === 'cm' ? 1 : 0.01}
                        value={setup.height} 
                        onChange={(e) => setSetup(prev => ({ ...prev, height: e.target.value }))}
                        className="w-full mt-2"
                    />
                </div>
                <div className="flex justify-end">
                    <button 
                        onClick={next}
                        className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200 ${setup.gender !== 'none' && setup.weight && setup.height ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'}`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

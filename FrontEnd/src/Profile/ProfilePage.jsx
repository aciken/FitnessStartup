import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { LeftTab } from '../MainPage/LeftTab';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown, FaChevronUp, FaExchangeAlt, FaCheck, FaTrash } from 'react-icons/fa';
import { PostPopup } from '../Post/PostPopup';

export function ProfilePage() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState('diet');
    const [user, setUser] = useState(null);
    const [expandedCard, setExpandedCard] = useState(null);
    const [isPostPopupOpen, setIsPostPopupOpen] = useState(false);
    const [selectedChange, setSelectedChange] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser).user);
        }
    }, []);

    const removeChange = useCallback(async (change, email) => {
        try {
            const response = await axios.put('http://localhost:3000/removeChange', {
                change, email
            });
            
            const updatedUser = response.data.user;
            localStorage.setItem('user', JSON.stringify({ user: updatedUser }));
            
            setUser(prevUser => ({
                ...prevUser,
                ...updatedUser,
                changing: updatedUser.changing || {}
            }));
        } catch (err) {
            console.error('Error removing change:', err);
        }
    }, []);

    const getFromBetterName = (key) => {
        const nameMap = {
            'Diet Type': 'diet',
            'Meals per Day': 'meals',
            'Fasting Schedule': 'fast',
            'Fasting Hours': 'fastHours',
            'Exercise 1': 'exercise1',
            'Exercise 1 Frequency': 'exercise1Times',
            'Exercise 2': 'exercise2',
            'Exercise 2 Frequency': 'exercise2Times',
            'Exercise 3': 'exercise3',
            'Exercise 3 Frequency': 'exercise3Times',
            'Sleep Duration': 'sleep',
            'Bedtime': 'bed',
            'Sleep Variation': 'varies',
            'Calorie Intake': 'calories'
        };
        return nameMap[key] || key.charAt(0).toUpperCase() + key.slice(1);
    };

    const getBetterName = useCallback((key) => {
        const nameMap = {
            diet: 'Diet Type',
            meals: 'Meals per Day',
            fast: 'Fasting Schedule',
            fastHours: 'Fasting Hours',
            exercise1: 'Exercise 1',
            exercise1Times: 'Exercise 1 Frequency',
            exercise2: 'Exercise 2',
            exercise2Times: 'Exercise 2 Frequency',
            exercise3: 'Exercise 3',
            exercise3Times: 'Exercise 3 Frequency',
            sleep: 'Sleep Duration',
            bed: 'Bedtime',
            varies: 'Sleep Variation',
            calories: 'Calorie Intake'
        };
        return nameMap[key] || key.charAt(0).toUpperCase() + key.slice(1);
    }, []);

    const handlePostClick = useCallback((title, value, changingValue) => {
        setSelectedChange({ title, fromValue: value, toValue: changingValue });
        setIsPostPopupOpen(true);
    }, []);

    const renderInfoCard = useCallback((title, value, changingValue, isChanging, index) => (
        <div 
            className={`
                bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out
                ${isChanging ? 'border-l-4 border-blue-500' : ''}
                ${expandedCard === index ? 'max-h-96' : 'max-h-48'}
                ${isChanging ? 'hover:bg-gray-50 cursor-pointer' : ''}
            `}
            onClick={() => {
                if (isChanging) {
                    setExpandedCard(expandedCard === index ? null : index);
                }
            }}
        >
            <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                    {isChanging && (
                        <span className="flex items-center px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                            <FaExchangeAlt className="mr-1" />
                            Changing
                        </span>
                    )}
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-2">
                    {selected === 'changing' ? changingValue : value || 'Not specified'}
                </p>
                {isChanging && (
                    <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm text-blue-600 font-medium">
                            <span>{expandedCard === index ? 'Hide details' : 'View details'}</span>
                            {expandedCard === index ? <FaChevronUp className="ml-1" /> : <FaChevronDown className="ml-1" />}
                        </div>
                        {selected === 'changing' && (
                            <div className="flex items-center space-x-2">
                                <button
                                    className="bg-blue-500 text-white font-semibold py-1 px-3 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 flex items-center text-sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handlePostClick(title, value, changingValue);
                                    }}
                                >
                                    <FaCheck className="mr-1" />
                                    Post
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeChange(getFromBetterName(title), user.email);
                                    }}
                                >
                                    <FaTrash className="text-lg" />
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {isChanging && (
                <div className={`bg-gray-50 p-6 transition-all duration-300 ease-in-out ${expandedCard === index ? 'opacity-100 max-h-48' : 'opacity-0 max-h-0'}`}>
                    <p className="text-sm font-medium text-gray-500 mb-2">
                        {selected === 'changing' ? 'Current value:' : 'Changing to:'}
                    </p>
                    <p className="text-xl font-bold text-blue-700 mb-4">
                        {selected === 'changing' ? value : changingValue || 'Not specified'}
                    </p>
                    {selected !== 'changing' && (
                        <div className="flex items-center space-x-2">
                            <button
                                className="bg-blue-500 text-white font-semibold py-1 px-3 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 flex items-center text-sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handlePostClick(title, value, changingValue);
                                }}
                            >
                                <FaCheck className="mr-1" />
                                Post
                            </button>
                            <button
                                className="text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeChange(getFromBetterName(title), user.email);
                                }}
                            >
                                <FaTrash className="text-lg" />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    ), [expandedCard, selected, removeChange, handlePostClick, user]);

    const getInfoCards = useCallback(() => {
        if (!user || !user.setup) return [];

        const { setup, changing } = user;
        const { diet, meals, fast, fastHours, exercise1, exercise1Times, exercise2, exercise2Times, exercise3, exercise3Times, sleep, bed, varies, calories } = setup;

        const formatExercise = (exercise, times) => {
            if (exercise === 'none') return null;
            return `${exercise} (${times} times a week)`;
        };

        switch (selected) {
            case 'diet':
                return [
                    { title: 'Calorie Intake', value: `${calories} calories`, changingValue: changing.calories ? `${changing.calories} calories` : undefined, isChanging: !!changing.calories },
                    { title: 'Diet Type', value: diet, changingValue: changing.diet, isChanging: !!changing.diet },
                    { title: 'Meals per Day', value: meals, changingValue: changing.meals, isChanging: !!changing.meals },
                    { title: 'Fasting Schedule', value: fast, changingValue: changing.fast, isChanging: !!changing.fast },
                    { title: 'Fasting Hours', value: fastHours, changingValue: changing.fastHours, isChanging: !!changing.fastHours }
                ];
            case 'exercise':
                return [
                    { title: 'Exercise 1', value: formatExercise(exercise1, exercise1Times), changingValue: changing.exercise1 ? formatExercise(changing.exercise1, changing.exercise1Times) : undefined, isChanging: !!changing.exercise1 },
                    { title: 'Exercise 2', value: formatExercise(exercise2, exercise2Times), changingValue: changing.exercise2 ? formatExercise(changing.exercise2, changing.exercise2Times) : undefined, isChanging: !!changing.exercise2 },
                    { title: 'Exercise 3', value: formatExercise(exercise3, exercise3Times), changingValue: changing.exercise3 ? formatExercise(changing.exercise3, changing.exercise3Times) : undefined, isChanging: !!changing.exercise3 }
                ];
            case 'sleep':
                return [
                    { title: 'Sleep Duration', value: `${sleep} hours`, changingValue: changing.sleep ? `${changing.sleep} hours` : undefined, isChanging: !!changing.sleep },
                    { title: 'Bedtime', value: bed, changingValue: changing.bed, isChanging: !!changing.bed },
                    { title: 'Sleep Variation', value: `${varies}/10`, changingValue: changing.varies ? `${changing.varies}/10` : undefined, isChanging: !!changing.varies }
                ];
            case 'changing':
                return Object.entries(changing)
                    .filter(([_, value]) => value !== null && value !== undefined && value !== '')
                    .map(([key, value]) => ({ 
                        title: getBetterName(key), 
                        value: setup[key], 
                        changingValue: String(value), 
                        isChanging: true 
                    }));
            default:
                return [];
        }
    }, [user, selected, getBetterName]);

    const tabs = ['diet', 'exercise', 'sleep', 'changing'];

    return (
        <div className="flex flex-row min-h-screen bg-gray-100">
            <LeftTab current='Profile' />
            <div className='w-full p-8'>
                <div className='max-w-6xl mx-auto'>
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile Information</h1>
                    <div className='mb-8 border-b border-gray-200'>
                        <nav className='flex flex-row justify-between items-center'>
                            <div className='-mb-px flex flex-row space-x-8'>
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setSelected(tab)}
                                        className={`${
                                            selected === tab
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm uppercase transition duration-150 ease-in-out`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => navigate('/profile/change', {state: {from: 'diet'}})}
                                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-2.5 px-5 rounded-full shadow-md hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center text-sm"
                            >
                                <FaPencilAlt className="mr-2 text-sm" />
                                Change
                            </button>
                        </nav>
                    </div>
                    {user ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {getInfoCards().map((card, index) => (
                                card.value && renderInfoCard(card.title, card.value, card.changingValue, card.isChanging, index)
                            ))}
                        </div>
                    ) : (
                        <div className='bg-white border border-gray-200 rounded-lg p-8 text-center shadow-md'>
                            <p className="text-xl text-gray-600">No user data available</p>
                        </div>
                    )}
                </div>
            </div>
            <PostPopup 
                isOpen={isPostPopupOpen}
                onClose={() => setIsPostPopupOpen(false)}
                changeInfo={selectedChange}
            />
        </div>
    );
}
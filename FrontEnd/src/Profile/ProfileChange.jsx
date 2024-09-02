import { useState, useEffect } from "react";
import { ProfilePage } from "./ProfilePage";
import { useNavigate } from "react-router-dom";
import { FaUser, FaUtensils, FaDumbbell, FaBed, FaArrowLeft, FaTimes } from 'react-icons/fa';

export function ProfileChange() {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [userData, setUserData] = useState(null);
    const [newValue, setNewValue] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUserData(JSON.parse(storedUser).user.setup);
        }
    }, []);

    const categories = {
        diet: ['Calorie Intake', 'Diet Type', 'Meals per Day', 'Fasting'],
        exercise: ['Exercise 1', 'Exercise 2', 'Exercise 3'],
        sleep: ['Sleep Duration', 'Bedtime', 'Sleep Variation']
    };

    const categoryIcons = {
        diet: <FaUtensils className="inline-block mr-2" />,
        exercise: <FaDumbbell className="inline-block mr-2" />,
        sleep: <FaBed className="inline-block mr-2" />
    };

    const dietOptions = ["Omnivore", "Vegetarian", "Vegan", "Pescatarian", "Keto", "Paleo"];
    const fastingScheduleOptions = ["16/8", "18/6", "20/4", "None"];
    const mealOptions = Array.from({ length: 6 }, (_, i) => (i + 1).toString());
    const fastingHoursOptions = ["Not Fasting", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"];
    const exerciseOptions = ["Running", "Cycling", "Swimming", "Weightlifting", "Yoga", "None"];
    const sleepVariationOptions = Array.from({ length: 11 }, (_, i) => i.toString());

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setSelectedOption(null);
        setNewValue('');
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setNewValue(getCurrentValue(selectedCategory, option));
    };

    const getCurrentValue = (category, option) => {
        if (!userData) return 'Loading...';

        switch (category) {
            case 'diet':
                switch (option) {
                    case 'Calorie Intake': return userData.calories;
                    case 'Diet Type': return userData.diet;
                    case 'Meals per Day': return userData.meals;
                    case 'Fasting': return userData.fast;
                }
                break;
            case 'exercise':
                switch (option) {
                    case 'Exercise 1': return userData.exercise1;
                    case 'Exercise 2': return userData.exercise2;
                    case 'Exercise 3': return userData.exercise3;
                }
                break;
            case 'sleep':
                switch (option) {
                    case 'Sleep Duration': return userData.sleep;
                    case 'Bedtime': return userData.bed;
                    case 'Sleep Variation': return userData.varies;
                }
                break;
        }
        return 'N/A';
    };

    const renderInput = () => {
        switch (selectedCategory) {
            case 'diet':
                switch (selectedOption) {
                    case 'Calorie Intake':
                        return (
                            <input 
                                type="range" 
                                min="1" 
                                max="10000" 
                                step="10" 
                                value={newValue} 
                                onChange={(e) => setNewValue(e.target.value)}
                                className="w-full"
                            />
                        );
                    case 'Diet Type':
                        return (
                            <select 
                                value={newValue} 
                                onChange={(e) => setNewValue(e.target.value)}
                                className="w-full p-2 border rounded"
                            >
                                {dietOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        );
                    case 'Meals per Day':
                        return (
                            <select 
                                value={newValue} 
                                onChange={(e) => setNewValue(e.target.value)}
                                className="w-full p-2 border rounded"
                            >
                                {mealOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        );
                    case 'Fasting':
                        return (
                            <select 
                                value={newValue} 
                                onChange={(e) => setNewValue(e.target.value)}
                                className="w-full p-2 border rounded"
                            >
                                {fastingHoursOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        );
                }
                break;
            case 'exercise':
                return (
                    <select 
                        value={newValue} 
                        onChange={(e) => setNewValue(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        {exerciseOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                );
            case 'sleep':
                switch (selectedOption) {
                    case 'Sleep Duration':
                        return (
                            <input 
                                type="number" 
                                value={newValue} 
                                onChange={(e) => setNewValue(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        );
                    case 'Bedtime':
                        return (
                            <input 
                                type="time" 
                                value={newValue} 
                                onChange={(e) => setNewValue(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        );
                    case 'Sleep Variation':
                        return (
                            <select 
                                value={newValue} 
                                onChange={(e) => setNewValue(e.target.value)}
                                className="w-full p-2 border rounded"
                            >
                                {sleepVariationOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        );
                }
                break;
        }
    };
    
    return (
        <div className="min-h-[100vh] w-full relative">
            <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                            <FaUser className="inline-block mr-2" />
                            Change Information
                        </h2>
                        <button
                            onClick={() => navigate('/profile')}
                            className="text-gray-500 hover:text-gray-700 transition duration-200"
                        >
                            <FaTimes size={24} />
                        </button>
                    </div>
                    
                    {!selectedCategory ? (
                        <div>
                            <p className="mb-4 text-gray-600">Select a category to change:</p>
                            <div className="space-y-2">
                                {Object.keys(categories).map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => handleCategorySelect(category)}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center"
                                    >
                                        {categoryIcons[category]}
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : !selectedOption ? (
                        <div>
                            <p className="mb-4 text-gray-600">Select what you want to change in {selectedCategory}:</p>
                            <div className="space-y-2">
                                {categories[selectedCategory].map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => handleOptionSelect(option)}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className="mt-4 text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:underline flex items-center"
                            >
                                <FaArrowLeft className="inline-block mr-1" />
                                Back to categories
                            </button>
                        </div>
                    ) : (
                        <div>
                            <p className="mb-2 text-gray-600">Current {selectedOption}:</p>
                            <p className="mb-4 text-lg font-semibold text-gray-800">{getCurrentValue(selectedCategory, selectedOption)}</p>
                            <p className="mb-2 text-gray-600">Enter new value:</p>
                            {renderInput()}
                            <button
                                onClick={() => setSelectedOption(null)}
                                className="mt-4 text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:underline flex items-center"
                            >
                                <FaArrowLeft className="inline-block mr-1" />
                                Back to options
                            </button>
                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={() => {/* Add your change logic here */}}
                                    className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none  transition duration-200 flex items-center ${newValue != getCurrentValue(selectedCategory, selectedOption) ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'}`}
                                >
                                    Change
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ProfilePage/>
        </div>
    )
}
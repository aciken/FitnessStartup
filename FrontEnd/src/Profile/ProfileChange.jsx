import { useState, useEffect, useContext } from "react";
import { ProfilePage } from "./ProfilePage";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FaUser, FaUtensils, FaDumbbell, FaBed, FaArrowLeft, FaTimes } from 'react-icons/fa';
import { ProfileDiet } from "./ProfileDiet";
import { ProfileExercise } from "./ProfileExercise";
import { ProfileSleep } from "./ProfileSleep";
import { ProfileChangePage } from "./ProfileChangePage";
import axios from "axios";
import { PostStartPopup } from "../Post/PostStartPopup";
import { useProfileFunctions } from "./useProfileFunctions";
import { HomePage } from "../MainPage/HomePage";



export function ProfileChange() {
    const navigate = useNavigate();
    const location = useLocation();
    const { category, option } = useParams();
    const from = location.state?.from;
    const [selectedCategory, setSelectedCategory] = useState(category || null);
    const [selectedOption, setSelectedOption] = useState(option ? option.replace(/-/g, ' ') : null);
    const [userData, setUserData] = useState(null);
    const [newValue, setNewValue] = useState('');
    const [exerciseTimes, setExerciseTimes] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));
    const [units, setUnits] = useState({ 

    });
 

    const{ 
        isStartChangePopupOpen,
        setIsStartChangePopupOpen,
        selectedStart,
        setSelectedStart,
        handleStartClick,

        } = useProfileFunctions();


    useEffect(() => {
        console.log(from)
    }, [from])

    useEffect(() => {
        const intervalId = setInterval(() => {
            console.log(isStartChangePopupOpen);
        }, 3000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, [isStartChangePopupOpen])

    const getFromPage = () => {
        switch(from){
            case 'diet':
                return <ProfileDiet/>;
            case 'exercise':
                return <ProfileExercise/>;
            case 'sleep':
                return <ProfileSleep/>;
            case 'main':
                return <HomePage/>;
            default:
                return <ProfileChangePage/>;
        }
    }

    

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserData(parsedUser.setup);
            setUserEmail(parsedUser.email);
            // Update units based on user preferences without changing the values

        }
    }, []);

    useEffect(() => {
        if (category) {
            setSelectedCategory(category);
        }
        if (option) {
            const formattedOption = option.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            setSelectedOption(formattedOption);
        }
    }, [category, option]);

    useEffect(() => {
        if (selectedCategory === 'exercise' && selectedOption && userData) {
            setNewValue(getCurrentValue(selectedCategory, selectedOption));
            setExerciseTimes(getCurrentExerciseTimes(selectedOption));
        }
    }, [selectedCategory, selectedOption, userData]);

    const categories = {
        diet: ['Calorie Intake', 'Diet Type', 'Meals Per Day', 'Fasting'],
        exercise: ['Exercise 1', 'Exercise 2', 'Exercise 3'],
        sleep: ['Sleep Duration', 'Bedtime', 'Sleep Variation'],
    };

    const categoryIcons = {
        diet: <FaUtensils className="inline-block mr-2" />,
        exercise: <FaDumbbell className="inline-block mr-2" />,
        sleep: <FaBed className="inline-block mr-2" />,
    };

    const dietOptions = ["Omnivore", "Vegetarian", "Vegan", "Pescatarian", "Keto", "Paleo"];
    const fastingScheduleOptions = ["Not Fasting", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"];
    const mealOptions = ['1', '2', '3', '4', '5', '6'];
    const exerciseOptions = ['Bodybuilding', 'Powerlifting', 'Running', 'Cycling', 'Swimming', 'Yoga', 'Pilates', 'CrossFit', 'HIIT', 'Dancing', 'Boxing', 'Martial Arts', 'Hiking', 'Rowing', 'Tennis', 'Basketball', 'Soccer', 'Golf', 'Skiing', 'Snowboarding', 'Skating', 'Climbing', 'Surfing', 'Kayaking', 'Horseback Riding'];
    const exerciseTimesOptions = ['none', '1', '2', '3', '4', '5', '6', '7'];
    const sleepVariationOptions = Array.from({ length: 11 }, (_, i) => i.toString());

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setSelectedOption(null);
        setNewValue('');
        navigate(`/profile/change/${category}`, {state: {from: from}});
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setNewValue(getCurrentValue(selectedCategory, option));
        navigate(`/profile/change/${selectedCategory}/${option.replace(/ /g, '-').toLowerCase()}`, {state: {from: from}});
    };

    const getCurrentValue = (category, option) => {
        if (!userData) return 'Loading...';

        const key = getKeyFromOption(option);
        let value = userData[key] || 'N/A';



        // if (option === 'Weight' && units.weight === 'lbs') {
        //     value = (parseFloat(value) * 2.20462).toFixed(1);
        // } else if (option === 'Height' && units.height === 'ft') {
        //     value = (parseFloat(value) / 30.48).toFixed(2);
        // }

        return value;
    };

    const getCurrentExerciseTimes = (option) => {
        if (!userData) return 'Loading...';
        const key = `${option.toLowerCase().replace(/ /g, '')}Times`;
        return userData[key] || 'none';
    };

    const getKeyFromOption = (option) => {
        const keyMap = {
            'Calorie Intake': 'calories',
            'Diet Type': 'diet',
            'Meals Per Day': 'meals',
            'Fasting': 'fast',
            'Exercise 1': 'exercise1',
            'Exercise 2': 'exercise2',
            'Exercise 3': 'exercise3',
            'Sleep Duration': 'sleep',
            'Bedtime': 'bed',
            'Sleep Variation': 'varies',

        };

        return keyMap[option] || option.toLowerCase().replace(/ /g, '');
    };

    useEffect(() => {

        if(selectedCategory && selectedOption){
            setNewValue(getCurrentValue(selectedCategory, selectedOption));
        }
    }, [selectedCategory, selectedOption]);





    const renderInput = () => {
        switch (selectedCategory) {
            case 'diet':
                switch (selectedOption) {
                    case 'Calorie Intake':
                        return (
                            <div className="flex items-center space-x-4">
                                <input 
                                    type="range" 
                                    min="10" 
                                    max="10000" 
                                    step="10" 
                                    value={newValue} 
                                    onChange={(e) => setNewValue(e.target.value)}
                                    className="w-full"
                                />
                                <input 
                                    type="number" 
                                    value={newValue} 
                                    onChange={(e) => setNewValue(e.target.value)}
                                    className="w-20 p-2 border rounded"
                                />
                            </div>
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
                    case 'Meals Per Day':
                        return (
                            <select 
                                value={newValue} 
                                onChange={(e) => setNewValue(e.target.value)}
                                className="w-full p-2 border rounded"
                            >
                                {mealOptions.map(num => (
                                    <>
                                        <p>{num}</p>
                                        <option key={num} value={num.toString()}>{num}</option>
                                    </>
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
                                {fastingScheduleOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        );
                }
                break;
            case 'exercise':
                return (
                    <>
                        <select 
                            value={newValue} 
                            onChange={(e) => setNewValue(e.target.value)}
                            className="w-full p-2 border rounded mb-2"
                        >
                            {exerciseOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        <select 
                            value={exerciseTimes} 
                            onChange={(e) => setExerciseTimes(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            {exerciseTimesOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </>
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

    const handleConfirmStart = async () => {
        if (selectedStart) {
            let value = newValue;
            if (selectedCategory === 'exercise') {
                value = `${newValue}|${exerciseTimes}`;
            } else if (selectedCategory === 'personal') {
                if (selectedStart.option === 'Weight' && units.weight === 'lbs') {
                    value = (parseFloat(value) / 2.20462).toFixed(1);
                } else if (selectedStart.option === 'Height' && units.height === 'ft') {
                    value = (parseFloat(value) * 30.48).toFixed(1);
                }
            }
            await addChange(getKeyFromOption(selectedStart.option), value);
            setIsStartChangePopupOpen(false);
        }
    };

    const addChange = async(change, value) => {
        try {
            const stringValue = value.toString();
            const response = await axios.put('http://localhost:3000/addChange', {
                change: change,
                value: stringValue,
                email: userEmail
            });
            if(response.data !== 'User not found' && response.data !== 'Internal Server Error'){
                localStorage.setItem('user', JSON.stringify(response.data.user));
                navigate('/profile/' + selectedCategory);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="min-h-[100vh] w-full z-1000">
            <div className="fixed inset-0 flex items-center justify-center z-[1001]">
                <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-50 z-[1002]"></div>
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full z-[1003] relative">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                            <FaUser className="inline-block mr-2" />
                            Change Information
                        </h2>
                        <button
                            onClick={() => {if(from == 'main')navigate('/feed/all'); else navigate('/profile/' + from)}}
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
                                onClick={() => {
                                    setSelectedCategory(null);
                                    navigate('/profile/change', {state: {from: from}});
                                }}
                                className="mt-4 text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:underline flex items-center"
                            >
                                <FaArrowLeft className="inline-block mr-1" />
                                Back to categories
                            </button>
                        </div>
                    ) : (
                        <div>
                            <p className="mb-2 text-gray-600">Current {selectedOption}:</p>
                            <p className="mb-4 text-lg font-semibold text-gray-800">{getCurrentValue(selectedCategory, selectedOption)} {getCurrentExerciseTimes(selectedOption) !== 'none' ? `(${getCurrentExerciseTimes(selectedOption)} times a week)` : ''}</p>
                            <p className="mb-2 text-gray-600">Enter new value:</p>
                            {renderInput()}
                            <button
                                onClick={() => {
                                    setSelectedOption(null);
                                    navigate(`/profile/change/${selectedCategory}`, {state: {from: from}});
                                }}
                                className="mt-4 text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:underline flex items-center"
                            >
                                <FaArrowLeft className="inline-block mr-1" />
                                Back to options
                            </button>
                            <div className="mt-6 flex justify-end">
                                <button
                                    // onClick={() => {addChange(getKeyFromOption(selectedOption), newValue);}}
                                    onClick={() => {if(newValue !== getCurrentValue(selectedCategory, selectedOption) || (selectedCategory == 'exercise' && exerciseTimes !== getCurrentExerciseTimes(selectedOption))){handleStartClick(selectedOption, getCurrentValue(selectedCategory, selectedOption), newValue, getCurrentExerciseTimes(selectedOption),exerciseTimes);}}}
                                    className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none  transition duration-200 flex items-center ${newValue !== getCurrentValue(selectedCategory, selectedOption) || (selectedCategory == 'exercise' && exerciseTimes !== getCurrentExerciseTimes(selectedOption)) ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'}`}
                                >
                                    Change
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <PostStartPopup
                isOpen={isStartChangePopupOpen}
                onClose={() => setIsStartChangePopupOpen(false)}
                onConfirm={handleConfirmStart}
                changeInfo={selectedStart}
            />
            {/* <HomePage/> */}
            <ProfileDiet/>
            {/* <div className="min-h-[100vh] w-full z-1000">
                {getFromPage()}
            </div> */}
        </div>
    )
}
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown, FaChevronUp, FaExchangeAlt, FaCheck, FaTrash, FaEdit } from 'react-icons/fa';

export function useProfileFunctions() {
    const [user, setUser] = useState(null);
    const [expandedCard, setExpandedCard] = useState(null);
    const [isPostPopupOpen, setIsPostPopupOpen] = useState(false);
    const [selectedChange, setSelectedChange] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser).user);
        }
    }, []);

    const removeChange = useCallback(async (change, email) => {
        try {
            console.log(change, email)
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
            'Fasting': 'fast',
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
            fast: 'Fasting',
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

    const handleEditClick = useCallback((category, option) => {
        const formattedCategory = category.toLowerCase();
        const formattedOption = option.toLowerCase().replace(/ /g, '-');
        navigate(`/profile/change/${formattedCategory}/${formattedOption}`, {state: {from: category}});
    }, [navigate]);

    const renderInfoCard = useCallback((title, value, changingValue, isChanging, index, category) => {
        const isChangingTab = category === 'changing';

        const renderCardContent = () => (
            <>
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                    {isChanging && !isChangingTab && (
                        <span className="flex items-center px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                            <FaExchangeAlt className="mr-1" />
                            Changing
                        </span>
                    )}
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-2">
                    {isChangingTab ? changingValue : value || 'Not specified'}
                </p>
                {isChanging && (
                    <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm text-blue-600 font-medium">
                            <span>{expandedCard === index ? 'Hide details' : 'View details'}</span>
                            {expandedCard === index ? <FaChevronUp className="ml-1" /> : <FaChevronDown className="ml-1" />}
                        </div>
                    </div>
                )}
            </>
        );

        const renderExpandedContent = () => (
            <div className="bg-gray-50 p-4 transition-all duration-300 ease-in-out">
                <p className="text-sm font-medium text-gray-500 mb-2">
                    {isChangingTab ? 'Current value:' : 'Changing to:'}
                </p>
                <p className="text-lg font-bold text-blue-700 mb-3">
                    {isChangingTab ? value : changingValue}
                </p>
                <div className="flex justify-end space-x-2">
                    <button
                        className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-1.5 px-3 rounded-full shadow-sm hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center text-xs"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleFinishChange(title);
                        }}
                    >
                        <FaCheck className="mr-1 text-xs" />
                        Finish
                    </button>
                    <button
                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-1.5 px-3 rounded-full shadow-sm hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center text-xs"
                        onClick={(e) => {
                            e.stopPropagation();
                            handlePostClick(title, value, changingValue);
                        }}
                    >
                        <FaEdit className="mr-1 text-xs" />
                        Post
                    </button>
                    <button
                        className="bg-red-500 text-white p-1.5 rounded-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                        onClick={(e) => {
                            e.stopPropagation();
                            removeChange(getFromBetterName(title), user.email);
                        }}
                    >
                        <FaTrash className="text-xs" />
                    </button>
                </div>
            </div>
        );

        return (
            <div 
                key={index}
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
                    {renderCardContent()}
                    {!isChanging && !isChangingTab && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleEditClick(category, title);
                            }}
                            className="mt-2 text-blue-600 hover:text-blue-800 focus:outline-none focus:underline flex items-center"
                        >
                            <FaEdit className="mr-1" />
                            Edit
                        </button>
                    )}
                </div>
                {isChanging && expandedCard === index && renderExpandedContent()}
            </div>
        );
    }, [expandedCard, handlePostClick, removeChange, user, handleEditClick]);

    const getInfoCards = useCallback((selected) => {
        if (!user || !user.setup) return [];

        const { setup, changing } = user;
        const { diet, meals, fast, exercise1, exercise1Times, exercise2, exercise2Times, exercise3, exercise3Times, sleep, bed, varies, calories } = setup;

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
                    { title: 'Fasting', value: fast, changingValue: changing.fast === 'No' ? changing.fast + ' Hours' : changing.fast, isChanging: !!changing.fast }
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
    }, [user, getBetterName]);

    return {
        user,
        setUser,
        expandedCard,
        setExpandedCard,
        isPostPopupOpen,
        setIsPostPopupOpen,
        selectedChange,
        setSelectedChange,
        removeChange,
        getFromBetterName,
        getBetterName,
        handlePostClick,
        getInfoCards,
        renderInfoCard,
        handleEditClick
    };
}
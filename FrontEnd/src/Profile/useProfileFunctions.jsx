import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown, FaChevronUp, FaExchangeAlt, FaCheck, FaTrash, FaEdit, FaPencilAlt } from 'react-icons/fa';
import { PostPopup } from '../Post/PostPopup';
import { PostDeletePopup } from '../Post/PostDeletePopup';
import { PostFinishPopup } from '../Post/PostFinishPopup';

export function useProfileFunctions() {
    const [user, setUser] = useState(null);
    const [expandedCard, setExpandedCard] = useState(null);
    const [isPostPopupOpen, setIsPostPopupOpen] = useState(false);
    const [isPostDeletePopupOpen, setIsPostDeletePopupOpen] = useState(false);
    const [isFinishChangePopupOpen, setIsFinishChangePopupOpen] = useState(false);
    const [selectedChange, setSelectedChange] = useState(null);
    const [selectedDelete, setSelectedDelete] = useState(null);
    const [selectedFinish, setSelectedFinish] = useState(null);
    const [isStartChangePopupOpen, setIsStartChangePopupOpen] = useState(false);
    const [selectedStart, setSelectedStart] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    
    const addChange = async(change, value,id) => {
        try {
            const stringValue = value.toString();
            const response = await axios.put('http://localhost:3000/addChange',{
                change: change,
                value: stringValue,
                id: id
            })
            if(response.data != 'User not found' || response.data != 'Internal Server Error'){
                localStorage.setItem('user', JSON.stringify(response.data.user));
                navigate('/profile/' + getCategory(getBetterName(change)))
            }
        } catch (err) {
            console.log(err);
        }
    }

    const removeChange = useCallback(async (change, id) => {

        try {
            console.log(change,id)
            const response = await axios.put('http://localhost:3000/removeChange', {
                change, id
            });
            
            const updatedUser = response.data.user;
            localStorage.setItem('user', JSON.stringify(updatedUser));
            
            setUser(prevUser => ({
                ...prevUser,
                ...updatedUser,
                changing: updatedUser.changing || {}
            }));
            window.location.reload();
        } catch (err) {
            console.error('Error removing change:', err);
        }
    }, []);

    const removeChangeAndPost = useCallback(async (change, user, postContent) => {

            axios.put('http://localhost:3000/addPost', {
                title: change.title, toValue: change.toValue, fromValue: change.fromValue, user, postContent, postType: 'remove',category: getCategory(change.title)
            })
            .then(res => {
                console.log(change.title)
            removeChange(getFromBetterName(change.title), user._id);
            })
            .catch(err => {
                console.error('Error removing change:', err);
                throw err;
            })
        



    }, []);


    const justPost = useCallback(async (change, user, postContent) => {

            axios.put('http://localhost:3000/addPost', {
                title: change.title, toValue: change.toValue, fromValue: change.fromValue, user, postContent, postType: 'update' ,category: getCategory(change.title)
            })
            .then(res => {
            console.log(res.data.post)
            window.location.reload();
            })
            .catch(err => {
                console.error('Error removing change:', err);
                throw err;
            })  
        

    }, []);


    const finishChange = useCallback(async (change, id) => {
        axios.put('http://localhost:3000/finishChange', {
            title: getFromBetterName(change.title), toValue: change.toValue, fromValue: change.fromValue, id
        })
        .then(res => {
            const updatedUser = res.data.user;
            localStorage.setItem('user', JSON.stringify(updatedUser ));
            setUser(updatedUser);
            window.location.reload();
        })
        .catch(err => {
            console.error('Error finishing change:', err);
            throw err;
        })
    }, []);

    const finishChangeAndPost = useCallback(async (change, user, postContent) => {

            axios.put('http://localhost:3000/addPost', {
                title: change.title, toValue: change.toValue, fromValue: change.fromValue, user, postContent, postType: 'finish', category: getCategory(change.title)
            })
            .then(res => {
            finishChange(change, user._id);
            })
            .catch(err => {
                console.error('Error removing change:', err);
                throw err;
            })
    }, []);

    const startChange = useCallback(async (change, user) => {
        console.log(change, user)
        addChange(getFromBetterName(change.title), change.toValue, user._id);

        
    }, []);

    const startChangeAndPost = useCallback(async (change, user, postContent) => {
        axios.put('http://localhost:3000/addPost', {
            title: change.title, toValue: change.toValue, fromValue: change.fromValue, user, postContent, postType: 'start', category: getCategory(change.title)
        })
        .then(res => {
        startChange(change, user);
        })
        .catch(err => {
            console.error('Error removing change:', err);
            throw err;
        })
    }, []);


    const getFromBetterName = (key) => {
        const nameMap = {
            'Diet Type': 'diet',
            'Meals Per Day': 'meals',
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
            meals: 'Meals Per Day',
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


    const getCategory = useCallback((key) => {
        const nameMap = {
            'Diet Type': 'diet',
            'Meals Per Day': 'diet',
            'Fasting': 'diet',
            'Fasting Hours': 'diet',
            'Exercise 1': 'exercise',
            'Exercise 1 Times': 'exercise',
            'Exercise 2': 'exercise',
            'Exercise 2 Times': 'exercise',
            'Exercise 3': 'exercise',
            'Exercise 3 Times': 'exercise',
            'Sleep Duration': 'sleep',
            'Bedtime': 'sleep',
            'Sleep Variation': 'sleep',
            'Calorie Intake': 'diet'
        };
        return nameMap[key] || key.charAt(0).toLowerCase() + key.slice(1);
    }, []);
    
  
    
    const handlePostClick = useCallback((title, value, changingValue) => {
        const trimmedValue = title.includes('Exercise') ? `${value.split(' ')[0]}(${value.split('(')[1].charAt(0)})` : value.split(' ')[0];
        const trimmedChangingValue = title.includes('Exercise') ? `${changingValue.split(' ')[0]}(${changingValue.split('(')[1].charAt(0)})` : changingValue.split(' ')[0];
        setSelectedChange({ title, fromValue: trimmedValue, toValue: trimmedChangingValue });
        setIsPostPopupOpen(true);
    }, []);

    const handleDeleteClick = (title, value, changingValue) => {
        const trimmedValue = title.includes('Exercise') & value != 'none' ? `${value.split(' ')[0]}(${value.split('(')[1].charAt(0)})` : value.split(' ')[0];
        const trimmedChangingValue = title.includes('Exercise') & changingValue != 'none' ? `${changingValue.split(' ')[0]}(${changingValue.split('(')[1].charAt(0)})` : changingValue.split(' ')[0];
        setSelectedDelete({ title, fromValue: trimmedValue, toValue: trimmedChangingValue });
        setIsPostDeletePopupOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedDelete) {
            removeChange(getFromBetterName(selectedDelete.title), user._id, selectedDelete.fromValue, selectedDelete.toValue);
        }
        setIsPostDeletePopupOpen(false);
    };

    const handleFinishClick = (title, value, changingValue) => {

        const trimmedValue = title.includes('Exercise' & value != 'none') ? `${value.split(' ')[0]}(${value.split('(')[1].charAt(0)})` : value.split(' ')[0];
        const trimmedChangingValue = title.includes('Exercise') ? `${changingValue.split(' ')[0]}(${changingValue.split('(')[1].charAt(0)})` : changingValue.split(' ')[0];
        setSelectedFinish({ title, fromValue: trimmedValue, toValue: trimmedChangingValue });
        setIsFinishChangePopupOpen(true);
    };

    const handleConfirmFinish = () => {
        if (selectedFinish) {
            // Implement the logic to finish the change
            console.log(`Finishing change for ${selectedFinish.title}`);
            // You might want to call an API or update the state here
        }
        setIsFinishChangePopupOpen(false);
    };

    const handleStartClick = useCallback((title, value, changingValue,timesStart, timesChange) => {




        const safelyTrimValue = (val) => {
            if (typeof val === 'string') {
                return val.split(' ')[0];
            }
            return val;
        };

        if(title.includes('Exercise')){
            console.log(value, changingValue)
        }


        const trimmedValue = title.includes('Exercise') ? `${safelyTrimValue(value)}(${timesStart})` : safelyTrimValue(value);
        const trimmedChangingValue = title.includes('Exercise') ? `${safelyTrimValue(changingValue)}(${timesChange})` : safelyTrimValue(changingValue);

        setSelectedStart({ 
            title, 
            fromValue: trimmedValue, 
            toValue: trimmedChangingValue 
        });
        setIsStartChangePopupOpen(true);
    }, []);

    const handleConfirmStart = () => {
        console.log(selectedStart)
        if (selectedStart) {
            // Implement the logic to start the change
            console.log(`Starting change for ${selectedStart.title}`);
            // You might want to call an API or update the state here
        }
        console.log(selectedStart)
        setIsStartChangePopupOpen(false);
    };
    

    const handleEditClick = useCallback((category, option, from) => {
        const formattedCategory = category.toLowerCase();
        const formattedOption = option.toLowerCase().replace(/ /g, '-');
        console.log(formattedCategory, formattedOption, from)
        navigate(`/profile/change/${formattedCategory}/${formattedOption}`, {state: {from: from}});
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
                        className="bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold py-1.5 px-3 rounded-full shadow-sm hover:from-green-600 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center text-xs"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleFinishClick(title, value,changingValue);
                        }}
                    >
                        <FaCheck className="mr-1 text-xs" />
                        Finish
                    </button>
                    <button
                        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-1.5 px-3 rounded-full shadow-sm hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center text-xs"
                        onClick={(e) => {
                            e.stopPropagation();
                            handlePostClick(title, value, changingValue);
                        }}
                    >
                        <FaEdit className="mr-1 text-xs" />
                        Post
                    </button>
                    <button
                        className="bg-gradient-to-r  from-red-500 to-red-700 text-white p-1.5 rounded-full shadow-sm hover:from-red-600 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log(title, value, changingValue)
                            handleDeleteClick(title, value,changingValue);
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
                                handleEditClick(category, title, category);
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
    }, [expandedCard, handlePostClick, removeChange, user, handleEditClick, handleFinishClick]);

    const renderChangingCategory = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getInfoCards('changing').map((card, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4">
                    <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                    <p className="text-sm text-gray-600 mb-1">Current: {card.value}</p>
                    <p className="text-sm font-medium text-blue-600 mb-3">Changing to: {card.changingValue}</p>
                    <div className="flex justify-end space-x-2">
                        <button
                            className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-1.5 px-3 rounded-full shadow-sm hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center text-xs"
                            onClick={() => handleFinishClick(card.title, card.value, card.changingValue)}
                        >
                            <FaCheck className="mr-1 text-xs" />
                            Finish
                        </button>
                        <button
                            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-1.5 px-3 rounded-full shadow-sm hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center text-xs"
                            onClick={() => handlePostClick(card.title, card.value, card.changingValue)}
                        >
                            <FaEdit className="mr-1 text-xs" />
                            Post
                        </button>
                        <button
                            className="bg-red-500 text-white p-1.5 rounded-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                            onClick={() => handleDeleteClick(card.title, card.value)}
                        >
                            <FaTrash className="text-xs" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    const getInfoCards = useCallback((selected) => {
        if (!user || !user.setup) return [];
    
        console.log(selected)
    
        const { setup, changing } = user;
        const { diet, meals, fast, exercise1, exercise1Times, exercise2, exercise2Times, exercise3, exercise3Times, sleep, bed, varies, calories, weight, height, description, gender } = setup;
    
        const formatExercise = (exercise, times) => {
            if (exercise === 'none') return null;
            return `${exercise} (${times} times a week)`;
        };
    
        const formatFast = (fastValue) => fastValue === 'No' ? 'No fasting' : `${fastValue} Hours`;
    
        const allFields = [
            { key: 'calories', title: 'Calorie Intake', format: (value) => `${value} calories` },
            { key: 'diet', title: 'Diet Type', format: (value) => value },
            { key: 'meals', title: 'Meals Per Day', format: (value) => value },
            { key: 'fast', title: 'Fasting', format: formatFast },
            { key: 'exercise1', title: 'Exercise 1', format: (value, times) => `${value} ${times !== 'none' ? `(${times} times a week)` : ''}` },
            { key: 'exercise2', title: 'Exercise 2', format: (value, times) => `${value} ${times !== 'none' ? `(${times} times a week)` : ''}` },
            { key: 'exercise3', title: 'Exercise 3', format: (value, times) => `${value} ${times !== 'none' ? `(${times} times a week)` : ''}` },
            { key: 'sleep', title: 'Sleep Duration', format: (value) => `${value} hours` },
            { key: 'bed', title: 'Bedtime', format: (value) => value },
            { key: 'varies', title: 'Sleep Variation', format: (value) => `${value}/10` },
            { key: 'description', title: 'Description', format: (value) => value },
            { key: 'gender', title: 'Gender', format: (value) => value },
        ];
    
        switch (selected) {
            case 'diet':
                return allFields.slice(0, 4).map(field => ({
                    title: field.title,
                    value: field.format(setup[field.key]),
                    changingValue: changing[field.key] ? field.format(changing[field.key]) : undefined,
                    isChanging: !!changing[field.key]
                }));
            case 'exercise':
                return allFields.slice(4, 7).map(field => ({
                    title: field.title,
                    value: field.format(setup[field.key], setup[`${field.key}Times`]),
                    changingValue: changing[field.key] ? field.format(changing[field.key], changing[`${field.key}Times`]) : undefined,
                    isChanging: !!changing[field.key]
                }));
            case 'sleep':
                return allFields.slice(7,10).map(field => ({
                    title: field.title,
                    value: field.format(setup[field.key]),
                    changingValue: changing[field.key] ? field.format(changing[field.key]) : undefined,
                    isChanging: !!changing[field.key]
                }));
            case 'changing':
                return allFields.map(field => {
                    const isExercise = field.key.startsWith('exercise');
                    return {
                        title: field.title,
                        value: isExercise 
                            ? field.format(setup[field.key], setup[`${field.key}Times`])
                            : field.format(setup[field.key]),
                        changingValue: changing[field.key] 
                            ? (isExercise 
                                ? field.format(changing[field.key], changing[`${field.key}Times`])
                                : field.format(changing[field.key]))
                            : undefined,
                        isChanging: !!changing[field.key]
                    };
                });
            default:
                return [];
        }
    }, [user]);

    return {
        user,
        setUser,
        expandedCard,
        setExpandedCard,
        isPostPopupOpen,
        setIsPostPopupOpen,
        isPostDeletePopupOpen,
        setIsPostDeletePopupOpen,
        isFinishChangePopupOpen,
        setIsFinishChangePopupOpen,
        selectedChange,
        setSelectedChange,
        selectedDelete,
        selectedFinish,
        handleConfirmDelete,
        handleConfirmFinish,
        removeChange,
        getFromBetterName,
        getBetterName,
        handlePostClick,
        handleFinishClick,
        getInfoCards,
        renderInfoCard,
        renderChangingCategory,
        handleEditClick,
        handleDeleteClick,
        removeChangeAndPost,
        justPost,
        finishChangeAndPost,
        finishChange,
        handleStartClick,
        handleConfirmStart,
        isStartChangePopupOpen,
        setIsStartChangePopupOpen,
        selectedStart,
        setSelectedStart,
        startChange,
        startChangeAndPost,
        getCategory

    };
}
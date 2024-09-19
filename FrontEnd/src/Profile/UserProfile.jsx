import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUtensils, FaDumbbell, FaBed, FaList, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useCallback } from 'react';

export function UserProfile() {
    const navigate = useNavigate();
    const { username, tab } = useParams();
    const [selected, setSelected] = useState(tab || 'all');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const tabs = [
        { id: 'all', icon: FaList, label: 'All' },
        { id: 'diet', icon: FaUtensils, label: 'Diet' },
        { id: 'exercise', icon: FaDumbbell, label: 'Exercise' },
        { id: 'sleep', icon: FaBed, label: 'Sleep' },
    ];

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await axios.post(`http://localhost:3000/getUser`, { username });
                setUser(userResponse.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Failed to load user data');
                setLoading(false);
            }
        };

        fetchUserData();
    }, [username]);

    useEffect(() => {
        if (tab && tabs.some(t => t.id === tab)) {
            setSelected(tab);
        }
    }, [tab]);

    const handleTabChange = (tabId) => {
        setSelected(tabId);
        navigate(`/user/${username}/${tabId}`);
    };

    const getInfoCards = useCallback((selected) => {
        if (!user || !user.setup) return [];
    
        console.log(selected)
    
        const { setup, changing } = user;
        const { diet, meals, fast, exercise1, exercise1Times, exercise2, exercise2Times, exercise3, exercise3Times, sleep, bed, varies, calories } = setup;
    
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
            { key: 'exercise1', title: 'Exercise 1', format: (value, times) => formatExercise(value, times) },
            { key: 'exercise2', title: 'Exercise 2', format: (value, times) => formatExercise(value, times) },
            { key: 'exercise3', title: 'Exercise 3', format: (value, times) => formatExercise(value, times) },
            { key: 'sleep', title: 'Sleep Duration', format: (value) => `${value} hours` },
            { key: 'bed', title: 'Bedtime', format: (value) => value },
            { key: 'varies', title: 'Sleep Variation', format: (value) => `${value}/10` }
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
                return allFields.slice(7).map(field => ({
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

    const renderCards = (category) => {
        const cards = getInfoCards(category);
        return (
            <motion.div 
                className="mb-8 bg-white rounded-xl shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex items-center">
                        {category === 'diet' && <FaUtensils className="text-xl sm:text-2xl mr-2 sm:mr-3 text-blue-500" />}
                        {category === 'exercise' && <FaDumbbell className="text-xl sm:text-2xl mr-2 sm:mr-3 text-green-500" />}
                        {category === 'sleep' && <FaBed className="text-xl sm:text-2xl mr-2 sm:mr-3 text-purple-500" />}
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 capitalize">{category}</h2>
                    </div>
                </div>
                <div className="p-4 sm:p-6 bg-gray-50">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {cards.map((card, index) => (
                            card.value && (
                                <motion.div
                                    key={`${category}-${card.title}`}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { 
                                            opacity: 1, 
                                            y: 0, 
                                            transition: { 
                                                type: 'spring',
                                                damping: 15,
                                                stiffness: 100,
                                            } 
                                        },
                                    }}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className={`bg-white rounded-lg shadow-md p-4 ${card.isChanging ? 'border-2 border-blue-200' : ''}`}
                                >
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{card.title}</h3>
                                    <p className="text-2xl font-bold text-gray-900 mb-1">{card.value}</p>
                                    {card.changingValue && (
                                        <div className="flex items-center mt-2">
                                            <FaArrowRight className="text-blue-500 mr-2" />
                                            <p className="text-lg font-medium text-blue-600">{card.changingValue}</p>
                                        </div>
                                    )}
                                </motion.div>
                            )
                        ))}
                    </div>
                </div>
            </motion.div>
        );
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!user) return <div>User not found</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className='max-w-7xl mx-auto'>
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-4 sm:p-6 lg:p-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/feed/all')}
                                className="text-blue-600 hover:text-blue-800 font-medium flex items-center transition duration-300 ease-in-out"
                            >
                                <FaArrowLeft className="mr-2" /> Back to Feed
                            </motion.button>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-0">{user.username}'s Profile</h1>
                        </div>
                        <div className='mb-6'>
                            <nav className='flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0'>
                                <div className='flex flex-wrap justify-center w-full sm:w-auto bg-gray-100 p-1 rounded-lg'>
                                    {tabs.map((tab) => (
                                        <motion.button
                                            key={tab.id}
                                            onClick={() => handleTabChange(tab.id)}
                                            className={`relative flex items-center justify-center w-1/2 sm:w-auto py-2 px-3 sm:px-4 rounded-md font-medium text-xs sm:text-sm transition duration-150 ease-in-out ${selected === tab.id ? 'text-blue-500' : 'text-gray-500'}`}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {selected === tab.id && (
                                                <motion.div
                                                    layoutId="activeTab"
                                                    className="absolute inset-0 bg-white rounded-md shadow-sm"
                                                    initial={false}
                                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                />
                                            )}
                                            <tab.icon className={`relative z-10 text-lg sm:text-xl mr-1 sm:mr-2`} />
                                            <span className="relative z-10">{tab.label}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            </nav>
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={selected}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                {user ? (
                                    selected === 'all' ? (
                                        <>
                                            {renderCards('diet')}
                                            {renderCards('exercise')}
                                            {renderCards('sleep')}
                                        </>
                                    ) : (
                                        renderCards(selected)
                                    )
                                ) : (
                                    <motion.div 
                                        variants={{
                                            hidden: { opacity: 0, y: 20 },
                                            visible: { opacity: 1, y: 0 },
                                        }}
                                        className='bg-white border border-gray-200 rounded-lg p-8 text-center shadow-md col-span-full'
                                    >
                                        <p className="text-xl text-gray-600">No user data available</p>
                                    </motion.div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUtensils, FaDumbbell, FaBed, FaList, FaHome, FaPencilAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { PostPopup } from '../Post/PostPopup';
import { PostDeletePopup } from '../Post/PostDeletePopup';
import { useProfileFunctions } from './useProfileFunctions';
import { PostFinishPopup } from '../Post/PostFinishPopup';

export function ProfileDiet() {
    const navigate = useNavigate();
    const { tab } = useParams();
    const [selected, setSelected] = useState(tab || 'all');
    const [expandedCard, setExpandedCard] = useState(null);
    const {
        user,
        isPostPopupOpen,
        setIsPostPopupOpen,
        selectedChange,
        getInfoCards,
        renderInfoCard,
        isPostDeletePopupOpen,
        setIsPostDeletePopupOpen,
        selectedDelete,
        handleConfirmDelete,
        isFinishChangePopupOpen,
        setIsFinishChangePopupOpen,
        selectedFinish,
        handleConfirmFinish,
    } = useProfileFunctions();

    const tabs = [
        { id: 'all', icon: FaList, label: 'All' },
        { id: 'diet', icon: FaUtensils, label: 'Diet' },
        { id: 'exercise', icon: FaDumbbell, label: 'Exercise' },
        { id: 'sleep', icon: FaBed, label: 'Sleep' },
    ];

    useEffect(() => {
        if (tab && tabs.some(t => t.id === tab)) {
            setSelected(tab);
        } else {
            navigate('/profile/all', { replace: true });
        }
    }, [tab, navigate]);

    const handleTabChange = (tabId) => {
        setSelected(tabId);
        navigate(`/profile/${tabId}`);
    };

    const pageVariants = {
        initial: { opacity: 0 },
        in: { opacity: 1 },
        out: { opacity: 0 },
    };

    const pageTransition = {
        type: 'tween',
        ease: 'anticipate',
        duration: 0.5,
    };

    const cardVariants = {
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
        exit: { 
            opacity: 0, 
            y: -20, 
            transition: { 
                duration: 0.3 
            } 
        },
    };

    const toggleCardExpansion = (cardId) => {
        setExpandedCard(expandedCard === cardId ? null : cardId);
    };

    const renderCards = (category) => {
        const cards = getInfoCards(category);
        return (
            <motion.div 
                className="mb-8 bg-white rounded-xl shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="p-6 bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex items-center">
                        {category === 'diet' && <FaUtensils className="text-2xl mr-3 text-blue-500" />}
                        {category === 'exercise' && <FaDumbbell className="text-2xl mr-3 text-green-500" />}
                        {category === 'sleep' && <FaBed className="text-2xl mr-3 text-purple-500" />}
                        <h2 className="text-2xl font-bold text-gray-800 capitalize">{category}</h2>
                    </div>
                </div>
                <div className="p-6 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cards.map((card, index) => (
                            card.value && (
                                <motion.div
                                    key={`${category}-${card.title}`}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    style={{ opacity: card.isChanging ? 1 : 0.5 }}
                                >
                                    {renderInfoCard(
                                        card.title, 
                                        card.value, 
                                        card.changingValue, 
                                        card.isChanging, 
                                        index, 
                                        category, 
                                        () => toggleCardExpansion(`${category}-${card.title}`),
                                        expandedCard === `${category}-${card.title}`
                                    )}
                                </motion.div>
                            )
                        ))}
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <motion.div 
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8"
        >
            <div className='max-w-7xl mx-auto'>
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-4xl font-extrabold text-gray-900">Profile Information</h1>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/feed/all')}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center text-sm"
                            >
                                <FaHome className="mr-2" />
                                Return to Home
                            </motion.button>
                        </div>
                        <div className='mb-8'>
                            <nav className='flex flex-row justify-between items-center'>
                                <div className='flex flex-row space-x-4 bg-gray-100 p-1 rounded-full'>
                                    {tabs.map((tab) => (
                                        <motion.button
                                            key={tab.id}
                                            onClick={() => handleTabChange(tab.id)}
                                            className={`relative flex items-center space-x-2 py-2 px-4 rounded-full font-medium text-sm transition duration-150 ease-in-out`}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {selected === tab.id && (
                                                <motion.div
                                                    layoutId="activeTab"
                                                    className="absolute inset-0 bg-white rounded-full shadow-md"
                                                    initial={false}
                                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                />
                                            )}
                                            <tab.icon className={`relative z-10 text-lg ${selected === tab.id ? 'text-blue-500' : 'text-gray-500'}`} />
                                            <span className={`relative z-10 ${selected === tab.id ? 'text-blue-500' : 'text-gray-500'}`}>
                                                {tab.label}
                                            </span>
                                        </motion.button>
                                    ))}
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/profile/change', {state: {from: selected}})}
                                    className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-2.5 px-5 rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center text-sm"
                                >
                                    <FaPencilAlt className="mr-2" />
                                    Change
                                </motion.button>
                            </nav>
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={selected}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={cardVariants}
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
                                        variants={cardVariants}
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
            <PostPopup 
                isOpen={isPostPopupOpen}
                onClose={() => setIsPostPopupOpen(false)}
                changeInfo={selectedChange}
            />
            <PostDeletePopup 
                isOpen={isPostDeletePopupOpen}
                onClose={() => setIsPostDeletePopupOpen(false)}
                onConfirm={handleConfirmDelete}
                changeInfo={selectedDelete}
            />
            <PostFinishPopup 
                isOpen={isFinishChangePopupOpen}
                onClose={() => setIsFinishChangePopupOpen(false)}
                onConfirm={handleConfirmFinish}
                changeInfo={selectedFinish}
            />
        </motion.div>
    );
}
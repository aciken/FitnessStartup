import React, { useState } from 'react';
import { LeftTab } from '../MainPage/LeftTab';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown, FaChevronUp, FaExchangeAlt, FaCheck, FaTrash } from 'react-icons/fa';
import { PostPopup } from '../Post/PostPopup';
import { useProfileFunctions } from './useProfileFunctions';

export function ProfileChangePage() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState('changing');
    const {
        user,
        expandedCard,
        setExpandedCard,
        isPostPopupOpen,
        setIsPostPopupOpen,
        selectedChange,
        removeChange,
        getFromBetterName,
        handlePostClick,
        getInfoCards
    } = useProfileFunctions();

    const renderInfoCard = (title, value, changingValue, isChanging, index) => (
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
    );

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
                                        onClick={() => {if(selected !== tab) navigate('/profile/' + tab)}}
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
                                onClick={() => navigate('/profile/change')}
                                className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150"
                            >
                                Change
                            </button>
                        </nav>
                    </div>
                    {user ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {getInfoCards(selected).map((card, index) => (
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
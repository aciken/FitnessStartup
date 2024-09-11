import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown, FaChevronUp, FaExchangeAlt, FaCheck, FaTrash, FaPencilAlt, FaEdit, FaHome } from 'react-icons/fa';
import { PostPopup } from '../Post/PostPopup';
import { useProfileFunctions } from './useProfileFunctions';
import { PostDeletePopup } from '../Post/PostDeletePopup';
import { PostFinishPopup } from '../Post/PostFinishPopup';

// Add this button style at the top of your component or in a separate styles file
const buttonStyle = "bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-1.5 px-3 rounded-full shadow-sm hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center text-xs";
const greenButtonStyle = "bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-1.5 px-3 rounded-full shadow-sm hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center text-xs";

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
        getInfoCards,
        handleFinishChange,
        isPostDeletePopupOpen,
        setIsPostDeletePopupOpen,
        selectedDelete,
        handleConfirmDelete,
        handleDeleteClick,
        isFinishChangePopupOpen,
        setIsFinishChangePopupOpen,
        selectedFinish,
        handleConfirmFinish,
        handleFinishClick,
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
                        <div className="flex items-center text-xs text-blue-600 font-medium">
                            <span>{expandedCard === index ? 'Hide details' : 'View details'}</span>
                            {expandedCard === index ? <FaChevronUp className="ml-1 text-xs" /> : <FaChevronDown className="ml-1 text-xs" />}
                        </div>
                        {selected === 'changing' && (
                            <div className="flex items-center space-x-2">
                                <button
                                    className={greenButtonStyle}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleFinishClick(title,value, changingValue);
                                    }}
                                >
                                    <FaCheck className="mr-1 text-xs" />
                                    Finish
                                </button>
                                <button
                                    className={buttonStyle}
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
                                        console.log(getFromBetterName(title), title);
                                        handleDeleteClick(title, value, changingValue);
                                        // removeChange(getFromBetterName(title), user.email);
                                    }}
                                >
                                    <FaTrash className="text-xs" />
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
                                className={buttonStyle}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handlePostClick(title, value, changingValue);
                                }}
                            >
                                <FaCheck className="mr-1" />
                                Post
                            </button>
                            <button
                                className="bg-red-500 text-white p-1.5 rounded-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    console.log('asd');
                                    handleDeleteClick(title, value, changingValue);
                                    // removeChange(getFromBetterName(title), user.email);
                                }}
                            >
                                <FaTrash className="text-xs" />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );

    const tabs = ['diet', 'exercise', 'sleep', 'changing'];

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className='w-full p-8'>
                <div className='max-w-6xl mx-auto'>
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">Profile Information</h1>
                        <button
                            onClick={() => navigate('/feed/home')}
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2.5 px-5 rounded-full shadow-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center text-sm"
                        >
                            <FaHome className="mr-2 text-sm" />
                            Return to Home
                        </button>
                    </div>
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
                                onClick={() => navigate('/profile/change', {state: {from: 'changing'}})}
                                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2.5 px-5 rounded-full shadow-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center text-sm"
                            >
                                <FaPencilAlt className="mr-2 text-sm" />
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
        </div>
    );
}
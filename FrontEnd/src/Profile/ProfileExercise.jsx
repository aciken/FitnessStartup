import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostPopup } from '../Post/PostPopup';
import { useProfileFunctions } from './useProfileFunctions';
import { FaPencilAlt, FaHome } from 'react-icons/fa';
import { PostDeletePopup } from '../Post/PostDeletePopup';
import { PostFinishPopup } from '../Post/PostFinishPopup';

export function ProfileExercise() {
    const navigate = useNavigate();
    const [selected] = useState('exercise');
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
        handleFinishClick,
    } = useProfileFunctions();

    const tabs = ['diet', 'exercise', 'sleep', 'changing'];

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className='w-full p-8'>
                <div className='max-w-6xl mx-auto'>
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">Profile Information</h1>
                        <button
                            onClick={() => navigate('/feed/all')}
                            className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white font-semibold py-2.5 px-5 rounded-full shadow-md hover:from-purple-800 hover:to-indigo-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center text-sm"
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
                                        onClick={() => navigate('/profile/' + tab)}
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
                                onClick={() => navigate('/profile/change', {state: {from: 'exercise'}})}
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
                                card.value && renderInfoCard(card.title, card.value, card.changingValue, card.isChanging, index, selected)
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
                changeInfo={selectedFinish}
            />
        </div>
    );
}
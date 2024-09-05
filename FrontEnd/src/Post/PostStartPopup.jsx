import React, { useState, useEffect } from 'react';
import { FaTimes, FaArrowRight, FaCheck } from 'react-icons/fa';
import { useProfileFunctions } from '../Profile/useProfileFunctions';

export function PostStartPopup({ isOpen, onClose, changeInfo }) {
    const [postContent, setPostContent] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const { 
        user,
        startChange,
        startChangeAndPost,
    } = useProfileFunctions();

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            setTimeout(() => setIsVisible(false), 300);
        }
    }, [isOpen]);

    if (!isVisible) return null;

    const { title, fromValue, toValue } = changeInfo || {};

    return (
        <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 backdrop-blur-sm ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg transform transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Start Change</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition duration-150"
                    >
                        <FaTimes size={24} />
                    </button>
                </div>

                <div className="mb-6 bg-gray-50 p-6 rounded-lg">
                    <p className="text-xl font-semibold text-gray-700 mb-4">{title}</p>
                    <div className="flex items-center justify-between">
                        <div className="text-center">
                            <p className="text-sm text-gray-500 mb-1">Current</p>
                            <div className="bg-white border border-gray-200 rounded px-4 py-2 font-medium text-gray-700">
                                {fromValue}
                            </div>
                        </div>
                        <FaArrowRight className="text-blue-500 mx-4" size={24} />
                        <div className="text-center">
                            <p className="text-sm text-gray-500 mb-1">New Goal</p>
                            <div className="bg-blue-50 border border-blue-200 rounded px-4 py-2 font-medium text-blue-700">
                                {toValue}
                            </div>
                        </div>
                    </div>
                </div>

                <textarea
                    className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
                    placeholder="Share your thoughts about starting this change..."
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                ></textarea>

                <div className="mt-6 flex justify-end gap-4">
                    <button
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-150"
                        onClick={() => {
                            startChange(changeInfo, user);
                            onClose();
                        }}
                    >
                        Start Without Posting
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150"
                        onClick={() => {
                            if(postContent.trim() === ''){
                                alert('Please enter some content for your post.');
                                return;
                            }
                            startChangeAndPost(changeInfo, user, postContent);
                            onClose();
                        }}
                    >
                        <FaCheck className="inline-block mr-2" />
                        Post and Start
                    </button>
                </div>
            </div>
        </div>
    );
}
import React, { useState, useEffect } from 'react';
import { FaTimes, FaArrowRight } from 'react-icons/fa';
import { useProfileFunctions } from '../Profile/useProfileFunctions';


export function PostDeletePopup({ isOpen, onClose, changeInfo }) {
    const [postContent, setPostContent] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const {
        user,
        removeChange,
        getFromBetterName,
        removeChangeAndPost
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
                    <h2 className="text-3xl font-bold text-gray-800">Create Post</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition duration-150"
                    >
                        <FaTimes size={24} />
                    </button>
                </div>

                <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                    <p className="text-xl font-semibold text-gray-700 mb-2">{title}</p>
                    <div className="flex items-center text-gray-600">
                        <span className="font-medium">{fromValue}</span>
                        <FaTimes className="mx-2 text-red-500" />
                        <span className="font-medium text-red-600 line-through">{toValue}</span>
                    </div>
                </div>

                <textarea
                    className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
                    placeholder="Share your thoughts about this change..."
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                ></textarea>

<div className="mt-6 flex justify-end gap-2">
                <button
                        className=" text-red-700 border border-red-600 hover:bg-red-50 font-semibold py-2 px-6 rounded-lg shadow-md  transition duration-150 "
                        onClick={() => {
                            console.log(changeInfo, user.email);
                            removeChange(getFromBetterName(changeInfo.title), user.email);
                        }}          
                    >
                        Finish Without Posting
                    </button>
                    <button
                        className="bg-red-500 text-red-100 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-red-600 focus:outline-none  transition duration-150 transform"
                        onClick={() => {
                            // Add your post submission logic here
                            if(postContent === ''){
                                alert('Post cannot be empty');
                                return;
                            }
                            removeChangeAndPost(changeInfo, user, postContent);
                        }}
                    >
                        Post and Finish
                    </button>
                    
                </div>
            </div>
        </div>
    );
}
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MainPageFunctions } from './MainPageFunctions';

export function CommentPopup({ isOpen, onClose, onSubmit, postId, user, post }) {
    const navigate = useNavigate();
    const [comment, setComment] = useState('');

    const {
        getFromBetterName
    } = MainPageFunctions();

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(postId, user)
        const category = getFromBetterName(post.title);
        await axios.put(`http://localhost:3000/addComment`, { postId, comment, userId: user._id, username: user.username, fromValue: user.setup[category], toValue: user.changing[category]})
        .then(res => {
            navigate(`/post/${postId}`);
        })
        .catch(err => {
            console.log(err);
        });

        
        // onSubmit(comment);
        // setComment('');
        // onClose();
    };



    useEffect(() => {
        if (isOpen) {
            setComment('');
            const intervalId = setInterval(() => {
                console.log('Comment popup is open');
            }, 3000);

            return () => clearInterval(intervalId);
        }
    }, [isOpen]);



    

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-filter backdrop-blur-md">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transition-all duration-300 ease-in-out hover:shadow-3xl transform scale-100 opacity-100">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Share Your Thoughts</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <textarea
                            className={`w-full h-40 p-4 border-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out text-gray-700 ${
                                comment.length === 0 
                                ? 'border-red-300 animate-pulse' 
                                : 'border-gray-300'
                            }`}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Your comment here..."
                            required
                        />
                        <span className={`absolute bottom-3 right-3 text-sm ${
                            comment.length === 0 
                            ? 'text-red-400' 
                            : 'text-gray-400'
                        }`}>
                            {comment.length}/500
                        </span>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 text-sm font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-200 ease-in-out"
                        >
                            Cancel
                        </button>
                        {JSON.parse(localStorage.getItem('user')).step === 2 ?
                        <button
                            type="submit"
                            className={`px-6 py-3 text-sm font-medium text-white rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 ease-in-out ${
                                comment.length === 0
                                ? 'bg-gray-400'
                                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                            }`}
                            disabled={comment.length === 0 || JSON.parse(localStorage.getItem('user')).step !== 2}
                        >
                            Post Comment
                        </button>
                        :
                        <button
                        onClick={() => navigate('/setup/food')}
                            type="button"
                            className={`px-6 py-3 text-sm font-medium text-white rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 ease-in-out  bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700`}
                        >
                            Finish Setup
                        </button>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}
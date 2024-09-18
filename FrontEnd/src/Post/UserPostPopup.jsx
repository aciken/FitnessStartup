import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaUtensils, FaBed, FaRunning } from 'react-icons/fa';

export function UserPostPopup({ isOpen, onClose, onPost }) {
    const [postContent, setPostContent] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        if (isOpen) {
            // Disable scrolling on the body when the popup is open
            document.body.style.overflow = 'hidden';
        } else {
            // Re-enable scrolling when the popup is closed
            document.body.style.overflow = 'unset';
        }

        // Cleanup function to re-enable scrolling when component unmounts
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handlePost = () => {
        if (postContent.trim() && category) {
            onPost({ content: postContent, category });
            setPostContent('');
            setCategory('');
            onClose();
        }
    };

    const categories = [
        { value: 'diet', label: 'Diet', icon: FaUtensils, gradient: 'from-green-400 to-green-600' },
        { value: 'sleep', label: 'Sleep', icon: FaBed, gradient: 'from-purple-400 to-purple-600' },
        { value: 'exercise', label: 'Exercise', icon: FaRunning, gradient: 'from-blue-400 to-blue-600' },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 flex items-center justify-center"
                >
                    <motion.div
                        initial={{ backdropFilter: 'blur(0px)' }}
                        animate={{ backdropFilter: 'blur(5px)' }}
                        exit={{ backdropFilter: 'blur(0px)' }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black bg-opacity-50"
                        onClick={onClose}
                    ></motion.div>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-lg p-6 w-full max-w-md relative z-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Create a Post</h2>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <div className="flex space-x-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.value}
                                        onClick={() => setCategory(cat.value)}
                                        className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-${cat.gradient.split('-')[2]}-400 ${
                                            category === cat.value
                                                ? `bg-gradient-to-r ${cat.gradient} text-white shadow-lg`
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        <cat.icon className={`mr-2 ${category === cat.value ? 'text-white' : 'text-gray-500'}`} />
                                        <span className="font-medium">{cat.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <textarea
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                            placeholder="What's on your mind?"
                            className="w-full h-32 p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={handlePost}
                                disabled={!postContent.trim() || !category}
                                className={`px-4 py-2 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                                    postContent.trim() && category
                                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:from-blue-600 hover:to-blue-700'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                Post
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
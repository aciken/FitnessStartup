import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaArrowLeft } from 'react-icons/fa';
import { PostCard } from '../MainPage/PostCardComponent';

export function ProfileLikes() {
    const [likedPosts, setLikedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLikedPosts = async () => {
            try {
                const userString = localStorage.getItem('user');
                if (!userString) {
                    throw new Error('User not found in local storage');
                }
                const user = JSON.parse(userString);
                
                if (!user.likedPosts || user.likedPosts.length === 0) {
                    setLikedPosts([]);
                    setLoading(false);
                    return;
                }

                const response = await axios.post('http://localhost:3000/getLikedPosts', { postIds: user.likedPosts });
                setLikedPosts(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching liked posts:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchLikedPosts();
    }, []);

    const handlePostClick = (postId) => {
        navigate(`/post/${postId}`);
    };

    // Dummy functions for required props
    const addLikedPost = () => {};
    const removeLikedPost = () => {};
    const addDislikedPost = () => {};
    const removeDislikedPost = () => {};

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        times: [0, 0.5, 1],
                        repeat: Infinity,
                    }}
                    className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
                />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-lg font-medium mb-4"
                >
                    {error}
                </motion.div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/feed')}
                    className="bg-blue-500 text-white px-5 py-2 rounded-md flex items-center transition duration-300 ease-in-out hover:bg-blue-600"
                >
                    <FaArrowLeft className="mr-2" /> Return to Feed
                </motion.button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-gray-900 mb-8 text-center"
                >
                    Liked Posts
                </motion.h1>
                {likedPosts.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center bg-white rounded-lg shadow-sm p-8"
                    >
                        <FaHeart className="text-red-400 text-4xl mx-auto mb-4" />
                        <p className="text-lg text-gray-600 mb-2">No liked posts yet</p>
                        <p className="text-sm text-gray-500 mb-6">Start exploring and liking posts to see them here!</p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/feed')}
                            className="bg-blue-500 text-white px-5 py-2 rounded-md inline-flex items-center transition duration-300 ease-in-out hover:bg-blue-600"
                        >
                            Explore Feed
                        </motion.button>
                    </motion.div>
                ) : (
                    <AnimatePresence>
                        {likedPosts.map((post, index) => (
                            <motion.div
                                key={post._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="mb-6 relative overflow-hidden rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-lg"
                                onClick={(e) => {
                                    // Only navigate if the click wasn't on an interactive element
                                    if (!['BUTTON', 'A', 'INPUT'].includes(e.target.tagName)) {
                                        handlePostClick(post._id);
                                    }
                                }}
                            >
                                <PostCard
                                    post={post}
                                    onPostClick={() => handlePostClick(post._id)}
                                    isLiked={true}
                                    addLikedPost={addLikedPost}
                                    removeLikedPost={removeLikedPost}
                                    addDislikedPost={addDislikedPost}
                                    removeDislikedPost={removeDislikedPost}
                                    likedPosts={likedPosts.map(p => p._id)}
                                    dislikedPosts={[]}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
                {likedPosts.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 text-center"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/feed')}
                            className="bg-blue-500 text-white px-5 py-2 rounded-md inline-flex items-center transition duration-300 ease-in-out hover:bg-blue-600"
                        >
                            <FaArrowLeft className="mr-2" /> Back to Feed
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { FaHeart, FaArrowLeft, FaChevronDown, FaLayerGroup, FaBed, FaUtensils, FaDumbbell, FaList } from 'react-icons/fa';
import { PostCard } from '../MainPage/PostCardComponent';

export function ProfileLikes() {
    const [likedPosts, setLikedPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showNav, setShowNav] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState({ value: 'All', label: 'All Categories', icon: FaLayerGroup });
    const [categories, setCategories] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const { scrollY } = useScroll();
    const lastScrollY = useRef(0);
    const dropdownRef = useRef(null);

    const categoryIcons = {
        All: FaLayerGroup,
        diet: FaUtensils,
        exercise: FaDumbbell,
        sleep: FaBed,
        

    };

    useMotionValueEvent(scrollY, "change", (latest) => {
        const direction = latest > lastScrollY.current ? "down" : "up";
        if (direction === "down" && latest > 100 && showNav) {
            setShowNav(false);
        } else if (direction === "up" && !showNav) {
            setShowNav(true);
        }
        lastScrollY.current = latest;
    });

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
                
                // Extract unique categories
                const uniqueCategories = ['All', ...new Set(response.data.map(post => post.category))];
                setCategories(uniqueCategories.map(category => ({
                    value: category,
                    label: category === 'All' ? 'All Categories' : category,
                    icon: categoryIcons[category] || FaLayerGroup
                })));
                
                setLoading(false);
            } catch (err) {
                console.error('Error fetching liked posts:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchLikedPosts();
    }, []);

    useEffect(() => {
        if (selectedCategory.value === 'All') {
            setFilteredPosts(likedPosts);
        } else {
            setFilteredPosts(likedPosts.filter(post => post.category === selectedCategory.value));
        }
    }, [selectedCategory, likedPosts]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const handlePostClick = (postId) => {
        navigate(`/post/${postId}`);
    };

    // Dummy functions for required props
    const addLikedPost = () => {};
    const removeLikedPost = () => {};
    const addDislikedPost = () => {};
    const removeDislikedPost = () => {};

    if (loading) {
        // ... (loading state remains the same)
    }

    if (error) {
        // ... (error state remains the same)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <motion.nav
                initial={{ y: 0 }}
                animate={{ y: showNav ? 0 : -100 }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 right-0 bg-white shadow-md z-10"
            >
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/feed/all')}
                        className="text-blue-600 hover:text-blue-800 font-medium flex items-center transition duration-300 ease-in-out"
                    >
                        <FaArrowLeft className="mr-2" /> Back to Feed
                    </motion.button>
                    <h1 className="text-xl font-bold text-gray-900">Liked Posts</h1>
                    <div className="relative w-40" ref={dropdownRef}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center justify-between w-full px-3 py-2 bg-white border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                        >
                            <div className="flex items-center">
                                {React.createElement(selectedCategory.icon, { className: "mr-2 text-indigo-500 text-lg" })}
                                <span className="truncate">{selectedCategory.label}</span>
                            </div>
                            <motion.div
                                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <FaChevronDown className="ml-2 text-gray-400" />
                            </motion.div>
                        </motion.button>
                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden"
                                >
                                    {categories.map((category) => (
                                        <motion.button
                                            key={category.value}
                                            whileHover={{ backgroundColor: '#F3F4F6' }}
                                            onClick={() => {
                                                setSelectedCategory(category);
                                                setIsDropdownOpen(false);
                                            }}
                                            className="w-full text-left px-3 py-2 flex items-center text-sm text-gray-700"
                                        >
                                            {React.createElement(category.icon, { className: "mr-2 text-indigo-500 text-lg" })}
                                            {category.label}
                                        </motion.button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.nav>

            <div className="pt-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    {filteredPosts.length === 0 ? (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center bg-white rounded-lg shadow-sm p-8"
                        >
                            <FaHeart className="text-red-400 text-4xl mx-auto mb-4" />
                            <p className="text-lg text-gray-600 mb-2">No liked posts in this category</p>
                            <p className="text-sm text-gray-500 mb-6">Try selecting a different category or explore more posts!</p>
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
                            {filteredPosts.map((post, index) => (
                                <motion.div
                                    key={post._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="mb-6 relative overflow-hidden rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-lg"
                                    onClick={(e) => {
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
                </div>
            </div>
        </div>
    );
}
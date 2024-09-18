import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaClock, FaFilter, FaPlus } from 'react-icons/fa';
import { PostCard } from './PostCardComponent';
import { TopCategories } from './TopCategories';
import { MainPageFunctions } from './MainPageFunctions';
import { PostStartPopup } from '../Post/PostStartPopup';
import { CommentPopup } from './CommentPopup';
import { CreatePostPopup } from '../Post/CreatePostPopup';
import { UserPostPopup } from '../Post/UserPostPopup';

export function HomePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedTimeRange, setSelectedTimeRange] = useState('all');
    const [selectedAction, setSelectedAction] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [likedPosts, setLikedPosts] = useState([]);
    const [dislikedPosts, setDislikedPosts] = useState([]);
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
    const [isUserPostPopupOpen, setIsUserPostPopupOpen] = useState(false);
    const {
        isStartChangePopupOpen,
        setIsStartChangePopupOpen,
        selectedStart,
        handleStartClick,
        handleConfirmStart,
        isCommentPopupOpen,
        setIsCommentPopupOpen,
        commentValue,
        setCommentValue,
        handleConfirmComment,
        handleCommentOpen,
        handleCommentClose,
        postId
    } = MainPageFunctions();

    const handleUserPostPopup = () => {
        setIsUserPostPopupOpen(true);
    };

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    useEffect(() => {
        const path = location.pathname.split('/');
        if (path[1] === 'feed' && path[2]) {
            setSelectedCategory(path[2]);
        } else {
            setSelectedCategory('all');
        }
    }, [location]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.post('http://localhost:3000/getPosts', {
                    category: selectedCategory,
                    timeRange: selectedTimeRange,
                    action: selectedAction
                });
                setPosts(res.data.posts);
            } catch (err) {
                console.error('Error fetching posts:', err);
            }
        };

        fetchPosts();
    }, [selectedTimeRange, selectedAction, selectedCategory]);

    const handleTimeRangeChange = (range) => {
        setSelectedTimeRange(range);
        setLikedPosts([]);
        setDislikedPosts([]);
    };

    const handleActionChange = (action) => {
        setSelectedAction(action);
        setLikedPosts([]);
        setDislikedPosts([]);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setLikedPosts([]);
        setDislikedPosts([]);
    };

    const addLikedPost = (postId) => {
        console.log(posts)
        const post = posts.find(post => post._id === postId);
        if (post && post.likedBy.includes(user._id)) {
            if (dislikedPosts.includes(postId)) {
                setDislikedPosts(dislikedPosts.filter(id => id !== postId));
            } else {
                setDislikedPosts([...dislikedPosts, postId]);
            }
        } else {
            if (likedPosts.includes(postId)) {
                setLikedPosts(likedPosts.filter(id => id !== postId));
            } else {
                setLikedPosts([...likedPosts, postId]);
            }
        }
    };

    return (
        <div className="flex flex-row min-h-screen bg-gray-50 z-10 ">
            <TopCategories
                selectedTimeRange={selectedTimeRange}
                onTimeRangeChange={handleTimeRangeChange}
                selectedAction={selectedAction}
                onActionChange={handleActionChange}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
            />
            
            <div className="fixed top-0 left-0 h-full">
                {/* <LeftTab current='Home'/> */}
            </div>
            <div className='flex-grow p-6 md:p-8 lg:p-12 overflow-y-auto mt-16  md:mt-10 '>
                <div className="space-y-8">
                    {posts.map((post) => (
                        <PostCard 
                            key={post._id} 
                            post={post} 
                            addLikedPost={addLikedPost} 
                            likedPosts={likedPosts} 
                            dislikedPosts={dislikedPosts} 
                            user={user} 
                            handleActionChange={handleActionChange}
                            handleStartClick={handleStartClick} 
                            handleCommentOpen={() => handleCommentOpen(post._id)}
                            postId={post._id}
                        />
                    ))}
                </div>
            </div>
            
            <PostStartPopup
                isOpen={isStartChangePopupOpen}
                onClose={() => setIsStartChangePopupOpen(false)}
                onConfirm={handleConfirmStart}
                changeInfo={selectedStart}
            />

            <CommentPopup
                isOpen={isCommentPopupOpen}
                onClose={() => setIsCommentPopupOpen(false)}
                onConfirm={handleConfirmComment}
                postId={postId}
                user={user}
                post={posts.find(p => p._id === postId) || {}}
            />

            <CreatePostPopup
                isOpen={isCreatePostOpen}
                onClose={() => setIsCreatePostOpen(false)}
                onCreatePost={() => {
                   handleUserPostPopup();
                }}
                onChange={() => {
                    if (user.step === 2) {
                        navigate('/profile/change', { state: { from: 'main' } });
                    } else {
                        navigate('/setup/food');
                    }
                }}
            />

            <UserPostPopup
                isOpen={isUserPostPopupOpen}
                onClose={() => setIsUserPostPopupOpen(false)}
                onPost={() =>{
                    
                }}
            />


           
        </div>
    );
}
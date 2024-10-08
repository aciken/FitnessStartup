import React from 'react';
import PropTypes from 'prop-types';
import { FaHeart, FaComment, FaExchangeAlt, FaUser, FaUtensils, FaDumbbell, FaBed, FaTimes, FaCheck, FaFlag } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MainPageFunctions } from './MainPageFunctions';

export function PostCard({ post, addLikedPost, likedPosts, dislikedPosts, user, handleActionChange, handleStartClick,handleCommentOpen, postId }) {
    const navigate = useNavigate();
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const [profilePicture, setProfilePicture] = useState('');

    const {
        isCommentPopupOpen,
        setIsCommentPopupOpen,
        commentValue,
        setCommentValue,
        handleConfirmComment,
        handleCommentClose,
        handleFinishClick,
        getFromBetterName,
    } = MainPageFunctions();

    useEffect(() => {
        const intervalId = setInterval(() => {
            console.log('isCommentPopupOpen:', isCommentPopupOpen);
        }, 3000);

        return () => clearInterval(intervalId);
    }, [isCommentPopupOpen]);

    const getCategoryIcon = (category) => {
        switch (category.toLowerCase()) {
            case 'diet':
                return <FaUtensils className="text-green-500" />;
            case 'exercise':
                return <FaDumbbell className="text-blue-500" />;
            case 'sleep':
                return <FaBed className="text-purple-500" />;
            default:
                return null;
        }
    };

    const getCategoryColor = (category) => {
        switch (category.toLowerCase()) {
            case 'diet':
                return 'bg-green-100 text-green-800';
            case 'exercise':
                return 'bg-blue-100 text-blue-800';
            case 'sleep':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getPostTypeStyles = (postType) => {
        switch (postType) {
            case 'update':
                return {
                    bg: 'bg-gradient-to-r from-blue-50 to-indigo-50',
                    border: 'border-blue-200',
                    icon: 'bg-blue-500',
                    title: 'text-blue-800',
                    leftBg: 'bg-white',
                    leftBorder: 'border-blue-200',
                    leftText: 'text-blue-600',
                    rightBg: 'bg-indigo-100',
                    rightBorder: 'border-indigo-200',
                    rightText: 'text-indigo-800',
                    arrow: 'text-indigo-500'
                };
            case 'start':
                return {
                    bg: 'bg-gradient-to-r from-teal-50 to-green-50',
                    border: 'border-teal-200',
                    icon: 'bg-teal-500',
                    title: 'text-teal-800',
                    leftBg: 'bg-white',
                    leftBorder: 'border-teal-200',
                    leftText: 'text-teal-600',
                    rightBg: 'bg-green-100',
                    rightBorder: 'border-green-200',
                    rightText: 'text-green-800',
                    arrow: 'text-green-500'
                };
            case 'finish':
                return {
                    bg: 'bg-gradient-to-r from-green-50 to-emerald-50',
                    border: 'border-green-200',
                    icon: 'bg-green-500',
                    title: 'text-green-800',
                    leftBg: 'bg-white',
                    leftBorder: 'border-green-200',
                    leftText: 'text-green-600',
                    rightBg: 'bg-emerald-100',
                    rightBorder: 'border-emerald-200',
                    rightText: 'text-emerald-800',
                    arrow: 'text-emerald-500'
                };
            case 'remove':
                return {
                    bg: 'bg-gradient-to-r from-red-50 to-orange-50',
                    border: 'border-red-200',
                    icon: 'bg-red-500',
                    title: 'text-red-800',
                    leftBg: 'bg-white',
                    leftBorder: 'border-red-200',
                    leftText: 'text-red-600',
                    rightBg: 'bg-orange-100',
                    rightBorder: 'border-orange-200',
                    rightText: 'text-red-400',
                    arrow: 'text-orange-500'
                };
            default:
                return {
                    bg: 'bg-gradient-to-r from-gray-50 to-slate-50',
                    border: 'border-gray-200',
                    icon: 'bg-gray-500',
                    title: 'text-gray-800',
                    leftBg: 'bg-white',
                    leftBorder: 'border-gray-200',
                    leftText: 'text-gray-600',
                    rightBg: 'bg-slate-100',
                    rightBorder: 'border-slate-200',
                    rightText: 'text-slate-800',
                    arrow: 'text-slate-500'
                };
        }
    };

    const addLike = async (postId, userId) => {
        console.log(user)
        console.log(user._id, post._id)
        addLikedPost(postId);
        axios.put('http://localhost:3000/likePost', {
            postId: postId,
            userId: userId
        })
        .then(response => {
            console.log(response.data.user);
             localStorage.setItem('user', JSON.stringify(response.data.user));
        })
        .catch(error => {
            console.log(error);
        })
    };

    const [tryButton, setTryButton] = useState(false);

    const handleCardClick = () => {
        if (tryButton) {
            setTryButton(false);
        }
        navigate(`/post/${post._id}`);
    };

    const handleInteractionClick = (e, action) => {
        e.stopPropagation();
        action();
    };

    const profilePictureCall = (username) => {
         axios.post('http://localhost:3000/getUser', {username})
        .then(res => {
            setProfilePicture(res.data.profilePicture)

        })
        .catch(err => {
            console.log(err)
        })
        if(profilePicture){
        return (
            <img  
            onClick={(e) => {e.stopPropagation(); navigate(`/user/${post.username}/all`)}}
                src={profilePicture} 
                alt={`${post.username}'s profile`} 
                className="w-10 h-10 rounded-full object-cover hover:drop-shadow-md hover:scale-105 transition-all duration-300"
            />
        )
        } else {
            return (
                <div className="w-10 h-10 flex flex-row justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-full text-white">
                    <FaUser />
                </div>
            )
        }
    }


    const renderChangeContent = () => {
        const styles = getPostTypeStyles(post.postType);
        
        // If the post type is 'post', render only the content
        if (post.postType === 'post') {
            return null;
        }

        // For other post types, keep the existing rendering logic
        return (
            <div className={`${styles.bg} text-gray-700 hover:drop-shadow-md transition-all duration-300 p-4 rounded-xl mb-4 border ${styles.border} shadow-sm cursor-pointer relative`}
            onClick={(e) => {e.stopPropagation();if(user.step == 2){handleStartClick(post.title, user.setup[getFromBetterName(post.title)], post.toValue)}else{if(user._id == '1'){navigate('/signup')}else{alert('Finish Setup First')}}}}
            >
                <div className="flex items-center mb-2">
                    <div className={`${styles.icon} text-white p-1.5 rounded-full mr-2`}>
                        {post.postType === 'update' && <FaExchangeAlt className="text-sm" />}
                        {post.postType === 'start' && <FaFlag className="text-sm" />}
                        {post.postType === 'finish' && <FaCheck className="text-sm" />}
                        {post.postType === 'remove' && <FaTimes className="text-sm" />}
                    </div>
                    <h3 className={`text-lg font-semibold ${styles.title}`}>
                        {post.postType === 'update' && 'Progress Update'}
                        {post.postType === 'start' && 'New Goal Started!'}
                        {post.postType === 'finish' && 'Goal Achieved!'}
                        {post.postType === 'remove' && 'Goal Removed'}
                    </h3>
                </div>
                <div className="flex items-center space-x-3">
                    <div className={`flex-1 ${styles.leftBg} rounded p-2 border ${styles.leftBorder}`}>
                        <p className={`text-xs ${styles.leftText} mb-1`}>
                            {post.postType === 'finish' ? 'Original Goal' : 'Current'}
                        </p>
                        <div className="text-sm font-medium text-gray-800">{post.fromValue}</div>
                    </div>
                    <FaExchangeAlt className={`${styles.arrow} text-lg`} />
                    <div className={`flex-1 ${styles.rightBg} rounded p-2 border ${styles.rightBorder}`}>
                        <p className={`text-xs ${styles.rightText} mb-1`}>
                            {post.postType === 'remove' ? 'Removed' : post.postType === 'finish' ? 'Achieved' : 'Goal'}
                        </p>
                        <div className={`text-sm cursor-pointer font-medium ${styles.rightText} ${post.postType === 'remove' ? 'line-through' : ''}`}
                        
                        >
                            {post.toValue}
                        </div>
                    </div>
                </div>
                {tryButton &&
                <button
                // onClick={() => {handleEditClick(post.category, post.title, 'main')}}
                onClick={() => {handleStartClick(post.title, post.fromValue , post.toValue)} }
                    className={`mt-4 w-30  hover:scale-105 font-semibold py-2 px-4 border bg-white shadow-md rounded-md  hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 absolute right-0 bottom--10`}
                >
                    Try This Goal
                </button>
                }
            </div>
        );
    };

    return (
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-all duration-300 max-w-3xl mx-auto border border-gray-100 cursor-pointer"
            onClick={handleCardClick}
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                    {profilePictureCall(post.username)}
                    {/* {user && user._id === post.userId && user.profilePicture ? (
                        <img 
                            src={user.profilePicture} 
                            alt={`${post.username}'s profile`} 
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    ) : (
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-full text-white">
                            <FaUser />
                        </div>
                    )} */}
                    <div>
                        {post.postType !== 'post' && (
                            <h2 className="text-xl font-semibold text-gray-800 tracking-tight">{post.title}</h2>
                        )}
                        <p className="text-sm text-gray-500">
                            Posted by <a className="underline hover:text-blue-700" onClick={(e) => {e.stopPropagation(); navigate(`/user/${post.username}/all`)}}>{post.username}</a> on {formatDate(post.createdAt)}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <span 
                        onClick={(e) => handleInteractionClick(e,() => navigate(`/feed/${post.category}`))}
                        className={`text-sm font-medium px-3 py-1 cursor-pointer rounded-full capitalize flex items-center space-x-1 ${getCategoryColor(post.category)}`}
                    >
                        {getCategoryIcon(post.category)}
                        <span>{post.category}</span>
                    </span>
                    <span 
                        className={`text-sm font-medium px-3 py-1 rounded-full capitalize cursor-pointer ${
                            post.postType === 'remove' ? 'bg-red-100 text-red-800' :
                            post.postType === 'finish' ? 'bg-green-100 text-green-800' :
                            post.postType === 'start' ? 'bg-teal-100 text-teal-800' :
                            post.postType === 'update' ? 'bg-blue-100 text-blue-800' :
                            post.postType === 'post' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                        }`}
                        onClick={(e) => handleInteractionClick(e, () => handleActionChange(post.postType.toLowerCase()))}
                    >
                        {post.postType}
                    </span>
                </div>
            </div>
            {renderChangeContent()}
            <p className='text-gray-700 pb-2'>{post.content}</p>
            <div className="flex justify-between items-center text-sm border-t pt-4 border-gray-100">
                <div className="flex items-center space-x-6">
                    <button
                        onClick={(e) => handleInteractionClick(e, () => addLike(post._id, user._id))}
                        className={`flex items-center space-x-2 text-gray-500 hover:text-gray-600 transition-colors duration-200 ${(likedPosts.includes(post._id) || post.likedBy.includes(user._id)) && !dislikedPosts.includes(post._id) ? 'text-pink-500 hover:text-pink-700' : dislikedPosts.includes(post._id)  ? 'text-gray-500 hover:text-gray-600' : ''}`}
                    >
                        <FaHeart className="text-lg" />
                        <span className="font-medium">{likedPosts.includes(post._id) ?  post.likes + 1 : dislikedPosts.includes(post._id) ? post.likes - 1 : post.likes}</span>
                    </button>
                    <button 
                        className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors duration-200 "
                        onClick={(e) => handleInteractionClick(e, () => {handleCommentOpen(postId)})}
                    >
                        <FaComment className="text-lg" />
                        <span className="font-medium">{post.comments.length}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

PostCard.propTypes = {
    post: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string,
        content: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        postType: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired,
        commentCount: PropTypes.number.isRequired,
        likedBy: PropTypes.array.isRequired,
    }).isRequired,
    addLikedPost: PropTypes.func.isRequired,
    likedPosts: PropTypes.array.isRequired,
    dislikedPosts: PropTypes.array.isRequired,
}

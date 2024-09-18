import React from 'react';
import PropTypes from 'prop-types';
import { FaHeart, FaComment, FaUser, FaUtensils, FaDumbbell, FaBed } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function PostCard({ post, addLikedPost, likedPosts, dislikedPosts, user, handleCommentOpen }) {
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

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
                return 'bg-green-100 text-green-800 ring-green-500/30';
            case 'exercise':
                return 'bg-blue-100 text-blue-800 ring-blue-500/30';
            case 'sleep':
                return 'bg-purple-100 text-purple-800 ring-purple-500/30';
            default:
                return 'bg-gray-100 text-gray-800 ring-gray-500/30';
        }
    };

    const handleLike = (e) => {
        e.stopPropagation();
        addLikedPost(post._id, user._id);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
            <div className="p-6">
                <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-full text-white mr-4">
                        <FaUser />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-1">{post.title}</h2>
                        <p className="text-sm text-gray-500">
                            Posted by {post.username} on {formatDate(post.createdAt)}
                        </p>
                    </div>
                </div>
                <p className="text-gray-700 mb-4">{post.content}</p>
                <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                        <span 
                            className={`text-sm font-medium px-3 py-1 rounded-full capitalize flex items-center space-x-1 ${getCategoryColor(post.category)} ring-1 ring-inset`}
                        >
                            {getCategoryIcon(post.category)}
                            <span className="ml-1">{post.category}</span>
                        </span>
                        <span 
                            className={`text-sm font-medium px-3 py-1 rounded-full capitalize ${
                                post.postType === 'remove' ? 'bg-red-100 text-red-800 ring-1 ring-inset ring-red-500/30' :
                                post.postType === 'finish' ? 'bg-green-100 text-green-800 ring-1 ring-inset ring-green-500/30' :
                                post.postType === 'start' ? 'bg-teal-100 text-teal-800 ring-1 ring-inset ring-teal-500/30' :
                                post.postType === 'update' ? 'bg-blue-100 text-blue-800 ring-1 ring-inset ring-blue-500/30' :
                                'bg-gray-100 text-gray-800 ring-1 ring-inset ring-gray-500/30'
                            }`}
                        >
                            {post.postType}
                        </span>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t border-gray-100">
                <button
                    onClick={handleLike}
                    className={`flex items-center space-x-2 text-gray-500 hover:text-gray-600 transition-colors duration-200 ${
                        (likedPosts.includes(post._id) || post.likedBy.includes(user._id)) && !dislikedPosts.includes(post._id) 
                            ? 'text-pink-500 hover:text-pink-600' 
                            : dislikedPosts.includes(post._id) 
                                ? 'text-gray-400 hover:text-gray-500' 
                                : ''
                    }`}
                >
                    <FaHeart className="text-lg" />
                    <span className="font-medium">{likedPosts.includes(post._id) ? post.likes + 1 : dislikedPosts.includes(post._id) ? post.likes - 1 : post.likes}</span>
                </button>
                <button 
                    className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors duration-200"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleCommentOpen(post._id);
                    }}
                >
                    <FaComment className="text-lg" />
                    <span className="font-medium">{post.comments.length}</span>
                </button>
            </div>
        </motion.div>
    );
}

PostCard.propTypes = {
    post: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        postType: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired,
        comments: PropTypes.array.isRequired,
        likedBy: PropTypes.array.isRequired,
        username: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
    }).isRequired,
    addLikedPost: PropTypes.func.isRequired,
    likedPosts: PropTypes.array.isRequired,
    dislikedPosts: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    handleCommentOpen: PropTypes.func.isRequired,
};

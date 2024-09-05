import React from 'react';
import { FaHeart, FaComment, FaExchangeAlt, FaUser, FaUtensils, FaDumbbell, FaBed } from 'react-icons/fa';

export function PostCard({ post }) {
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
                return 'bg-green-100 text-green-800';
            case 'exercise':
                return 'bg-blue-100 text-blue-800';
            case 'sleep':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-all duration-300 max-w-3xl mx-auto border border-gray-100">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full text-white">
                        <FaUser />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 tracking-tight">{post.title}</h2>
                        <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium px-3 py-1 rounded-full capitalize flex items-center space-x-1 ${getCategoryColor(post.category)}`}>
                        {getCategoryIcon(post.category)}
                        <span>{post.category}</span>
                    </span>
                    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full capitalize">
                        {post.postType}
                    </span>
                </div>
            </div>
            {post.postType === 'change' && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 p-4 rounded-xl mb-4 flex items-center">
                    <FaExchangeAlt className="mr-3 text-blue-500" />
                    <div className="flex-grow">
                        <span className="font-medium text-blue-600">From:</span> 
                        <span className="ml-1">{post.fromValue}</span>
                        <span className="mx-2 text-purple-400">→</span>
                        <span className="font-medium text-purple-600">To:</span> 
                        <span className="ml-1">{post.toValue}</span>
                    </div>
                </div>
            )}
            <p className="text-gray-700 text-lg leading-relaxed mb-6">{post.content}</p>
            <div className="flex justify-between items-center text-sm border-t pt-4 border-gray-100">
                <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-pink-500 transition-colors duration-200">
                        <FaHeart className="text-lg" />
                        <span className="font-medium">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors duration-200">
                        <FaComment className="text-lg" />
                        <span className="font-medium">{post.comments.length}</span>
                    </button>
                </div>
                <button className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors duration-200">
                    Read More
                </button>
            </div>
        </div>
    );
}
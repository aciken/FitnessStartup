import React from 'react';
import { FaHeart, FaComment, FaExchangeAlt, FaUser, FaUtensils, FaDumbbell, FaBed, FaTimes, FaCheck, FaFlag } from 'react-icons/fa';

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

    const renderChangeContent = () => {
        switch (post.postType) {
            case 'change':
                return (
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
                );
            case 'remove':
                return (
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 text-gray-700 p-4 rounded-xl mb-4 flex items-center">
                        <FaTimes className="mr-3 text-red-500" />
                        <div className="flex-grow">
                            <span className="font-medium text-red-600">From:</span> 
                            <span className="ml-1">{post.fromValue}</span>
                            <span className="mx-2 text-orange-400">→</span>
                            <span className="font-medium text-orange-600">To:</span> 
                            <span className="ml-1 line-through text-gray-500">{post.toValue || post.fromValue}</span>
                        </div>
                    </div>
                );
            case 'finish':
                return (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 text-gray-700 p-4 rounded-xl mb-4 flex items-center">
                        <FaCheck className="mr-3 text-green-500" />
                        <div className="flex-grow">
                            <span className="font-medium text-green-600">Original:</span> 
                            <span className="ml-1">{post.fromValue}</span>
                            <span className="mx-2 text-emerald-400">→</span>
                            <span className="font-medium text-emerald-600">Completed:</span> 
                            <span className="ml-1 font-semibold">{post.toValue}</span>
                        </div>
                    </div>
                );
            case 'start':
                return (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-700 p-4 rounded-xl mb-4 border border-blue-100 shadow-sm">
                        <div className="flex items-center mb-2">
                            <div className="bg-blue-500 text-white p-1.5 rounded-full mr-2">
                                <FaFlag className="text-sm" />
                            </div>
                            <h3 className="text-lg font-semibold text-blue-800">New Goal Started!</h3>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="flex-1 bg-white rounded p-2 border border-blue-200">
                                <p className="text-xs text-blue-600 mb-1">Starting Point</p>
                                <div className="text-sm font-medium text-gray-800">{post.fromValue}</div>
                            </div>
                            <FaExchangeAlt className="text-blue-500 text-lg" />
                            <div className="flex-1 bg-blue-100 rounded p-2 border border-blue-300">
                                <p className="text-xs text-blue-800 mb-1">Goal</p>
                                <div className="text-sm font-medium text-blue-900">{post.toValue}</div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-all duration-300 max-w-3xl mx-auto border border-gray-100">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-full text-white">
                        <FaUser />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 tracking-tight">{post.title}</h2>
                        <p className="text-sm text-gray-500">
                            Posted by {post.username} on {formatDate(post.createdAt)}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium px-3 py-1 rounded-full capitalize flex items-center space-x-1 ${getCategoryColor(post.category)}`}>
                        {getCategoryIcon(post.category)}
                        <span>{post.category}</span>
                    </span>
                    <span className={`text-sm font-medium px-3 py-1 rounded-full capitalize ${
                        post.postType === 'remove' ? 'bg-red-100 text-red-800' :
                        post.postType === 'finish' ? 'bg-green-100 text-green-800' :
                        post.postType === 'start' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                    }`}>
                        {post.postType}
                    </span>
                </div>
            </div>
            {renderChangeContent()}
            <p className="text-gray-700 text-lg leading-relaxed mb-6">{post.content}</p>
            <div className="flex justify-between items-center text-sm border-t pt-4 border-gray-100">
                <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-pink-500 transition-colors duration-200">
                        <FaHeart className="text-lg" />
                        <span className="font-medium">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors duration-200">
                        <FaComment className="text-lg" />
                        <span className="font-medium">{post.commentCount}</span>
                    </button>
                </div>
                <button className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors duration-200">
                    Read More
                </button>
            </div>
        </div>
    );
}
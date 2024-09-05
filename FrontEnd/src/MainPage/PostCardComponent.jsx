import React from 'react';
import { FaHeart, FaComment, FaExchangeAlt, FaUser, FaUtensils, FaDumbbell, FaBed, FaTimes, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export function PostCard({ post }) {
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
            default:
                return null;
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
                        <p className="text-sm text-gray-500">
                            Posted by <a href="#" className="underline hover:text-blue-600">{post.username}</a> on {formatDate(post.createdAt)}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium cursor-pointer px-3 py-1 rounded-full capitalize flex items-center space-x-1 ${getCategoryColor(post.category)}`}
                        onClick={() => {
                            navigate(`/feed/${post.category}`);
                        }}
                    >
                        {getCategoryIcon(post.category)}
                        <span>{post.category}</span>
                    </span>
                    <span className={`text-sm font-medium px-3 py-1 rounded-full capitalize ${
                        post.postType === 'remove' ? 'bg-red-100 text-red-800' :
                        post.postType === 'finish' ? 'bg-green-100 text-green-800' :
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
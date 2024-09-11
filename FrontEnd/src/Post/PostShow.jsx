import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { LeftTab } from "../MainPage/LeftTab";
import { PostCard } from "../MainPage/PostCardComponent";
import { useProfileFunctions } from "../Profile/useProfileFunctions";
import { FaUser, FaArrowRight, FaHeart, FaTimes, FaArrowLeft } from 'react-icons/fa';

export function PostShow() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [post, setPost] = useState(null);
    const [likedPosts, setLikedPosts] = useState([]);
    const [dislikedPosts, setDislikedPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newComment, setNewComment] = useState('');

    const [likedComments, setLikedComments] = useState([]);
    const [dislikedComments, setDislikedComments] = useState([]);

    const {
        getFromBetterName
    } = useProfileFunctions();

    useEffect(() => {
        setIsLoading(true);
        axios.post(`http://localhost:3000/getOnePost`, { id })
            .then(res => {
                setPost(res.data.post);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    }, [id]);

    const addLikedPost = (postId) => {
        console.log(post)
        if (post && post.likedBy.includes(user.user._id)) {
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
    }

    const handleCommentSubmit = (comment, postId) => {
        if(comment.length > 0){
        const category = getFromBetterName(post.title);
        axios.put(`http://localhost:3000/addComment`, { postId, comment, userId: user.user._id, username: user.user.username, fromValue: user.user.setup[category], toValue: user.user.changing[category]})
            .then(res => {
                setPost(res.data.post);
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            alert("Please enter a comment");
        }
    }

    const handleCommentLike = (commentId, postId, userId) => {
        console.log(commentId)
        axios.put(`http://localhost:3000/likeComment`, { commentId, postId, userId, interaction: "like" })
            .then(res => {
                setPost(res.data.post);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleCommentDislike = (commentId, postId, userId) => {

        axios.put(`http://localhost:3000/likeComment`, { commentId, postId, userId, interaction: "dislike" })
            .then(res => {
                setPost(res.data.post);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 z-10">
            <div className="w-full p-4 bg-white shadow-md">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Post Details</h1>
                    <button
                        onClick={() => navigate('/feed/home')}
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center text-sm"
                    >
                        <FaArrowLeft className="mr-2" />
                        Back to Feed
                    </button>
                </div>
            </div>
            <div className="flex-grow md:p-8 lg:p-12 overflow-y-auto">
                {isLoading ? (
                    <div>Loading...</div>
                ) : post ? (
                    <div>
                        <PostCard
                            key={post._id}
                            post={post}
                            addLikedPost={addLikedPost}
                            likedPosts={likedPosts}
                            dislikedPosts={dislikedPosts}
                            user={user}
                        />
                        <div className="flex flex-col items-center">
                            <div className="mt-8 p-6 bg-white rounded-lg shadow-md w-full max-w-3xl">
                                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Comments</h2>
                                <div className="mb-6">
                                    <textarea
                                        className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                                        rows="4"
                                        placeholder="Share your thoughts..."
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                    ></textarea>
                                    <div className="flex justify-end mt-3">
                                        <button
                                        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                        onClick={() => handleCommentSubmit(newComment, post._id)}
                                        >
                                        Post Comment
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    {post.comments && post.comments
                                        .sort((a, b) => (b.likes || 0) - (b.dislikes || 0) - ((a.likes || 0) - (a.dislikes || 0)))
                                        .map((comment, index) => (
                                        <div key={index} className="bg-gray-50 p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center cursor-pointer group">
                                                    <div className="bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full p-2 mr-3 group-hover:from-blue-500 group-hover:to-indigo-600 transition-all duration-300">
                                                        <FaUser className="text-white" />
                                                    </div>
                                                    <p className="font-semibold text-blue-600 group-hover:text-blue-700 transition-all duration-300">{comment.username}</p>
                                                </div>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(comment.createdAt).toLocaleString()}
                                                </p>
                                            </div>
                                            <p className="text-gray-700 mb-3 leading-relaxed">{comment.content}</p>
                                            <div className="flex items-center text-sm text-gray-600 bg-gray-100 p-2 rounded-lg">
                                                <span className="font-medium">{comment.fromValue}</span>
                                                {comment.toValue && (
                                                    <>
                                                        <FaArrowRight className="mx-2 text-blue-500" />
                                                        <span className="font-medium">{comment.toValue}</span>
                                                    </>
                                                )}
                                            </div>
                                            <div className="flex items-center mt-3 space-x-4">
                                                <button
                                                    className={`flex items-center space-x-2 transition-all duration-300 ${
                                                        comment.likedBy && comment.likedBy.includes(user.user._id)
                                                            ? 'text-blue-500 hover:text-blue-700'
                                                            : 'text-gray-400 hover:text-gray-600'
                                                    }`}
                                                    onClick={() => handleCommentLike(comment._id, post._id, user.user._id)}
                                                >
                                                    <FaHeart className="w-5 h-5" />
                                                    <span className="font-medium">{comment.likes || 0}</span>
                                                </button>
                                                <button 
                                                    className={`flex items-center space-x-2 transition-all duration-300 ${
                                                        comment.dislikedBy && comment.dislikedBy.includes(user.user._id)
                                                            ? 'text-pink-500 hover:text-pink-700'
                                                            : 'text-gray-400 hover:text-gray-600'
                                                    }`}
                                                    onClick={() => handleCommentDislike(comment._id, post._id, user.user._id)}
                                                >
                                                    <FaTimes className="w-5 h-5" />
                                                    <span className="font-medium">{comment.dislikes || 0}</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>Post not found</div>
                )}
            </div>
        </div>
    );
}
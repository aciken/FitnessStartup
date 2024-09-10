import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { LeftTab } from "../MainPage/LeftTab";
import { PostCard } from "../MainPage/PostCardComponent";
import { useProfileFunctions } from "../Profile/useProfileFunctions";
import { FaUser, FaArrowRight, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';


export function PostShow() {
    const { id } = useParams();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [post, setPost] = useState(null);
    const [likedPosts, setLikedPosts] = useState([]);
    const [dislikedPosts, setDislikedPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newComment, setNewComment] = useState('');

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
        const category = getFromBetterName(post.title);
        axios.put(`http://localhost:3000/addComment`, { postId, comment, userId: user.user._id, username: user.user.username, fromValue: user.user.setup[category], toValue: user.user.changing[category]})
            .then(res => {
                setPost(res.data.post);
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className="flex flex-row min-h-screen bg-gray-50 z-10">
            <div className="fixed top-0 left-0 h-full">
                <LeftTab current='Diet'/>
            </div>
            <div className="flex-grow ml-64 md:p-8 lg:p-12 overflow-y-auto">
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
                                    {post.comments && post.comments.map((comment, index) => (
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
                                                    className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors duration-300"
                                                    onClick={() => handleCommentVote(comment._id, 'upvote')}
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                                    </svg>
                                                    <span>{comment.upvotes || 0}</span>
                                                </button>
                                                <button
                                                    className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors duration-300"
                                                    onClick={() => handleCommentVote(comment._id, 'downvote')}
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                                                    </svg>
                                                    <span>{comment.downvotes || 0}</span>
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
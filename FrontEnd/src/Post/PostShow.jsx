import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { LeftTab } from "../MainPage/LeftTab";
import { PostCard } from "../MainPage/PostCardComponent";

export function PostShow() {
    const { id } = useParams();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [post, setPost] = useState(null);
    const [likedPosts, setLikedPosts] = useState([]);
    const [dislikedPosts, setDislikedPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newComment, setNewComment] = useState('');

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

    const handleCommentSubmit = (comment,postId) => {
        axios.put(`http://localhost:3000/addComment`, { postId, comment })
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
                            <div className="flex flex-row justify-center">
                                <div className="mt-8 p-6 bg-white rounded-lg shadow-md w-full max-w-3xl">
                                    <h2 className="text-2xl font-semibold mb-6">Comments</h2>
                                    <div className="mb-6">
                                        <textarea
                                            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            rows="3"
                                            placeholder="Add a comment..."
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                        ></textarea>
                                        <div className="flex justify-end mt-2">
                                            <button 
                                            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                                            onClick={() => handleCommentSubmit(newComment, post._id)}
                                            >
                                            Comment
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        {post.comments && post.comments.map((comment, index) => (
                                            <div key={index} className="bg-gray-100 p-4 rounded-lg">
                                                <div className="flex items-center justify-between mb-2">
                                                    <p className="font-semibold text-blue-600">{comment.username}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {new Date(comment.createdAt).toLocaleString()}
                                                    </p>
                                                </div>
                                                <p className="text-gray-700">{comment.content}</p>
                                                <div className="flex items-center mt-2">
                                                    <button 
                                                        className="flex items-center text-gray-500 hover:text-pink-500 transition-colors duration-200"
                                                        onClick={() => handleCommentLike(comment._id)}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                        </svg>
                                                        <span>{comment.likes || 0}</span>
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
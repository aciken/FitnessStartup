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
        // ... existing addLikedPost logic ...
    };

    return (
        <div className="flex flex-row min-h-screen bg-gray-50 z-10">
            <div className="fixed top-0 left-0 h-full">
                <LeftTab current='Diet'/>
            </div>
            <div className="flex-grow ml-64 md:p-8 lg:p-12 overflow-y-auto">
                {isLoading ? (
                    <div>Loading...</div>
                ) : post ? (
                    <PostCard 
                        key={post._id} 
                        post={post} 
                        addLikedPost={addLikedPost} 
                        likedPosts={likedPosts} 
                        dislikedPosts={dislikedPosts} 
                        user={user} 
                    />
                ) : (
                    <div>Post not found</div>
                )}
            </div>
        </div>
    );
}
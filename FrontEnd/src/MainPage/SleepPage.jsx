import React from 'react';
import {LeftTab} from './LeftTab';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PostCard } from './PostCardComponent';



export function SleepPage() {

    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const [likedPosts, setLikedPosts] = useState([]);
    const [dislikedPosts, setDislikedPosts] = useState([]);

    const addLikedPost = (postId) => {
        console.log(postId)
        if(!user.user.likedPosts.includes(postId)){
        if(likedPosts.includes(postId)){
            setLikedPosts(likedPosts.filter(id => id !== postId));
        } else {
            setLikedPosts([...likedPosts, postId]);
        } 
    }else{
        if(dislikedPosts.includes(postId)){
            setDislikedPosts(dislikedPosts.filter(id => id !== postId));
        } else{
            setDislikedPosts([...dislikedPosts, postId]);
        }

    }
    console.log(likedPosts, dislikedPosts)
    }

    useEffect(() => {
        axios.post('http://localhost:3000/getPosts', {category: 'sleep'})
        .then(res => {
            setPosts(res.data.posts);
            console.log(res.data.posts);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        if(JSON.parse(localStorage.getItem('user')) == null) {
            navigate('/')
        }
    }, [])


    return (
        <div className="flex flex-row min-h-screen bg-gray-50">
            <div className="fixed top-0 left-0 h-full">
                <LeftTab current='Sleep'/>
            </div>
            <div className='flex-grow ml-64 p-6 md:p-8 lg:p-12 overflow-y-auto'>
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">Recent Posts</h1>
                <div className="space-y-8">
                    {posts.map((post) => (
                        <PostCard key={post._id} post={post} addLikedPost={addLikedPost} likedPosts={likedPosts} dislikedPosts={dislikedPosts} user={user} />
                    ))}
                </div>
            </div>
        </div>
    )
}
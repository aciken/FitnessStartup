import React from 'react';
import {LeftTab} from './LeftTab';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { PostCard } from './PostCardComponent';
import axios from 'axios';


export function DietPage() {

    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:3000/getPosts', {category: 'diet'})
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
                <LeftTab current='Diet'/>
            </div>
            <div className='flex-grow ml-64 p-6 md:p-8 lg:p-12 overflow-y-auto'>
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">Recent Posts</h1>
                <div className="space-y-8">
                    {posts.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    )
}
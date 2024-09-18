import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaUtensils, FaBed, FaDumbbell } from 'react-icons/fa';
import { PostCard } from '../MainPage/PostCardComponent';

export function UserProfile() {
    const { username } = useParams();
    const [userProfile, setUserProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        axios.post('http://localhost:3000/getUser', { username })
            .then(res => {
                setUserProfile(res.data);
                console.log(res.data)
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    }, [username]);

    const filteredPosts = selectedCategory === 'all'
        ? posts
        : posts.filter(post => post.category === selectedCategory);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!userProfile) return <div>User not found</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                    <h1 className="text-3xl font-bold mb-2">{userProfile.name}</h1>
                    <p className="text-xl">{userProfile.email}</p>
                </div>
                <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">User Stats</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-green-100 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-2 flex items-center">
                                <FaUtensils className="mr-2" /> Diet
                            </h3>
                            <p>Posts: {posts.filter(post => post.category === 'diet').length}</p>
                        </div>
                        <div className="bg-blue-100 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-2 flex items-center">
                                <FaDumbbell className="mr-2" /> Exercise
                            </h3>
                            <p>Posts: {posts.filter(post => post.category === 'exercise').length}</p>
                        </div>
                        <div className="bg-purple-100 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-2 flex items-center">
                                <FaBed className="mr-2" /> Sleep
                            </h3>
                            <p>Posts: {posts.filter(post => post.category === 'sleep').length}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">User Posts</h2>
                <div className="flex space-x-4 mb-4">
                    <button
                        className={`px-4 py-2 rounded-full ${selectedCategory === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => setSelectedCategory('all')}
                    >
                        All
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full ${selectedCategory === 'diet' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => setSelectedCategory('diet')}
                    >
                        Diet
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full ${selectedCategory === 'exercise' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => setSelectedCategory('exercise')}
                    >
                        Exercise
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full ${selectedCategory === 'sleep' ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => setSelectedCategory('sleep')}
                    >
                        Sleep
                    </button>
                </div>
                <div className="space-y-4">
                    {filteredPosts.map(post => (
                        <PostCard
                            key={post._id}
                            post={post}
                            addLikedPost={() => {}}
                            likedPosts={[]}
                            dislikedPosts={[]}
                            user={user}
                            handleActionChange={() => {}}
                            handleStartClick={() => {}}
                            handleCommentOpen={() => {}}
                            postId={post._id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
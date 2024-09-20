import React, { useState, useEffect } from 'react';
import { LeftTabNotLoged } from './LeftTabNotLoged';
import { useNavigate } from 'react-router-dom';
import { NotLogedTopCategories } from './NotLogedTopCategories';
import axios from 'axios';
import { PostCard } from '../MainPage/PostCardComponent';



export function MainNotLoged() {

    const navigate = useNavigate();

    const [selected, setSelected] = useState('Home');

    const [posts, setPosts] = useState([]);

    const addSelection = (selection) => {
        setSelected(selection);
    }




    useEffect(() => {
        if(JSON.parse(localStorage.getItem('user')) != null) {
            navigate('/feed/all')
        }
    }, [])

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.post('http://localhost:3000/getPosts', {
                    category: "all",
                    timeRange: "all",
                    action: "all"
                });
                setPosts(res.data.posts);
            } catch (err) {
                console.error('Error fetching posts:', err);
            }
        };

        fetchPosts();
    }, []);
    


    return (
        <div className="flex flex-row min-h-[100vh]">
            {/* <LeftTabNotLoged selected={selected} addSelection={addSelection}  /> */}
            <NotLogedTopCategories
            selectedTimeRange={"all"}
            onTimeRangeChange={() => {navigate('/signup')}}
            selectedAction={"all"}
            onActionChange={() => {navigate('/signup')}}
            selectedCategory={"all"}
            onCategoryChange={() => {navigate('/signup')}}
            />
            <div className='flex-grow p-6 md:p-8 lg:p-12 overflow-y-auto mt-16  md:mt-10 '>
                <div className="space-y-8">
                    {posts.map((post) => (
                        <PostCard 
                        key={post._id} 
                        post={post} 
                        addLikedPost={() => {navigate('/signup')}} 
                        likedPosts={[]} 
                        dislikedPosts={[]} 
                        user={{_id: '1'}} 
                        handleActionChange={() => {navigate('/signup')}}
                        handleStartClick={() => {navigate('/signup')}} 
                        handleCommentOpen={() => {navigate('/signup')}}
                        postId={post._id}

                        />
                    ))}
                </div>
            </div>
            
        </div>
    )
} 
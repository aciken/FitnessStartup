import React from 'react';
import {LeftTab} from './LeftTab';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { PostCard } from './PostCardComponent';
import axios from 'axios';
import { TopCategories } from './TopCategories';
import { MainPageFunctions } from './MainPageFunctions';
import { PostStartPopup } from '../Post/PostStartPopup';




export function DietPage() {

    const navigate = useNavigate();

    const [selectedTimeRange, setSelectedTimeRange] = useState('all');
    const [selectedAction, setSelectedAction] = useState('all');
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const {
        isStartChangePopupOpen,
        setIsStartChangePopupOpen,
        selectedStart,
        handleStartClick,
        handleConfirmStart
    } = MainPageFunctions();

    const [likedPosts, setLikedPosts] = useState([]);
    const [dislikedPosts, setDislikedPosts] = useState([]);

    
    const handleTimeRangeChange = (range) => {
        setSelectedTimeRange(range);
        if(range != selectedTimeRange){
            setLikedPosts([]);
            setDislikedPosts([]);
        }
    };

    const handleActionChange = (action) => {
        setSelectedAction(action);
        if(action != selectedAction){
            setLikedPosts([]);
            setDislikedPosts([]);
        }

    };

    const addLikedPost = (postId) => {
        console.log(posts)
        const post = posts.find(post => post._id === postId);
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



    useEffect(() => {
            console.log(selectedTimeRange, selectedAction);
            axios.post('http://localhost:3000/getPosts', {
                category: 'diet',
                timeRange: selectedTimeRange,
                action: selectedAction
            })
            .then(res => {
                setPosts(res.data.posts);
                console.log(res.data.posts);
            })
            .catch(err => {
                console.log(err);
            });
        

    }, [selectedTimeRange, selectedAction]);



    useEffect(() => {
        if(JSON.parse(localStorage.getItem('user')) == null) {
            navigate('/')
        }
    }, [])


    return (
        <div className="flex flex-row min-h-screen  bg-gray-50 z-10">
            <TopCategories
 selectedTimeRange={selectedTimeRange}
 onTimeRangeChange={handleTimeRangeChange}
 selectedAction={selectedAction}
 onActionChange={handleActionChange}
                                />
            <div className="fixed top-0 left-0 h-full">
                <LeftTab current='Diet'/>
            </div>
            <div className='flex-grow ml-64 p-6 md:p-8 lg:p-12 overflow-y-auto mt-10'>
                <div className="space-y-8">
                    {posts.map((post) => (
                        <PostCard 
                            key={post._id} 
                            post={post} 
                            addLikedPost={addLikedPost} 
                            likedPosts={likedPosts} 
                            dislikedPosts={dislikedPosts} 
                            user={user} 
                            handleActionChange={handleActionChange}
                            handleStartClick={handleStartClick}
                        />
                    ))}
                </div>
            </div>
            <PostStartPopup
                isOpen={isStartChangePopupOpen}
                onClose={() => setIsStartChangePopupOpen(false)}
                onConfirm={handleConfirmStart}
                changeInfo={selectedStart}
            />
        </div>
    )
}
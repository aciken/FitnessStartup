import React from 'react';
import {LeftTab} from './LeftTab';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PostCard } from './PostCardComponent';
import { TopCategories } from './TopCategories';

export function HomePage() {

    const navigate = useNavigate();
    const [selectedTimeRange, setSelectedTimeRange] = useState('all');
    const [selectedAction, setSelectedAction] = useState('all');
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    

    let likedBy = [];

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

    useEffect(() => {
        if(JSON.parse(localStorage.getItem('user')) == null) {
            navigate('/')
        }
        

    }, [])




    
    useEffect(() => {
        const intervalId = setInterval(() => {
            console.log(user);
        }, 3000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, [user]);


    useEffect(() => {
        axios.post('http://localhost:3000/getPosts', {category: 'all', timeRange: selectedTimeRange, action: selectedAction})
        .then(res => {
            setPosts(res.data.posts);
            console.log(res.data.posts);
            likedBy = res.data.posts.likedBy;
        })
        .catch(err => {
            console.log(err);
        })
    }, [selectedTimeRange, selectedAction])

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


    //     console.log(postId)
    //     if(!user.user.likedPosts.includes(postId)){
    //     if(likedPosts.includes(postId)){
    //         setLikedPosts(likedPosts.filter(id => id !== postId));
    //     } else {
    //         setLikedPosts([...likedPosts, postId]);
    //     } 
    // }else{
    //     if(dislikedPosts.includes(postId)){
    //         setDislikedPosts(dislikedPosts.filter(id => id !== postId));
    //     } else{
    //         setDislikedPosts([...dislikedPosts, postId]);
    //     }

    // }
    console.log(likedPosts, dislikedPosts)
    






    return (
        <div className="flex flex-row min-h-screen bg-gray-50 z-10">
            <TopCategories
 selectedTimeRange={selectedTimeRange}
 onTimeRangeChange={handleTimeRangeChange}
 selectedAction={selectedAction}
 onActionChange={handleActionChange}
                                />
            <div className="fixed top-0 left-0 h-full">
                <LeftTab current='Home'/>
            </div>
            <div className='flex-grow ml-64 p-6 md:p-8 lg:p-12 overflow-y-auto mt-10'>
                <div className="space-y-8">
                    {posts.map((post) => (
                        <PostCard key={post._id} post={post} addLikedPost={addLikedPost} likedPosts={likedPosts} dislikedPosts={dislikedPosts} user={user} handleActionChange={handleActionChange} />
                    ))}
                </div>
            </div>
        </div>
    );
}
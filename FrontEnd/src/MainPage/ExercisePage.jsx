import React from 'react';
import {LeftTab} from './LeftTab';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PostCard } from './PostCardComponent';
import { TopCategories } from './TopCategories';
import { PostStartPopup } from '../Post/PostStartPopup';
import { MainPageFunctions } from './MainPageFunctions';
import { CommentPopup } from './CommentPopup';
import { CreatePostPopup } from '../Post/CreatePostPopup';

export function ExercisePage() {

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
        handleConfirmStart,
        handleCommentOpen,
        isCommentPopupOpen,
        setIsCommentPopupOpen,
        handleConfirmComment

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
        if (post && post.likedBy.includes(user._id)) {
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
        axios.post('http://localhost:3000/getPosts', {
            category: 'exercise',
            timeRange: selectedTimeRange,
            action: selectedAction
        })
        .then(res => {
            setPosts(res.data.posts);
            console.log(res.data.posts);
        })
        .catch(err => {
            console.log(err);
        })
    }, [selectedTimeRange, selectedAction])



    useEffect(() => {
        if(JSON.parse(localStorage.getItem('user')) == null) {
            navigate('/')
        }
    }, [])


    const [selectedCategory, setSelectedCategory] = useState('all');

const handleCategoryChange = (category) => {
  setSelectedCategory(category);
  // Add any additional logic you need when the category changes
};

    return (
        <div className="flex flex-row min-h-screen  bg-gray-50 z-10">
<TopCategories
  selectedTimeRange={selectedTimeRange}
  onTimeRangeChange={handleTimeRangeChange}
  selectedAction={selectedAction}
  onActionChange={handleActionChange}
  selectedCategory={selectedCategory}
  onCategoryChange={handleCategoryChange}
/>
            {/* <div className="fixed top-0 left-0 h-full">
                <LeftTab current='Exercise'/>
            </div> */}
            <div className='flex-grow p-6 md:p-8 lg:p-12 overflow-y-auto mt-10'>
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
                            handleCommentOpen={handleCommentOpen}
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
            <CommentPopup
                isOpen={isCommentPopupOpen}
                onClose={() => setIsCommentPopupOpen(false)}
                onConfirm={handleConfirmComment}

            />

            <CreatePostPopup
            onCreatePost={() => {

            }}
            onChange={() => {
                if(user.step == 2){ 
                    navigate('/profile/change', {state: {from: 'main'}})
                } else {
                    navigate('/setup/food')
                }
            }}
            />
        </div>
    )
}
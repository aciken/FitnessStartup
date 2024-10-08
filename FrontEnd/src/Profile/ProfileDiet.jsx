import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { FaUtensils, FaDumbbell, FaBed, FaList, FaHome, FaArrowLeft, FaUser ,FaWeight, FaRuler, FaBirthdayCake, FaVenusMars, FaCamera, FaPencilAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { PostPopup } from '../Post/PostPopup';
import { PostDeletePopup } from '../Post/PostDeletePopup';
import { useProfileFunctions } from './useProfileFunctions';
import { PostFinishPopup } from '../Post/PostFinishPopup';
import { storage } from '../Comp/Firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import axios from 'axios';

export function ProfileDiet() {
    const navigate = useNavigate();
    const { tab } = useParams();
    const [selected, setSelected] = useState(tab || 'all');
    const [expandedCard, setExpandedCard] = useState(null);
    const {
        user,
        isPostPopupOpen,
        setIsPostPopupOpen,
        selectedChange,
        getInfoCards,
        renderInfoCard,
        isPostDeletePopupOpen,
        setIsPostDeletePopupOpen,
        selectedDelete,
        handleConfirmDelete,
        isFinishChangePopupOpen,
        setIsFinishChangePopupOpen,
        selectedFinish,
        handleConfirmFinish,
    } = useProfileFunctions();
    const [profilePicture, setProfilePicture] = useState(null);
    const [description, setDescription] = useState(JSON.parse(localStorage.getItem('user')).setup.description);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.profilePicture) {
                console.log('User profile picture:', user.profilePicture);
            }
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);


    const tabs = [
        { id: 'all', icon: FaList, label: 'All' },
        { id: 'personal', icon: FaUser, label: 'Personal' },
        { id: 'diet', icon: FaUtensils, label: 'Diet' },
        { id: 'exercise', icon: FaDumbbell, label: 'Exercise' },
        { id: 'sleep', icon: FaBed, label: 'Sleep' },
    ];

    useEffect(() => {
        if (tab && tabs.some(t => t.id === tab)) {
            setSelected(tab);
        } else {
            // navigate('/profile/all', { replace: true });
        }
    }, [tab, navigate]);

    const handleTabChange = (tabId) => {
        setSelected(tabId);
        navigate(`/profile/${tabId}`);
    };

    const toggleCardExpansion = (cardId) => {
        setExpandedCard(expandedCard === cardId ? null : cardId);
    };

    const renderCards = (category) => {
        const cards = getInfoCards(category);
        return (
            <motion.div 
                className="mb-8 bg-white rounded-xl shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex items-center">
                        {category === 'diet' && <FaUtensils className="text-xl sm:text-2xl mr-2 sm:mr-3 text-blue-500" />}
                        {category === 'exercise' && <FaDumbbell className="text-xl sm:text-2xl mr-2 sm:mr-3 text-green-500" />}
                        {category === 'sleep' && <FaBed className="text-xl sm:text-2xl mr-2 sm:mr-3 text-purple-500" />}
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 capitalize">{category}</h2>
                    </div>
                </div>
                <div className="p-4 sm:p-6 bg-gray-50">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {cards.map((card, index) => (
                            card.value && (
                                <motion.div
                                    key={`${category}-${card.title}`}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { 
                                            opacity: 1, 
                                            y: 0, 
                                            transition: { 
                                                type: 'spring',
                                                damping: 15,
                                                stiffness: 100,
                                            } 
                                        },
                                    }}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    style={{ opacity: card.isChanging ? 1 : 0.5 }}
                                >
                                    {renderInfoCard(
                                        card.title, 
                                        card.value, 
                                        card.changingValue, 
                                        card.isChanging, 
                                        index, 
                                        category, 
                                        () => toggleCardExpansion(`${category}-${card.title}`),
                                        expandedCard === `${category}-${card.title}`
                                    )}
                                </motion.div>
                            )
                        ))}
                    </div>
                </div>
            </motion.div>
        );
    };

    const handleProfilePictureChange = (e) => {
        if (e.target.files[0]) {
            setProfilePicture(e.target.files[0]);
        }
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        setShowSaveButton(true);
    };

    const handleProfileUpdate = async () => {
        let updatedUser = null;

        if (profilePicture) {
            const imageRef = ref(storage, `profilePictures/${profilePicture.name + v4()}`);
            await uploadBytes(imageRef, profilePicture);
            const url = await getDownloadURL(imageRef);
            console.log('url', url);
            const res = await axios.put(`http://localhost:3000/updateProfilePicture`, { id: user._id, profilePicture: url });
            updatedUser = res.data;
            console.log(updatedUser);
        }

        if (description !== user.setup.description) {
            const res = await axios.put(`http://localhost:3000/updateDescription`, { id: user._id, description: description });
            updatedUser = res.data;
            console.log(updatedUser);
        }

        if (updatedUser) {
            localStorage.setItem('user', JSON.stringify(updatedUser));
            window.location.reload();
        }
    };

    const renderProfileCard = (title, value, icon, unit = '') => {
        return (
            <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-xs">
                <div className="p-4">
                    <div className="flex items-center mb-2">
                        {icon}
                        <h3 className="text-lg font-semibold ml-2">{title}</h3>
                    </div>
                    <p className="text-2xl font-bold">{value} {unit}</p>
                </div>
            </div>
        );
    };

    const [showSaveButton, setShowSaveButton] = useState(false);

    useEffect(() => {
        if(profilePicture){
            setShowSaveButton(true);
        }
    }, [profilePicture]);

    const renderPersonalInfo = () => (
        <motion.div 
            className="mb-8 bg-white rounded-xl shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-white">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Personal Information</h2>
            </div>
            <div className="p-4 sm:p-6 bg-gray-50">
                <div className="flex flex-col md:flex-row md:space-x-6">
                    <div className="flex-shrink-0 mb-4 md:mb-0 text-center md:text-left">
                        <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden mx-auto md:mx-0">
                            {profilePicture ? (
                                <img src={URL.createObjectURL(profilePicture)} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <img src={JSON.parse(localStorage.getItem('user')).profilePicture} alt="Profile" className="w-full h-full object-cover" />
                            )}
                        </div>
                        <label className="mt-3 cursor-pointer inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
                            <FaCamera className="inline mr-2" />
                            Change Picture
                            <input type="file" className="hidden" onChange={handleProfilePictureChange} accept="image/*" />
                        </label>
                    </div>
                    <div className="flex-grow space-y-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                                <FaPencilAlt className="inline mr-2" /> Description
                            </label>
                            <textarea
                                value={description}
                                onChange={handleDescriptionChange}
                                className="w-full p-2 border rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows="3"
                                maxLength="200"
                                placeholder="Tell us about yourself..."
                            />
                            <div className="text-right text-gray-500 text-xs mt-1">
                                {description.length}/200 characters
                            </div>
                        </div>
                        <div className="flex items-center">
                            <label className="text-gray-700 text-sm font-semibold mr-3">
                                <FaVenusMars className="inline mr-2" /> Gender:
                            </label>
                            <input
                                type="text"
                                value={JSON.parse(localStorage.getItem('user')).setup.gender}
                                readOnly
                                className="flex-grow md:flex-grow-0 md:w-40 p-2 border rounded-md bg-gray-100 text-gray-700"
                            />
                        </div>
                    </div>
                </div>
                {showSaveButton && (
                    <button
                        className="mt-6 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                        onClick={handleProfileUpdate}
                    >
                        Save Changes
                    </button>
                )}
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className='max-w-7xl mx-auto'>
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-4 sm:p-6 lg:p-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                                                        <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/feed/all')}
                        className="text-blue-600 hover:text-blue-800 font-medium flex items-center transition duration-300 ease-in-out"
                    >
                                <FaArrowLeft className="mr-2" /> Back to Feed
                            </motion.button>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-0">Profile Information</h1>

                        </div>
                        <div className='mb-6'>
                            <nav className='flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0'>
                                <div className='flex flex-wrap justify-center w-full sm:w-auto bg-gray-100 p-1 rounded-lg'>
                                    {tabs.map((tab) => (
                                        <motion.button
                                            key={tab.id}
                                            onClick={() => handleTabChange(tab.id)}
                                            className={`relative flex items-center justify-center w-1/2 sm:w-auto py-2 px-3 sm:px-4 rounded-md font-medium text-xs sm:text-sm transition duration-150 ease-in-out ${selected === tab.id ? 'text-blue-500' : 'text-gray-500'}`}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {selected === tab.id && (
                                                <motion.div
                                                    layoutId="activeTab"
                                                    className="absolute inset-0 bg-white rounded-md shadow-sm"
                                                    initial={false}
                                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                />
                                            )}
                                            <tab.icon className={`relative z-10 text-lg sm:text-xl mr-1 sm:mr-2`} />
                                            <span className="relative z-10">{tab.label}</span>
                                        </motion.button>
                                    ))}
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/profile/change', {state: {from: selected}})}
                                    className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center text-sm w-full sm:w-auto justify-center sm:justify-start mt-4 sm:mt-0"
                                >
                                    <FaPencilAlt className="mr-2" />
                                    Change
                                </motion.button>
                            </nav>
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={selected}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                {user ? (
                                    selected === 'all' ? (
                                        <>
                                            {renderPersonalInfo()}
                                            {renderCards('diet')}
                                            {renderCards('exercise')}
                                            {renderCards('sleep')}
                                        </>
                                    ) : selected === 'personal' ? (
                                        renderPersonalInfo()
                                    ) : (
                                        renderCards(selected)
                                    )
                                ) : (
                                    <motion.div 
                                        variants={{
                                            hidden: { opacity: 0, y: 20 },
                                            visible: { opacity: 1, y: 0 },
                                        }}
                                        className='bg-white border border-gray-200 rounded-lg p-8 text-center shadow-md col-span-full'
                                    >
                                        <p className="text-xl text-gray-600">No user data available</p>
                                    </motion.div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            <PostPopup 
                isOpen={isPostPopupOpen}
                onClose={() => setIsPostPopupOpen(false)}
                changeInfo={selectedChange}
            />
            <PostDeletePopup 
                isOpen={isPostDeletePopupOpen}
                onClose={() => setIsPostDeletePopupOpen(false)}
                onConfirm={handleConfirmDelete}
                changeInfo={selectedDelete}
            />
            <PostFinishPopup 
                isOpen={isFinishChangePopupOpen}
                onClose={() => setIsFinishChangePopupOpen(false)}
                onConfirm={handleConfirmFinish}
                changeInfo={selectedFinish}
            />
        </div>
    );
}
import { LeftTab } from '../MainPage/LeftTab';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function ProfilePage() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState('diet');
    const [user, setUser] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser).user);
        }
    }, []);

    const renderInfoCard = (title, value) => (
        <div className="bg-white border border-gray-200 p-6 rounded-md shadow-sm">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">{title}</h2>
            <p className="text-xl font-medium text-gray-900">{value || 'Not specified'}</p>
        </div>
    );

    const tabs = ['diet', 'exercise', 'sleep'];

    const getInfoCards = () => {
        if (!user || !user.setup) return [];

        const { diet, meals, fast, fastHours, exercise1, exercise1Times, exercise2, exercise2Times, exercise3, exercise3Times, sleep, bed, varies } = user.setup;

        const formatExercise = (exercise, times) => {
            if (exercise === 'none') return null;
            return (
                <>
                    {exercise} <span className="text-blue-600 font-semibold">({times} times a week)</span>
                </>
            );
        };

        switch (selected) {
            case 'diet':
                return [
                    { title: 'Diet Type', value: diet },
                    { title: 'Meals per Day', value: meals },
                    { title: 'Fasting Schedule', value: fast },
                    { title: 'Fasting Hours', value: fastHours }
                ];
            case 'exercise':
                return [
                    { title: 'Exercise 1', value: formatExercise(exercise1, exercise1Times) },
                    { title: 'Exercise 2', value: formatExercise(exercise2, exercise2Times) },
                    { title: 'Exercise 3', value: formatExercise(exercise3, exercise3Times) }
                ];
            case 'sleep':
                return [
                    { title: 'Sleep Duration', value: `${sleep} hours` },
                    { title: 'Bedtime', value: `${bed}:00` },
                    { title: 'Sleep Variation', value: `${varies}/10` }
                ];
            default:
                return [];
        }
    };



    return (
        <div className="flex flex-row min-h-screen bg-gray-50">
            <LeftTab current='Profile' />
            <div className='w-full p-8'>
                <div className='max-w-4xl mx-auto'>
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">Profile Information</h1>
                    <div className='mb-8 border-b border-gray-200'>
                        <nav className='flex flex-row justify-between items-center'>
                            <div className='-mb-px flex flex-row space-x-8'>
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setSelected(tab)}
                                        className={`${
                                            selected === tab
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm uppercase`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => navigate('/profile/change')}
                                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none h-10  transition duration-200"
                            >
                                Change
                            </button>
                        </nav>
                    </div>
                    {user ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {getInfoCards().map((card, index) => (
                                card.value && (
                                    <div key={index} className="bg-white border border-gray-200 p-6 rounded-md shadow-sm">
                                        <h2 className="text-lg font-semibold text-gray-700 mb-2">{card.title}</h2>
                                        <p className="text-xl font-medium text-gray-900">{card.value}</p>
                                    </div>
                                )
                            ))}
                        </div>
                    ) : (
                        <div className='bg-white border border-gray-200 rounded-md p-8 text-center'>
                            <p className="text-xl text-gray-600">No user data available</p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
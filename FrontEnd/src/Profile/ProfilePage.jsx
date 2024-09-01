import { LeftTab } from '../MainPage/LeftTab';
import { useState, useEffect } from 'react';

export function ProfilePage() {
    const [selected, setSelected] = useState('diet')
    const [user, setUser] = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser).user)
        }
    }, [])

    const renderInfoCard = (title, value) => (
        <div className="bg-white border border-gray-200 p-6 rounded-md shadow-sm">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">{title}</h2>
            <p className="text-xl font-medium text-gray-900">{value || 'Not specified'}</p>
        </div>
    )

    const tabs = ['diet', 'exercise', 'sleep'];

    const getInfoCards = () => {
        switch(selected) {
            case 'diet':
                return [
                    { title: 'Diet Type', value: user.setup?.diet },
                    { title: 'Meals per Day', value: user.setup?.meals },
                    { title: 'Fasting Schedule', value: user.setup?.fast }
                ];
            case 'exercise':
                return [
                    { title: 'Exercise Type', value: user.setup?.exercise1 },
                    { title: 'Exercise Frequency', value: user.setup?.exercise1Times },
                    { title: 'Fitness Goal', value: 'Not specified' }
                ];
            case 'sleep':
                return [
                    { title: 'Sleep Duration', value: `${user.setup?.sleep} hours` },
                    { title: 'Bedtime', value: `${user.setup?.bed}:00` },
                    { title: 'Sleep Variation', value: `${user.setup?.varies}/10` }
                ];
            default:
                return [];
        }
    }

    return (
        <div className="flex flex-row min-h-screen bg-gray-50">
            <LeftTab current='Profile' />
            <div className='w-full p-8'>
                <div className='max-w-4xl mx-auto'>
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">Profile Information</h1>
                    <div className='mb-8 border-b border-gray-200'>
                        <nav className='-mb-px flex space-x-8'>
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
                        </nav>
                    </div>
                    {user ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {getInfoCards().map((card, index) => (
                                renderInfoCard(card.title, card.value)
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
    )
}
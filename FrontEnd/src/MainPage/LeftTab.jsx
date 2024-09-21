import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export function LeftTab({current}) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [logoutPop, setLogoutPop] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser == null) {
            navigate('/');
        } else {
            setUser(storedUser);
            setUsername(storedUser.user.username);
        }
    }, [navigate]);

    const mainMenuItems = [
        { key: 'Home', icon: 'M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z', path: '/feed/home' },
        { key: 'Diet', icon: 'M20,10C22,13 17,22 15,22C13,22 13,21 12,21C11,21 11,22 9,22C7,22 2,13 4,10C6,7 9,7 11,8V5C5.38,8.07 4.11,3.78 4.11,3.78C4.11,3.78 6.77,0.19 11,5V3H13V8C15,7 18,7 20,10Z', path: '/feed/diet' },
        { key: 'Exercise', icon: 'M12 5C10.89 5 10 5.89 10 7S10.89 9 12 9 14 8.11 14 7 13.11 5 12 5M22 1V6H20V4H4V6H2V1H4V3H20V1H22M15 11.26V23H13V18H11V23H9V11.26C6.93 10.17 5.5 8 5.5 5.5L5.5 5H7.5L7.5 5.5C7.5 8 9.5 10 12 10S16.5 8 16.5 5.5L16.5 5H18.5L18.5 5.5C18.5 8 17.07 10.17 15 11.26Z', path: '/feed/exercise' },
        { key: 'Sleep', icon: 'M18.73,18C15.4,21.69 9.71,22 6,18.64C2.33,15.31 2.04,9.62 5.37,5.93C6.9,4.25 9,3.2 11.27,3C7.96,6.7 8.27,12.39 12,15.71C13.63,17.19 15.78,18 18,18C18.25,18 18.5,18 18.73,18Z', path: '/feed/sleep' },
    ];

    const secondaryMenuItems = [
        { key: 'Likes', icon: 'M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z', path: '/feed/likes' },
        { key: 'Changes', icon: 'M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z', path: '/feed/changes' },
    ];

    const renderMenuItems = (items) => (
        <div className="space-y-1 px-3">
            {items.map((item) => (
                <button
                    key={item.key}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out ${
                        current === item.key 
                            ? 'bg-blue-50 text-blue-700 shadow-sm' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d={item.icon} />
                    </svg>
                    {item.key}
                </button>
            ))}
        </div>
    );

    return (
        <div className="flex flex-col w-72 bg-white border-r border-gray-200 h-screen shadow-lg">
            <div className="p-6 border-b border-gray-200">
                <h1 className="text-2xl font-poppins font-bold text-gray-800">Dashboard</h1>
            </div>
            <nav className="flex-1 overflow-y-auto pt-4">
                <h2 className="px-6 pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Main Menu</h2>
                {renderMenuItems(mainMenuItems)}
                
                <h2 className="px-6 pt-6 pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</h2>
                {renderMenuItems(secondaryMenuItems)}
                
                <div className="px-3 mt-2">
                    <button
                        onClick={() => {if(user.user.step != 2){navigate('/setup/personal')}else{navigate('/profile/diet')}}}
                        className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out ${
                            current === 'Profile'
                                ? 'bg-blue-600 text-white'
                                : 'border-2 border-blue-500  text-blue-600 hover:bg-blue-100'
                        }`}
                    >
                        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                        </svg>
                        Profile
                    </button>
                </div>
            </nav>
            <div className="p-4 border-t border-gray-200">
                <button 
                    onClick={() => setLogoutPop(!logoutPop)}
                    className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 ease-in-out"
                >
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full mr-3 flex items-center justify-center font-semibold">
                        {username.charAt(0).toUpperCase()}
                    </div>
                    <span className="flex-1 text-left">@{username}</span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {logoutPop && (
                    <div className="mt-2 py-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">Settings</button>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">Appearance</button>
                        <button 
                            onClick={() => {
                                localStorage.removeItem('user');
                                navigate('/');
                            }} 
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                        >
                            Log out
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

LeftTab.propTypes = {
    current: PropTypes.string
};
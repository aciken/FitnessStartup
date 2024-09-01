import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';

export function LeftTabNotLoged({selected}) {
    const navigate = useNavigate();

    const menuItems = [
        { key: 'Home', icon: 'M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z', path: '/' },
        { key: 'Diet', icon: 'M20,10C22,13 17,22 15,22C13,22 13,21 12,21C11,21 11,22 9,22C7,22 2,13 4,10C6,7 9,7 11,8V5C5.38,8.07 4.11,3.78 4.11,3.78C4.11,3.78 6.77,0.19 11,5V3H13V8C15,7 18,7 20,10Z', path: '/signup' },
        { key: 'Exercise', icon: 'M12 5C10.89 5 10 5.89 10 7S10.89 9 12 9 14 8.11 14 7 13.11 5 12 5M22 1V6H20V4H4V6H2V1H4V3H20V1H22M15 11.26V23H13V18H11V23H9V11.26C6.93 10.17 5.5 8 5.5 5.5L5.5 5H7.5L7.5 5.5C7.5 8 9.5 10 12 10S16.5 8 16.5 5.5L16.5 5H18.5L18.5 5.5C18.5 8 17.07 10.17 15 11.26Z', path: '/signup' },
        { key: 'Sleep', icon: 'M18.73,18C15.4,21.69 9.71,22 6,18.64C2.33,15.31 2.04,9.62 5.37,5.93C6.9,4.25 9,3.2 11.27,3C7.96,6.7 8.27,12.39 12,15.71C13.63,17.19 15.78,18 18,18C18.25,18 18.5,18 18.73,18Z', path: '/signup' },
    ];

    return (
        <div className="flex flex-col w-72 bg-white border-r border-gray-200 h-screen shadow-lg">
            <div className="p-6 border-b border-gray-200">
                <h1 className="text-2xl font-poppins font-bold text-gray-800">Dashboard</h1>
            </div>
            <nav className="flex-1 overflow-y-auto pt-4">
                <h2 className="px-6 pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Categories</h2>
                <div className="space-y-1 px-3">
                    {menuItems.map((item) => (
                        <button
                            key={item.key}
                            onClick={() => navigate(item.path)}
                            className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out ${
                                selected === item.key 
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
            </nav>
            <div className="p-4 border-t border-gray-200">
                <button 
                    onClick={() => navigate('/signup')}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                    Sign up
                </button>
            </div>
        </div>
    );
}

LeftTabNotLoged.propTypes = {
    selected: PropTypes.string.isRequired,
};
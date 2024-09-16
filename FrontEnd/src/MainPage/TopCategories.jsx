import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaClock, FaCog, FaPlus, FaFilter, FaList, FaUtensils, FaDumbbell, FaBed, FaUser, FaSignOutAlt, FaTrash, FaEdit, FaCheck, FaPaperPlane } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const timeRanges = [
  { value: 'today', label: 'Today', icon: FaClock },
  { value: 'week', label: 'This Week', icon: FaClock },
  { value: 'month', label: 'This Month', icon: FaClock },
  { value: 'year', label: 'This Year', icon: FaClock },
  { value: 'all', label: 'All Time', icon: FaClock },
];

const postActions = [
  { value: 'all', label: 'All Posts', icon: FaFilter },
  { value: 'start', label: 'Start', icon: FaPlus },
  { value: 'finish', label: 'Finish', icon: FaCheck },
  { value: 'update', label: 'Update', icon: FaEdit },
  { value: 'remove', label: 'Remove', icon: FaTrash },
  { value: 'post', label: 'Post', icon: FaPaperPlane },
];

const categories = [
  { value: 'all', label: 'All', icon: FaList },
  { value: 'diet', label: 'Diet', icon: FaUtensils },
  { value: 'exercise', label: 'Exercise', icon: FaDumbbell },
  { value: 'sleep', label: 'Sleep', icon: FaBed },
];

function Dropdown({ options, selected, onSelect, icon: Icon }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = options.find(option => option.value === selected);
  const SelectedIcon = selectedOption ? selectedOption.icon : Icon;

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
      >
        <div className="flex items-center">
          <SelectedIcon className="mr-2 text-indigo-500" />
          <span>{selectedOption?.label}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown className="ml-2 text-gray-400" />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10 overflow-hidden"
          >
            {options.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ backgroundColor: '#F3F4F6' }}
                onClick={() => {
                  onSelect(option.value);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 flex items-center text-sm text-gray-700"
              >
                <option.icon className="mr-2 text-indigo-500" />
                {option.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProfileDropdown({ onLogout }) {
  
const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setIsOpen(true)}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-500 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <FaUser />
    </motion.button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 overflow-hidden"
          onMouseLeave={() => setIsOpen(false)}
        >
          <button
            onClick={() => navigate('/profile/all')}
            className="w-full text-left px-4 py-2 flex items-center text-sm text-gray-700 hover:bg-gray-100"
          >
            <FaUser className="mr-2 text-indigo-500" />
            Profile
          </button>
          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-2 flex items-center text-sm text-gray-700 hover:bg-gray-100"
          >
            <FaSignOutAlt className="mr-2 text-indigo-500" />
            Log Out
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
  );
}

export function TopCategories({ selectedTimeRange, onTimeRangeChange, selectedAction, onActionChange, selectedCategory, onCategoryChange }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [localCategory, setLocalCategory] = useState(selectedCategory);

  useEffect(() => {
    const path = location.pathname.split('/');
    if (path[1] === 'feed' && path[2]) {
      setLocalCategory(path[2]);
    } else {
      setLocalCategory('all');
    }
  }, [location]);

  useEffect(() => {
    setLocalCategory(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      } else if (currentScrollY > 100 && currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      console.log('Current user in localStorage:', user);
    }, 3000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const handleCategoryChange = (value) => {
    setLocalCategory(value);
    onCategoryChange(value);
    if (value === 'all') {
      navigate('/feed/all');
    } else {
      navigate(`/feed/${value}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-10 bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm shadow-md"
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex justify-center items-center">
              <div className="flex gap-4 items-center">
                <Dropdown
                  options={timeRanges}
                  selected={selectedTimeRange}
                  onSelect={onTimeRangeChange}
                  icon={FaClock}
                />
                <Dropdown
                  options={postActions}
                  selected={selectedAction}
                  onSelect={onActionChange}
                  icon={FaCog}
                />
                <Dropdown
                  options={categories}
                  selected={localCategory}
                  onSelect={handleCategoryChange}
                  icon={FaList}
                />
                <ProfileDropdown onLogout={handleLogout} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaClock, FaCog, FaPlus } from 'react-icons/fa';

const timeRanges = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'year', label: 'This Year' },
  { value: 'all', label: 'All Time' },
];

const postActions = [
  { value: 'all', label: 'All Posts' },
  { value: 'start', label: 'Start' },
  { value: 'finish', label: 'Finish' },
  { value: 'update', label: 'Update' },
  { value: 'remove', label: 'Remove' },
  { value: 'post', label: 'Post' },
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

  return (
    <div className="relative w-40" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
      >
        <div className="flex items-center">
          <Icon className="mr-2 text-gray-500" />
          <span>{options.find(option => option.value === selected)?.label}</span>
        </div>
        <FaChevronDown className={`ml-2 text-gray-400 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
          {options.filter(option => option.value !== selected).map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onSelect(option.value);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-200 text-sm text-gray-700"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function TopCategories({ selectedTimeRange, onTimeRangeChange, selectedAction, onActionChange }) {
  return (
    <div className="absolute top-0 left-0 right-0  z-10">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-center gap-10 items-center">
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
          <button className="bg-blue-500 text-white flex flex-row items-center justify-center px-4 py-2 w-20 rounded-full hover:bg-blue-600 transition-colors duration-300 hover:shadow-lg font-medium">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
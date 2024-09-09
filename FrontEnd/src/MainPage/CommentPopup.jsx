import React, { useState } from 'react';

export function CommentPopup({ isOpen, onClose, onSubmit }) {
    const [comment, setComment] = useState('');

    const handleSubmit = () => {
        onSubmit(comment);
        setComment('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Add a Comment</h2>
                <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Type your comment here..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <div className="flex justify-end mt-4 space-x-2">
                    <button 
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition-all duration-300"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button 
                        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                        onClick={handleSubmit}
                    >
                        Comment
                    </button>
                </div>
            </div>
        </div>
    );
}
import React, { useState } from 'react';
import axios from 'axios';

export function CommentSection({ postId, comments, user, onCommentAdded }) {
    const [newComment, setNewComment] = useState('');

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const response = await axios.post('http://localhost:3000/addComment', {
                postId,
                userId: user.user._id,
                content: newComment
            });

            if (response.data.success) {
                onCommentAdded(response.data.comment);
                setNewComment('');
            } else {
                console.error('Failed to add comment:', response.data.error);
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Comments</h3>
            <form onSubmit={handleSubmitComment} className="mb-6">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full p-2 border rounded-md resize-none"
                    rows="3"
                />
                <button
                    type="submit"
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                    Post Comment
                </button>
            </form>
            <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
                {comments.map((comment) => (
                    <div key={comment._id} className="bg-gray-50 p-4 rounded-md">
                        <p className="font-semibold">{comment.username}</p>
                        <p className="mt-1">{comment.content}</p>
                        <p className="text-sm text-gray-500 mt-2">
                            {new Date(comment.createdAt).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
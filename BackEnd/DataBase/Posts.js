const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    content: { type: String, required: true },
    title: String,
    toValue: String,
    fromValue: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    postType: String,
    category: String,
    likes: { type: Number, default: 0 },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{
      _id: { type: mongoose.Schema.Types.ObjectId, required: true },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      fromValue: String,
      toValue: String,
      username: String,
      likes: { type: Number, default: 0 },
      dislikes: { type: Number, default: 0 },
      likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      dislikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    }]
});

// Check if the model already exists before defining it
const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

module.exports = Post;
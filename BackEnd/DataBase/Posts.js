const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    title: String,
    toValue: String,
    fromValue: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    postType: String,
    likes: { type: Number, default: 0 },
    comments: [{
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      content: String,
      createdAt: { type: Date, default: Date.now }
    }]
});

// Check if the model already exists before defining it
const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

module.exports = Post;
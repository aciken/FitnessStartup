const Post = require('../DataBase/Posts');


const addComment = async (req, res) => {
    try {
        const { postId, comment, userId, username, fromValue, toValue } = req.body;
        const newComment ={ userId, content:comment, createdAt: new Date(), fromValue, toValue, username }
        const post = await Post.findByIdAndUpdate(postId, { $push: { comments: newComment } });
        post.markModified('comments');
        return res.json({ post });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = addComment;

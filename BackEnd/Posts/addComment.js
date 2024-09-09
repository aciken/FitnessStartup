const Post = require('../DataBase/Posts');


const addComment = async (req, res) => {
    try {
        const { postId, comment } = req.body;
        const newComment ={ userId: postId, content:comment, date: new Date() }
        const post = await Post.findByIdAndUpdate(postId, { $push: { comments: newComment } });
        post.markModified('comments');
        return res.json({ post });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = addComment;

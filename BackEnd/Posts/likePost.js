const User = require('../DataBase/DataBase');
const Post = require('../DataBase/Posts');

const likePost = async (req, res) => {
    const { postId, userId } = req.body;

    console.log(postId, userId)
    try {
        const post = await Post.findById(postId);
        const user = await User.findById(userId);

        if (!post || !user) {
            return res.status(404).json({ message: 'Post or User not found' });
        }

        const userLikedIndex = post.likedBy.indexOf(userId);
        const postLikedIndex = user.likedPosts.indexOf(postId);

        if (userLikedIndex > -1) {
            // User has already liked the post, so unlike it
            post.likedBy.splice(userLikedIndex, 1);
            post.likes = Math.max(0, post.likes - 1); // Ensure likes don't go below 0
            user.likedPosts.splice(postLikedIndex, 1);
        } else {
            // User hasn't liked the post, so add their like
            post.likedBy.push(userId);
            post.likes++;
            user.likedPosts.push(postId);
        }

        user.markModified('likedPosts');
        await post.save();
        await user.save();

        console.log(user.likedPosts)


        console.log(post.likes)

        return res.json({user});
    } catch (error) {
        console.error('Error in likePost:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = likePost;
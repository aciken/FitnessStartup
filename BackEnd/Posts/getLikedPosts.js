const Post = require('../DataBase/Posts');

const getLikedPosts = async (req, res) => {
    const { postIds } = req.body;
    const posts = await Post.find({ _id: { $in: postIds } });
    res.json(posts);
}

module.exports =  getLikedPosts ;
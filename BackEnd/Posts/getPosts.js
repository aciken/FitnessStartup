const Post = require('../DataBase/Posts');

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json({posts});
    } catch (error) {
        res.json('Error getting posts');
    }
}

module.exports = getPosts;

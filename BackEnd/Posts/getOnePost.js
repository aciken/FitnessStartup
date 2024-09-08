const Post = require('../DataBase/Posts');

const getOnePost = async (req, res) => {
    const {id} = req.body;
    const post = await Post.findById(id);
    res.json({post});
}

module.exports = getOnePost;
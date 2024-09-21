const Post = require('../DataBase/Posts');

const likeComment = async (req, res) => {
    const {commentId, postId, userId, interaction } = req.body;

    try {
        const post = await Post.findById(postId);


        const comment = post.comments.find(comment => comment._id.toString() === commentId);
        if(comment){

            if(interaction === "like"){
                if(comment.likedBy.includes(userId)){
                    comment.likedBy = comment.likedBy.filter(id => id.toString() !== userId);
                    comment.likes = Math.max(0, comment.likes - 1);
                }else{
                    comment.likedBy.push(userId);
                    comment.likes++;
                }
                if(comment.dislikedBy.includes(userId)){
                    comment.dislikedBy = comment.dislikedBy.filter(id => id.toString() !== userId);
                    comment.dislikes = Math.max(0, comment.dislikes - 1);
                }
            } 
            if(interaction === "dislike"){
                if(comment.dislikedBy.includes(userId)){
                    comment.dislikedBy = comment.dislikedBy.filter(id => id.toString() !== userId);
                    comment.dislikes = Math.max(0, comment.dislikes - 1);
                } else {
                    comment.dislikedBy.push(userId);
                    comment.dislikes++;
                }

                if(comment.likedBy.includes(userId)){
                    comment.likedBy = comment.likedBy.filter(id => id.toString() !== userId);
                    comment.likes = Math.max(0, comment.likes - 1);
                }
            }

            await post.save();
            return res.json({ post });
        }




    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = likeComment;
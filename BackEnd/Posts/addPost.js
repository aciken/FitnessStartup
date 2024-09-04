const User = require('../Database/DataBase')
const Post = require('../DataBase/Posts')

const addPost = async (req, res) => {
    const { title, toValue, fromValue, user, postContent, postType } = req.body;
    console.log(user)

    const post = new Post({
        userId: user._id,
        content: postContent,
        title: title,
        toValue: toValue,
        fromValue: fromValue,
        postType: postType,
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: 0,
        comments: []
    })

    try{
        await post.save();
        res.json({post});
    } catch (error) {
        res.json('Error adding post');
    }


    // const post = {
    //     title,
    //     toValue,
    //     fromValue,
    //     content: postContent,
    //     postType: postType,
    //     date: new Date(),
    // }

    // try{
    //     console.log(post);
    //     console.log('here');
    //     const user = await User.findOne({ email });
    //     console.log(user);
    //     if(user){
    //         console.log('here2');
    //         user.posts.push(post);
    //         await user.save();
    //         console.log(user)
    //         res.json({user});
    //     } else {
    //         res.json('User not found');
    //     }
    // } catch (error) {
    //     res.json('Error adding post');
    // }

}

module.exports = addPost;

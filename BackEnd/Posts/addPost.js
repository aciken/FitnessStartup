const User = require('../Database/DataBase')
const Post = require('../DataBase/Posts')

const addPost = async (req, res) => {
    const { title, toValue, fromValue, user, postContent, postType, category } = req.body;
    console.log(category)


    try{
    const person = await User.findOne({ email: user.email });

    if(!person){
        return res.json('User not found');
    }

    const post = new Post({
        userId: user._id,
        username: user.username,
        content: postContent,
        title: title,
        toValue: toValue,
        fromValue: fromValue,
        postType: postType,
        category: category,
    })

        await post.save();
        person.posts.push(post._id);
        await person.save();

        return res.json({user: person, post: post});
    } catch (error) {
       return res.json('Error adding post');
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

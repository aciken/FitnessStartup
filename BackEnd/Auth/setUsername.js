const User = require('../DataBase/DataBase');

const setUsername = async (req, res) => {
    const { username, id } = req.body;

    const user = await User.findOne({username: username});
    if(user){
        return res.json("Username already taken");
    } else {
        const user = await User.findOne({ _id: id });
        user.username = username;
        await user.save();
        return res.json({ user });
    }

}

module.exports = setUsername;

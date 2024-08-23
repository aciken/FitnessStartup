const User = require('../DataBase/DataBase');

const createAccount = async (req, res) => {
    const {username, email, password} = req.body;

    const user = new User({
        username: username,
        email: email,
        password: password
    });

    try{
        if(await User.findOne({email: email})){
            return res.json('Email already exists');
        } else if(await User.findOne({username:username})){
            return res.json('Username already exists');
        } else {
            await user.save();
            return res.json({user});   
        }
    } catch(err){
        return res.json(err);
    }
}

module.exports = createAccount;
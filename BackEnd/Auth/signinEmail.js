const User = require('../DataBase/DataBase');

const signinEmail = async (req, res) => {
    const {email} = req.body;

    try{
        const user = await User.findOne({email: email});
        if(user){
            return res.json({user});
        } else {
            return res.json('User not found');
        }
} catch(err){
    return res.json(err);
}

}


module.exports = signinEmail;
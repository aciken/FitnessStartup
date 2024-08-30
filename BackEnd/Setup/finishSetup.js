const User = require('../DataBase/DataBase');

const finishSetup = async (req, res) => {
    const {email, setup} = req.body;
    console.log(email)
    try{
        const user = await User.findOne({email: email});
        user.step = 2;
        user.setup = setup;
        await user.save();
        console.log(user)
        return res.json({user});
    } catch(err){
        return res.json(err);
    }

}

module.exports = finishSetup;
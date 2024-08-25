const User = require('../DataBase/DataBase');

const confirmVerification = async (req, res) => {


    const {email, verification} = req.body;

    try{
        const user = await User.findOne({email: email});
        console.log(user.verify, verification, email)
        if(user.verify == verification){
            user.verify = 1;
            await user.save();
            return res.json({user});
        } else {
            return res.json('Incorrect verification code');
        }
} catch(err){
    return res.json(err);
}
}




module.exports = confirmVerification;
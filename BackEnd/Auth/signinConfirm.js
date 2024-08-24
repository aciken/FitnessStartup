const User = require('../DataBase/DataBase');

const signinConfirm = async (req, res) => {
    const {email, password} = req.body;

    try{
        console.log(email, password)
        const user = await User.findOne({email: email});
        if(user.password === password){
            console.log(user)
            return res.json({user});
        } else {
            return res.json('Incorrect Password');
        }

} catch(err){
    return res.json(err);
}
}

module.exports = signinConfirm;
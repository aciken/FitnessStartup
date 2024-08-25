const User = require('../DataBase/DataBase');

const signinConfirm = async (req, res) => {
    const {email, password} = req.body;

    try{
        console.log(email, password)
        const user = await User.findOne({email: email});
        console.log(user.password, password)
        if(user.password === password){
            if(user.verify == 1){
                return res.json({user});
            } else {
                return res.json('Verify');
            }
        } else {
            return res.json('Incorrect Password');
        }

} catch(err){
    return res.json(err);
}
}

module.exports = signinConfirm;
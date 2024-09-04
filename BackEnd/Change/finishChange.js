const User = require('../Database/DataBase');

const finishChange = async (req, res) => {
    const { title, toValue, fromValue, email } = req.body;

    try{

        const user = await User.findOne({ email });
        if(user){
            user.setup[title] = toValue;
            user.changing[title] = '';
            user.markModified('setup');
            user.markModified('changing');
            await user.save();
            res.json({ user });
        } else {
            res.json('User not found');
        }
    } catch (error) {
        res.json('Error finishing change');
    }

}

module.exports = finishChange;

const User = require('../DataBase/DataBase');

const signinGoogle = async (req, res) => {
    const { id } = req.body;
    const user = await User.findOne({ googleId: id });
    if (!user) {
         const user = new User({
            googleId: id,
            google: true
         });
         await user.save();
        return res.json({ user });
    } else {
        return res.json({ user });
    }

}

module.exports = signinGoogle;
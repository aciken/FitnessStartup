const User = require('../DataBase/DataBase');

const signinGoogle = async (req, res) => {
    const { id, googleMail } = req.body;
    const user = await User.findOne({ googleId: id });
    if (!user) {
         const user = new User({
            googleId: id,
            google: true,
            googleMail: googleMail
         });
         await user.save();
        return res.json({ user });
    } else {
        return res.json({ user });
    }

}

module.exports = signinGoogle;
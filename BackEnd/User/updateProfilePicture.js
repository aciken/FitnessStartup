const User = require('../Database/DataBase');

const updateProfilePicture = async (req, res) => {
    const { id, profilePicture } = req.body;
    const user = await User.findByIdAndUpdate(id, { profilePicture }, { new: true });
    console.log(user);
    return res.json(user);
}

module.exports = updateProfilePicture;
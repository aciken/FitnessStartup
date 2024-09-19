const User = require('../Database/DataBase');

const updateProfilePicture = async (req, res) => {
    const { id, profilePicture } = req.body;
    const user = await User.findByIdAndUpdate(id, { profilePicture });
    res.json(user);
}

module.exports = updateProfilePicture;
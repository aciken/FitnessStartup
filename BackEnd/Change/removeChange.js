const User = require('../DataBase/DataBase')

const removeChange = async (req, res) => {
    const {change, email} = req.body
    try {
        const updatedUser = await User.findOneAndUpdate(
            { email: email },
            { $set: { [`changing.${change}`]: '' } },
            { new: true, runValidators: true }
        );
        if (updatedUser) {
            res.json({ user: updatedUser });
        } else {
            res.json('User not found' );
        }

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = removeChange;

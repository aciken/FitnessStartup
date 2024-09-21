const User = require('../DataBase/DataBase')

const addChange = async(req, res) => {
    const {change, value, id} = req.body;


    try {


        const updatedUser = await User.findOneAndUpdate(
            { _id: id },
            { $set: { [`changing.${change}`]: value } },
            { new: true, runValidators: true }
        );

        if (updatedUser) {
            res.json({ user: updatedUser });
        } else {
            res.status(404).json('User not found');
        }
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json('Internal Server Error');
    }
}

module.exports = addChange;
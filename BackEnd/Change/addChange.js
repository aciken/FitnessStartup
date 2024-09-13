const User = require('../DataBase/DataBase')

const addChange = async(req, res) => {
    const {change, value, id} = req.body;

    console.log(change, value, id)
    try {


        const updatedUser = await User.findOneAndUpdate(
            { _id: id },
            { $set: { [`changing.${change}`]: value } },
            { new: true, runValidators: true }
        );

        if (updatedUser) {
            console.log('User updated:', updatedUser);
            res.json({ user: updatedUser });
        } else {
            console.log('User not found');
            res.status(404).json('User not found');
        }
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json('Internal Server Error');
    }
}

module.exports = addChange;
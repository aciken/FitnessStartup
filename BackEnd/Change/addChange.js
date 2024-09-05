const User = require('../DataBase/DataBase')

const addChange = async(req, res) => {
    const {change, value, email} = req.body;

    console.log(change, value, email)
    try {
        console.log('Attempting to update:', {change, value, email});  

        const updatedUser = await User.findOneAndUpdate(
            { email: email },
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
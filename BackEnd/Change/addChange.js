const User = require('../DataBase/DataBase')

const addChange = async(req, res) => {
    let {change, value, id} = req.body;

    try {
        const updateFields = {};
        
        if (value.includes('(') && value.includes(')')) {
            const [mainValue, times] = value.split('(');
            const timesValue = times.replace(')', '').trim();
            updateFields[`changing.${change}`] = mainValue.trim();
            updateFields[`changing.${change}Times`] = timesValue;
        } else {
            updateFields[`changing.${change}`] = value;
        }

        const updatedUser = await User.findOneAndUpdate(
            { _id: id },
            { $set: updateFields },
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
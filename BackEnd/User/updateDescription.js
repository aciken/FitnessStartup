const User = require('../Database/Database');

const updateDescription = async (req, res) => {
    const { id, description } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, { $set: { 'setup.description': description } }, { new: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = updateDescription;
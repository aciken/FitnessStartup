const User = require('../DataBase/DataBase');

const getUser = async (req, res) => {

    const { username } = req.body;
    try {
        const user = await User.findOne({ username });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getUser;

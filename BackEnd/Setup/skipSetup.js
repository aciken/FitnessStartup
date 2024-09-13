const User = require('../DataBase/DataBase');

const skipSetup = async (req, res) => {
    const {id} = req.body;
    try{
        const user = await User.findOne({_id: id});
        user.step = 0;
        await user.save();
        return res.json({user});
    } catch(err){
        return res.json(err);
    }

}

module.exports = skipSetup;
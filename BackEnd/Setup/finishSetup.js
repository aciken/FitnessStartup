const User = require('../DataBase/DataBase');

const finishSetup = async (req, res) => {
    const {id, setup} = req.body;

    try{
        const user = await User.findOne({_id: id});
        user.step = 2;
        user.setup = setup;
        await user.save();
        return res.json({user});
    } catch(err){
        return res.json(err);
    }

}

module.exports = finishSetup;
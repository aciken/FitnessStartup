const User = require('../DataBase/DataBase');

const finishChange = async (req, res) => {
    const { title, toValue, fromValue, id } = req.body;

    try {

        console.log(toValue)
        const user = await User.findOne({ _id: id });
        if (user) {
            let mainValue = toValue;
            let timesValue = '';

            // Check if title includes "exercise" and toValue contains '('
            if (title.includes('exercise')) {
                    mainValue = mainValue.split('(')[0]
                    timesValue = toValue.split('(')[1].charAt(0);

                }
            
            

            console.log(`timesValue: ${timesValue}`)
            console.log(`mainValue: ${mainValue}`)
            console.log(`timesValue,mainValue: ${timesValue}, ${mainValue}`)


            user.setup[title] = mainValue;
            user.setup[`${title}Times`] = timesValue;
            user.changing[title] = '';
            user.changing[`${title}Times`] = '';
            user.markModified('setup');
            user.markModified('changing');
            await user.save();
            res.json({ user });
        } else {
            res.json('User not found');
        }
    } catch (error) {
        res.json('Error finishing change');
    }
}

module.exports = finishChange;

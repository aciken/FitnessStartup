const User = require('../DataBase/DataBase');
const dotenv = require('dotenv');
dotenv.config();
const sgMail = require('@sendgrid/mail');

const createAccount = async (req, res) => {
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
    console.log(process.env.SEND_GRID_API_KEY);
    const {username, email, password} = req.body;

    const code = Math.floor(100000 + Math.random() * 900000);

    const user = new User({
        username: username,
        email: email,
        password: password,
        verify: code
    });

    try{
        if(await User.findOne({email: email})){
            return res.json('Email already exists');
        } else if(await User.findOne({googleMail: email})){
            return res.json('Email already exists');
        } else if(await User.findOne({username:username})){
            return res.json('Username already exists');
        } else {
            await user.save();



            const msg = {
                to: email,
                from: { name: 'Fitness Network', email: 'adrianmarton2006@gmail.com' },
                subject: 'Verification Code',
                text: `Your verification code is: ${code}`,
                html: `
                  <div style="font-family: Arial, sans-serif; width: 100%; background-color: #f5f5f5; padding: 50px 0;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; text-align: center; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                      <h2 style="color: #333; font-size: 24px; margin-bottom: 20px;">Verification Code</h2>
                      <p style="font-size: 16px; color: #555; margin-bottom: 20px;">Your verification code is:</p>
                      <p style="font-size: 28px; font-weight: 700; color: #007BFF; margin: 20px 0;">${code}</p>
                    </div>
                  </div>
                `,
              };
              await sgMail.send(msg);

            return res.json({user});   
        }
    } catch(err){
        return res.json(err);
    }
}

module.exports = createAccount;





const User = require('../models/user');
const crypt = require('../utils/crypt');

exports.ShowRegisterPage = (req, res) => {
    res.render('Register',{
        message:''
    })
}

exports.actionRegisterpPage = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try{
        await User.create({
            firstName,
            lastName,
            email,
            password: await crypt.encode(password),
            status:"INACTIVE"
        })
        return res.render('login',{
            message:'Account registered.',
            email
        })
    }
    catch(error){
        // console.log("Some error occured");
        return res.render('Register',{
            message:'Account already registered. please login!'
        })
    }
}
const User = require('../models/user');
const crypt = require('../utils/crypt');
const tokenGen = require('../utils/generateToken');

exports.ShowLoginPage = (req, res) => {
    // console.log(req.headers.cookie);
    res.render('Login', {
        message: "",
        email:""
    });
}

exports.ActionLoginPage = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.render('Login', {
                message: 'Account not found!',
                email
            })
        }



        if (await crypt.decode(user.password, password)) {
            if (user.status === 'ACTIVE') {
                const token = await tokenGen.genToken(req.body.email);
                // console.log(token);
                res.cookie("token", token);
                return res.redirect('/dashboard');
            }
            else{
                // console.log(email);
                return res.render('Login', {
                    message: 'Account Not Active',
                    email
                })
            }
        }
        else {
            return res.render('Login', {
                message: "Invalid email or password.",
                email
            })
        }
    }
    catch (error) {
        console.log("some error occured");
    }
}



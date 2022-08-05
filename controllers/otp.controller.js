const OtpGen = require('../utils/generateOtp');
const mailer = require('../utils/mailer');
const OtpData = require('../models/otp');
const User = require('../models/user');

exports.showOtpPage = (req, res) => {
    // console.log(req.session.message);
    res.render('Otp', {
        email: req.session.email,
        message: ""
    });
}

exports.sendOtp = async (req, res) => {
    let otp;
    // console.log(req.query.email);
    try {
        let data = await OtpData.findOne({ email: req.query.email });
        if (data) {
            otp = data.otp;
        }
        else {
            otp = OtpGen.generate();
            await OtpData.create({
                email: req.query.email,
                otp: otp.toString()
            })
        }
        await mailer.sendmail({
            user:req.query.email,
            otp
        })
        // await OtpData.create({
        //     email: req.query.email,
        //     otp: otp.toString()
        // })
        req.session.email = req.query.email;
        return res.redirect('/verify');
    }
    catch (error) {
        res.render('login', {
            message: "Some error occured",
            email: ""
        })

    }
}



exports.TestOtp = async (req, res) => {
    const { email, val1, val2, val3, val4 } = req.body;
    try {
        const data = await OtpData.findOne({ email: email });
        if (data.otp === (val1 + val2 + val3 + val4)) {
            await User.updateOne({ email: email }, { status: "ACTIVE" });
            await OtpData.deleteOne({ email: email });
            res.render('login', {
                message: "You account is active Now.",
                email
            });
        }
        else {
            res.render('Otp', {
                message: "Invalid otp.",
                email
            });
        }
    }
    catch (error) {
        res.render('login', {
            message: "Some error occured",
            email
        });
    }
}
const express = require('express');
const app = express();

// middlewares
const isAuthenticated = require('./middleware/authUser');
//Controllers.
const LoginController = require('./controllers/login.controller');
const RegsiterController = require('./controllers/register.controller');
const dashboardController = require('./controllers/auth.controller');
const otpauth = require('./controllers/otp.controller')
// app status
app.get("/health",(req,res)=>{
    console.log("The Server is up and running");
    res.send("The Server is up and running");
});
// app.get('/',(req,res)=>{
//     res.render('Login',{
//         message:"",
//         email:""
//     })
// })

//otp auth
app.get('/sendotp',otpauth.sendOtp);

app.get('/verify',otpauth.showOtpPage);
app.post('/verify',otpauth.TestOtp);

//Login route.
app.get('/login',LoginController.ShowLoginPage);
app.post('/login',LoginController.ActionLoginPage);


// logout route
app.get('/logout',dashboardController.logout);

//Register Route
app.get('/register',RegsiterController.ShowRegisterPage);
app.post('/register',RegsiterController.actionRegisterpPage);


// dashboard route.
app.get('/dashboard',isAuthenticated.isAuthenticated,dashboardController.dashboard);
module.exports = app
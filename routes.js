const express = require('express');
const app = express();

// middlewares
const isAuthenticated = require('./middleware/authUser');

//Controllers.

const LoginController = require('./controllers/login.controller');
const RegsiterController = require('./controllers/register.controller');
const dashboardController = require('./controllers/auth.controller');
const otpauth = require('./controllers/otp.controller');
const NotesController = require('./controllers/notes.controller');
const HandWritten = require('./controllers/Handwritten.controller');
const sendNotes = require('./controllers/emailNotes.controller');

// app status
app.get("/health",(req,res)=>{
    console.log("The Server is up and running");
    res.send("The Server is up and running");
});
app.get('/',(req,res)=>{
    return res.redirect('/login');
})

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


                        //Notes
//add action
app.get('/action/ta',isAuthenticated.isAuthenticated,NotesController.AddNotes);
app.post('/action/ta',isAuthenticated.isAuthenticated,NotesController.actionAddNotes);

//delete action
app.post('/action/td/:id',isAuthenticated.isAuthenticated,NotesController.actionDelete);

//edit action
app.get('/action/ed/:id',isAuthenticated.isAuthenticated,NotesController.EditPage);
app.post('/action/ed/:id',isAuthenticated.isAuthenticated,NotesController.actionEditPage);

//HandWritten action
app.post('/action/hr/:id',isAuthenticated.isAuthenticated,HandWritten.ConvertAndDownload);

// send notes by email
app.post('/action/sm/:id',isAuthenticated.isAuthenticated,sendNotes.SendEmail);

module.exports = app
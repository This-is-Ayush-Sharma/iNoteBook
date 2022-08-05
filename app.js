const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const routes = require('./routes');
const setupDB = require('./config/connectdb');
require('dotenv').config();

app.set("view engine","ejs");

var session = require('express-session');
app.use(session({secret: 'mySecret', resave: false, saveUninitialized: false}));

app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use('/',routes);

setupDB.connectDB();



app.listen(process.env.PORT,()=>{
    console.log("server is up and listenting.");
})
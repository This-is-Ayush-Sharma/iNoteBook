const jwt = require('jsonwebtoken');


exports.isAuthenticated = async (req,res,next)=>{
    let cookie = req.headers.cookie; // we need to access the cookies from the header.
    if(!cookie.includes("token")){
        return res.render('Login',{
            message:"You are not authorized.",
            email:""
        })
    }
    let token = cookie.split("token=")[1];
    // console.log(token);
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        //now token is valid and we can proceed further
        if(err)
        {
            return res.render('Login',{
                message:'session expired.',
                email:""
            })
        }
        // console.log(user);
        req.user=user;
        next();
    });
}
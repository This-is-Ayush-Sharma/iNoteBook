const Notes = require('../models/notes');

exports.dashboard = async(req,res)=>{
    const notes = await Notes.find({email:req.user.email});
    return res.render('ShowDashboard',{
        message:'',
        firstName:req.user.firstName,
        lastName:req.user.lastName,
        notes
    })
}

exports.logout = async (req, res) => {
    res.clearCookie("token");
    return res.redirect("/login");
}

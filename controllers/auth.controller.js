exports.dashboard = async(req,res)=>{
    return res.render('dashboard')
}

exports.logout = async (req, res) => {
    res.clearCookie("token");
    return res.redirect("/login");
}

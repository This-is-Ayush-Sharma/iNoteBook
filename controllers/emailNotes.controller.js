const sendNotes = require('../utils/sendNotes');
const Notes = require('../models/notes');

exports.SendEmail = async (req,res)=>{
    try{
        let notes = await Notes.findOne({_id:req.params.id});
        sendNotes.sendmail({
            email:req.user.email,
            title:notes.title,
            body:notes.body,
        })
        notes = await Notes.find({ email: req.user.email });
        return res.render('ShowDashboard', {
            message: "Mail sent!!",
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            notes
        })
    }   
    catch(error)
    {
        const notes = await Notes.find({ email: req.user.email });
        return res.render('ShowDashboard', {
            message: "Unable to download!",
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            notes
        })
    } 
}
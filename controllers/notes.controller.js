const Notes = require('../models/notes');
exports.AddNotes = async (req, res) => {
    return res.render('AddNotes', {
        message: "",
        firstName: req.user.firstName,
        lastName: req.user.lastName
    });
}
exports.actionAddNotes = async (req, res) => {
    const { title, body } = req.body;
    try {
        await Notes.create({
            email: req.user.email,
            title,
            body
        })
        return res.render('AddNotes', {
            message: "Notes was added successfully",
            firstName: req.user.firstName,
            lastName: req.user.lastName
        })
    }
    catch (error) {
        return res.render('AddNotes', {
            message: "Some error occured",
            firstName: req.user.firstName,
            lastName: req.user.lastName
        })
    }
}

exports.actionDelete = async (req, res) => {
    // console.log(req.params.id);
    try {
        await Notes.deleteOne({ _id: req.params.id });
        const notes = await Notes.find({ email: req.user.email });
        return res.render('ShowDashboard', {
            message: "Notes deleted successfully.",
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            notes
        })
    }
    catch (error) {
        const notes = await Notes.find({ email: req.user.email });
        return res.render('ShowDashboard', {
            message: "Notes can't be deleted.",
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            notes
        })
    }
}

exports.EditPage = async (req, res) => {
    const data = await Notes.findOne({ _id: req.params.id });
    return res.render('EditNotes', {
        message: "",
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        data
    });
}

exports.actionEditPage = async (req,res)=>{
    try{
        await Notes.updateOne({_id:req.params.id},{title:req.body.title,body:req.body.body});
        const notes = await Notes.find({ email: req.user.email });
        // console.log(notes);
        return res.render('ShowDashboard', {
            message: "Notes edited successfully.",
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            notes
        });
    }
    catch(error)
    {
        const notes = await Notes.find({ email: req.user.email });
        return res.render('ShowDashboard', {
            message: "Notes could not be edited.",
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            notes
        })
    }
}
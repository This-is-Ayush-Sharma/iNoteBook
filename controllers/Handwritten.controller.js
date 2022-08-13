const handwritten = require('handwritten.js');
const fs = require('fs');
const path = require('path');
const Notes = require('../models/notes');
const uuid4 = require('uuid4');
exports.ConvertAndDownload = async (req, res) => {
    try {
        const notes = await Notes.findOne({ _id: req.params.id });
        const Filenm = uuid4();
        const filepath = path.resolve(__dirname, `../handwritten/${Filenm}.pdf`);
        await handwritten(`${notes.title}\n${notes.body}`).then((converted) => {
            converted.pipe(fs.createWriteStream(filepath));
        })
        await handwritten(`${notes.title}\n${notes.body}`,(converted)=>{
            converted.pipe(fs.createWriteStream(filepath));
        })
        fs.readFile(filepath, (err, file) => {
            if (err) {
                console.log("error occured");
                return res.send("Can't download file.")
            }
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment;filename=${Filenm}.pdf`);
            return res.send(file);
        })
    }
    catch (error) {
        // console.log(error);
        const notes = await Notes.find({ email: req.user.email });
        return res.render('ShowDashboard', {
            message: "Unable to download!",
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            notes
        })
    }
}
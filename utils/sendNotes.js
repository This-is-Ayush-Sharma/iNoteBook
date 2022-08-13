
const nodemailer = require("nodemailer");
// async..await is not allowed in global scope, must use a wrapper
exports.sendmail = async (obj) => {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.EMAIL, // generated ethereal user
            pass: process.env.PASSWORD, // generated ethereal password
        },
    });

    let info = await transporter.sendMail({
        from: `"Your notes. 👻" ${process.env.EMAIL}`,
        to: `${obj.email}`,
        subject: "Your Notes is here.", 
        text: `
${obj.title}

${obj.body}
        `, 
    });

    // console.log("Message sent: %s", info.messageId);
}
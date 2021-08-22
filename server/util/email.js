var nodemailer = require('nodemailer');

const email_address = "bonfire.noreply@gmail.com";

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email_address,
        pass: process.env.GMAILPWD
    }
});

var mailOptions = {
    from: email_address,
    to: 'kevin203@gmail.com, artb1234567@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};



function sendTestMail() {
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } 
        else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports.sendTestMail = sendTestMail;
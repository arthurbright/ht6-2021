var nodemailer = require('nodemailer');

const BONFIRE_EMAIL = "bonfire.noreply@gmail.com";

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: BONFIRE_EMAIL,
        pass: process.env.GMAILPWD
    }
});

var mailOptions = {
    from: BONFIRE_EMAIL,
    to: 'artb1234567@gmail.com',
    cc: 'jenniferxying@gmail.com, lavanpie@gmail.com',
    bcc: 'kevin203@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
    html: '<h1>Welcome</h1><p>That was easy!</p><img src=https://upload.wikimedia.org/wikipedia/commons/a/a1/Mallard2.jpg/>'
};

function sendReminderEmail(to_address, room_code) {
    let mail = {
        from: BONFIRE_EMAIL,
        to: to_address,
        bcc: 'kevin203@gmail.com, artb1234567@gmail.com',

        // EMAIL CONTENTS GO HERE
        subject: 'Your Bonfire Room',
        text: `Hi there, fellow Bonfire user!\nYour Bonfire room ${room_code} has ended.`,
        //html: '<img src=https://upload.wikimedia.org/wikipedia/commons/a/a1/Mallard2.jpg/>'
    };

    transporter.sendMail(mail, function(error, info) {
        if (error) {
            console.log(error);
        } 
        else {
            console.log('Email sent: ' + info.response);
        }
    });
}

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

module.exports.sendReminderEmail = sendReminderEmail;
module.exports.sendTestMail = sendTestMail;
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

admin.initializeApp();

// Using Gmail
let transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 46,
    secure: true,
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
});

// Sending the request
exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        // Getting query parameter from http request
        const subject = req.query.subject;
        const msg = req.query.msg;

        const mailOptions = {
            from: gmailEmail,
            to: gmailEmail,
            subject: `${subject}`,
            html: `${msg}`
        };

        // Getting results
        return transporter.sendMail(mailOptions, (erro, info) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });
    });
});

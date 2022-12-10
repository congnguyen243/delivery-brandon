const nodemailer = require('nodemailer');
const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const user = 'brandonta1035@gmail.com',
    pass = 'cufknlmagpcklimj';


//google account credentials used to send email
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: user,
        pass: pass
    }
});

const template_mail = require('./template-email.js');

const send = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        switch (request.method) {
            case 'POST':
                response.setHeader('Content-Type', 'application/json');
                let body = request.body,
                    email_sender = body.email_sender,
                    transaction = body.transaction;
                // functions.logger.info('body', body);

                if ("undefined" == typeof email_sender) {
                    response.status(400).send('Missing email');
                } else if ('undefined' == typeof transaction) {
                    response.status(400).send('Missing transaction data');
                } else {

                    try {
                        let the_intro = 'You have just made a request.',
                            mail_template = template_mail.template_mail_options(user, email_sender, the_intro, transaction)

                        transporter.sendMail(mail_template, (error, data) => {
                            if (error) {
                                functions.logger.debug('sent email failed', error)
                            };
                            functions.logger.info('sent sender\'s email', data)
                        });
                        response.status(200).json({msg: 'Sent email'})
                    } catch (e) {
                        functions.logger.debug('send mail admin failed', e);
                        response.status(400).send({
                            email_status: false,
                            status: false,
                            error: e,
                        });
                    }

                }
                break;
            default:
                response.status(400).send('Invalid request');
        }
    });



})

module.exports.sendNotify = send;

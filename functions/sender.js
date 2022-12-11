require('dotenv').config();
const nodemailer = require('nodemailer');
const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const user = process.env.ADMIN_EMAIL,
      pass = process.env.ADMIN_PASS;

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
const { authenticateApi } = require('./authentication.js');

const send = functions.https.onRequest(async (request, response) => {
    cors(request, response, async () => {
        // API Key Authentication
        let key = request.headers['x-api-key'] || '';
        let auth = await authenticateApi(key)
        if (!auth) {
            return response.status(401).send('Unauthorized');
        }
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

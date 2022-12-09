const nodemailer = require('nodemailer');
const functions = require('firebase-functions');
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
    switch (request.method) {
        case 'POST':
            response.setHeader('Content-Type', 'application/json');
            let body = request.body,
                email_admin = body.email_admin,
                request_id = body.request_id,
                transaction = body.transaction;
            // functions.logger.info('body', body);

            if ("undefined" == typeof email_admin) {
                response.status(400).send('Missing email admin');
            } else if ('undefined' == typeof transaction) {
                response.status(400).send('Missing transaction data');
            } else if ('undefined' == typeof request_id) {
                response.status(400).send('Missing request id');
            } else {

                try {
                    let the_intro_admin = 'The system has a new transaction.',
                        controller = `
                            <h5>Let confirm the request.</h5>
                            <a href="https://fsjubgi4st5ofurbronlzxigrq0qcdgg.lambda-url.ap-northeast-1.on.aws/?id=${request_id}&request=confirmed" style="text-decoration: none;    font-style: initial;    padding: 10px 40px;    border: none;    background-color: #85A76F;    color: #ffffff;    font-weight: 400;">Confirm</a>
                            <a href="https://fsjubgi4st5ofurbronlzxigrq0qcdgg.lambda-url.ap-northeast-1.on.aws/?id=${request_id}&request=rejected" style="text-decoration: none;    font-style: initial;    padding: 10px 40px;    border: none;    background-color: #E74558;    color: #ffffff;    font-weight: 400;" class="btn btn-danger">Reject</a>
                        `;

                    let mail_template = template_mail.template_mail_options_admin(user, email_admin, the_intro_admin, transaction, controller)

                    transporter.sendMail(mail_template, (error, data) => {
                        if (error) {
                            functions.logger.info('sent email failed', error)
                        };
                        functions.logger.info('sent email', data)
                    });

                    response.status(200).send('OK');
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

})

module.exports.sendNotify = send;

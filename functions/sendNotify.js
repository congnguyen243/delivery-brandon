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


const template_mail_options = require('./template-email');
const template_mail_options_admin = require('./template-email');

const send_notify = functions.https.onRequest((req, res) => {
    if('undefined' == typeof req.body.email_admin) {
        return res.status(400).send("Missing email admin");
    }

    if('undefined' == typeof req.body.email_sender) {
        return res.status(400).send("Missing email sender");
    }

    if('undefined' == typeof req.body.request_id) {
        return res.status(400).send("Missing request id");
    }

    if('undefined' == typeof req.body.transaction) {
        return res.status(400).send("Missing transaction");
    }

    try {
        let data = req.body.transaction,
            the_email_admin = req.body.email_admin,
            the_email = req.body.email_sender,
            req_id = req.body.request_id;
        let the_intro = 'You have just made a request.',
            the_intro_admin = 'The system has a new transaction.',
            controller = `
                <h5>Let confirm the request.</h5>
                
                <a href="https://fsjubgi4st5ofurbronlzxigrq0qcdgg.lambda-url.ap-northeast-1.on.aws/?id=${req_id}&request=confirmed" style="text-decoration: none;    font-style: initial;    padding: 10px 40px;    border: none;    background-color: #85A76F;    color: #ffffff;    font-weight: 400;">Confirm</a>
                <a href="https://fsjubgi4st5ofurbronlzxigrq0qcdgg.lambda-url.ap-northeast-1.on.aws/?id=${req_id}&request=rejected" style="text-decoration: none;    font-style: initial;    padding: 10px 40px;    border: none;    background-color: #E74558;    color: #ffffff;    font-weight: 400;" class="btn btn-danger">Reject</a>
            `,

            res_email = {
                email_status: null,
                email_status_admin: null,
                status: null,
                error: null,
            };
        return res.status(123).send(data.sender);

        let mail_options = template_mail_options.template_mail_options(user, the_email, the_intro, data)
        let mail_options_admin = template_mail_options_admin.template_mail_options_admin(user, the_email_admin, the_intro_admin, data, controller)

        transporter.sendMail(mail_options, (error, data) => {
            if (error) {
                res_email.status = false;
                res_email.error = "Failed to send notify. Please try again";
                console.log(res_email);
                return res.send(res_email);
            };

            res_email.status = true;
            res_email.email_status = data;
        });

        transporter.sendMail(mail_options_admin, (error, data) => {
            if (error) {
                res_email.status = false;
                res_email.error = "Failed to send notify. Please try again";
                console.log(res_email);
                return res.send(res_email);
            };

            res_email.status = true;
            res_email.email_status_admin = data;
            return res.send(res_email);
        });

    }catch (e) {
        return res.status(400).send({
            email_status: false,
            status: false,
            error: e,
        });
    }


})

module.exports.sendNotify = send_notify;

const nodemailer = require('nodemailer');
const functions = require('firebase-functions');
const getCode = require('./getCode')
const user = functions.config().gmail.email,
    pass = functions.config().gmail.password;

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


const template_send_code = require('./template-email');


/*
 * @desc: to return the the time for next {min} minutes
 * @return {format, ts}
 * */
const get_expiration_time = (min = 5) => {
    let ts = (new Date()).getTime() + (min * 60000),
        cdate = new Date();

    cdate.setTime(ts);

    return {
        format: [cdate.getMonth() + 1,
            '/',
        cdate.getDate(),
            '/',
        cdate.getFullYear(),
            ' ',
        cdate.getHours(),
            ':',
        cdate.getMinutes()].join(''),
        ts: cdate.getTime()
    };

}; //


const sendCodeVerifyEmail = functions.https.onRequest(async (req, res) => {
    let the_name = req.body.name ?? "User",
            the_email = req.body.email,
            the_code = await getCode.getCode(the_email),
            exp_time = get_expiration_time(),
            code = the_code.code;
        let res_email = {
            data: {
                code: null
            },
            status: null,
            error: null,
            exp_time: null,
            email_status: null
        };
      
        let mailOptions = template_send_code.template_send_code(user,the_email,the_name,code)

        transporter.sendMail(mailOptions, (error, data) => {
            if (error) {
                res_email.status = false;
                res_email.error = "Failed to generate a code. Please try again";
                return res.send(res_email);
            }
            res_email.data.code = code;
            res_email.exp_time = exp_time;
            res_email.status = true;
            res_email.email_status = data;
            return res.send(res_email);
        });



})

module.exports.sendCodeVerifyEmail = sendCodeVerifyEmail;
 
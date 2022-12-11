require('dotenv').config();
const nodemailer = require('nodemailer');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const db = admin.firestore();
const user = process.env.ADMIN_EMAIL,
    pass = process.env.ADMIN_PASS;

//google account credentials used to send email
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: user,
        pass: pass,
    },
});

const template = require('./template-email');

const actionConfirm = functions.https.onRequest(async (req, res) => {
    if (req.method.toUpperCase() == 'GET') {
        res.setHeader('Content-Type', 'application/json');
        let the_request_id = req.query.request_id,
            the_request = req.query.request,
            the_email = req.query.email;

        if (
            'string' !== typeof the_request_id ||
            'string' !== typeof the_request ||
            'string' !== typeof the_email ||
            !['confirmed', 'rejected'].includes(the_request)
        ) {
            res.status(400).send('Invalid request');
        } else {
            const cl_delivery_info = db.collection('delivery-info');
            let res_cl = cl_delivery_info.doc(the_request_id);
            res_cl
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        // functions.logger.info('firebase data ' + data.id, {data: doc.data()});
                        if (doc.data().status) {
                            functions.logger.info(`admin already updated status request #${the_request_id}`);
                            res.send('Execution failed. You have updated the request status before');
                        } else {
                            functions.logger.info(`admin updated status request #${the_request_id}`, {
                                data: the_request,
                            });
                            res_cl.update({ status: the_request });
                            let mailOptions = template.template_confirmation(
                                user,
                                the_email,
                                the_request,
                                the_request_id
                            );

                            transporter.sendMail(mailOptions, (error, data) => {
                                if (error) {
                                    functions.logger.debug('action confirm failed', { error: error });
                                    res.status(200).send('Action failed. Please try again');
                                }

                                functions.logger.info(`Sent mail for request #${the_request_id} successful`, {
                                    data: data,
                                });
                            });

                            res.status(200).send(`You has been ${the_request} request #${the_request_id} successful`);
                        }
                    } else {
                        // functions.logger.info('firebase data ' + data.id, 'no data');
                        res.status(400).send(`The request #${the_request_id} not found`);
                    }
                })
                .catch((error) => {
                    functions.logger.debug('firebase data error ' + data.id, { error: error });
                    res.status(400).send(`Something wrong`);
                });
        }
    } else {
        res.status(400).send('Invalid method');
    }
});

module.exports.actionConfirm = actionConfirm;

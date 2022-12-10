
const sendEmail = require("./sendEmail.js");
exports.sendCodeVerifyEmail = sendEmail.sendCodeVerifyEmail;


const sender = require('./sender.js')
/**
 * @description: Sender function for send notify email to sender
 * payload : {
 *     "email_sender" : "nguyenchi.dev@gmail.com",
 *     "transaction": {
 *         "package": {
 *             "package_type": "small-package",
 *             "pickup_location": "12 Hutgate California",
 *             "dropoff_location": "61 New York Times",
 *             "date_type": "Same Date Delivery"
 *         },
 *         "recipient": {
 *             "firstname": "Brandon",
 *             "lastname": "Ta",
 *             "phone": "0123456789",
 *             "email": "brandon@gmail.com"
 *         },
 *         "sender": {
 *             "firstname": "Chris",
 *             "lastname": "Nguyen",
 *             "phone": "0123456789",
 *             "email": "brandon@gmail.com"
 *         },
 *         "payment": {
 *             "payment_type": "credit card",
 *             "payment_data": {
 *                 "service_fee": 123,
 *                 "date_type_fee": 3,
 *                 "total": 241
 *             },
 *             "date_time": "",
 *             "payment_status": "Approval"
 *         }
 *     }
 * }
 * @type {HttpsFunction}
 */
exports.sender = sender.sendNotify

const admin = require('./admin.js')
/**
 * @description: Admin function for send notify email to admin
 * payload : {
 *     "email_admin" : "nguyenchi.dev@gmail.com",
 *     "request_id" : "F3mj234f332",
 *     "transaction": {
 *         "package": {
 *             "package_type": "small-package",
 *             "pickup_location": "12 Hutgate California",
 *             "dropoff_location": "61 New York Times",
 *             "date_type": "Same Date Delivery"
 *         },
 *         "recipient": {
 *             "firstname": "Brandon",
 *             "lastname": "Ta",
 *             "phone": "0123456789",
 *             "email": "brandon@gmail.com"
 *         },
 *         "sender": {
 *             "firstname": "Chris",
 *             "lastname": "Nguyen",
 *             "phone": "0123456789",
 *             "email": "brandon@gmail.com"
 *         },
 *         "payment": {
 *             "payment_type": "credit card",
 *             "payment_data": {
 *                 "service_fee": 123,
 *                 "date_type_fee": 3,
 *                 "total": 241
 *             },
 *             "date_time": "",
 *             "payment_status": "Approval"
 *         }
 *     }
 * }
 * @type {HttpsFunction}
 */
exports.admin = admin.sendNotify

const actionConfirm = require("./actionConfirm.js");
exports.actionConfirm = actionConfirm.actionConfirm;

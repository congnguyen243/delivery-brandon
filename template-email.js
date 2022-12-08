const template_send_code = (user, the_email, the_name, the_code) => {
    const mailOptions = {
        from: user,
        to: the_email,
        subject: `Authorization Request for ${the_name}`,
        html: `
                    <h1>Hi ${the_name}</h1>
                    <p>Please use the following code to continue your login process.</p>
                    <h2>${the_code}</h2>
                    <br/>
                    <p>Staffs</p>
                `
    };
    return mailOptions;
}


const template_mail_options = (user = null, the_email = null, the_intro = null, data = null) => {

    const mail_options = {
        from: user,
        to: the_email,
        subject: `Delivery & Pickup - The system has a new transaction ${the_intro}`,
        html: `
                <p>${the_intro}</p>
                <h1 style="margin-bottom: 0">Sender</h1>
                <b>Fullname: </b>
                <span>${data.sender.firstname}</span>
                <span>${data.sender.lastname}</span><br/>
                <b>Phone: </b>
                <span>${data.sender.phone}</span><br/>
                <b>Email: </b>
                <span>${data.sender.email}</span><br/>
                <h1 style="margin-bottom: 0">Recipient</h1>
                <b>Fullname: </b>
                <span>${data.recipient.firstname}</span>
                <span>${data.recipient.lastname}</span><br/>
                <b>Phone: </b>
                <span>${data.recipient.phone}</span><br/>
                <b>Email: </b>
                <span>${data.recipient.email}</span><br/>
                <h1 style="margin-bottom: 0">Package</h1>
                <b>Package type: </b>
                <span>${data.package.package_type}</span><br/>
                <b>Pickup Location: </b>
                <span>${data.package.pickup_location}</span><br/>
                <b>Drop-off Location: </b>
                <span>${data.package.dropoff_location}</span><br/>
                <b>Priority: </b>
                <span>${data.package.date_type}</span><br/>
                <h1 style="margin-bottom: 0">Payment</h1>
                <b>Payment method: </b>
                <span>${data.payment.payment_type}</span><br/>
                <b>Payment detail: </b>
                <ul>
                    <li>
                        Service fee: $ ${data.payment.payment_data.service_fee}
                    </li>
                    <li>
                        Date type fee: $ ${data.payment.payment_data.date_type_fee}
                    </li>
                    <li class="payment-total">
                        Total: $ ${data.payment.payment_data.total}
                    </li>
                    <li>
                        Payment status: ${data.payment.payment_status}
                    </li>
                </ul>                          
                <br/>
                <p>Anh Mai Logistic</p>                
            `
    };

    return mail_options;
}


const template_mail_options_admin = (user = null, the_email_admin = null, the_intro_admin = null, data = null, controller = null) => {
    const mail_options_admin = {
        from: user,
        to: the_email_admin,
        subject: `Delivery & Pickup - The system has a new transaction ${the_intro_admin}`,
        html: `
                <p>${the_intro_admin}</p>
                <h1 style="margin-bottom: 0">Sender</h1>
                <b>Fullname: </b>
                <span>${data.sender.firstname}</span>
                <span>${data.sender.lastname}</span><br/>
                <b>Phone: </b>
                <span>${data.sender.phone}</span><br/>
                <b>Email: </b>
                <span>${data.sender.email}</span><br/>
                <h1 style="margin-bottom: 0">Recipient</h1>
                <b>Fullname: </b>
                <span>${data.recipient.firstname}</span>
                <span>${data.recipient.lastname}</span><br/>
                <b>Phone: </b>
                <span>${data.recipient.phone}</span><br/>
                <b>Email: </b>
                <span>${data.recipient.email}</span><br/>
                <h1 style="margin-bottom: 0">Package</h1>
                <b>Package type: </b>
                <span>${data.package.package_type}</span><br/>
                <b>Pickup Location: </b>
                <span>${data.package.pickup_location}</span><br/>
                <b>Drop-off Location: </b>
                <span>${data.package.dropoff_location}</span><br/>
                <b>Priority: </b>
                <span>${data.package.date_type}</span><br/>
                <h1 style="margin-bottom: 0">Payment</h1>
                <b>Payment method: </b>
                <span>${data.payment.payment_type}</span><br/>
                <b>Payment detail: </b>
                <ul>
                    <li>
                        Service fee: $ ${data.payment.payment_data.service_fee}
                    </li>
                    <li>
                        Date type fee: $ ${data.payment.payment_data.date_type_fee}
                    </li>
                    <li class="payment-total">
                        Total: $ ${data.payment.payment_data.total}
                    </li>
                    <li>
                        Payment status: ${data.payment.payment_status}
                    </li>
                </ul>                          
                <br/>
                ${controller}
                <p>Anh Mai Logistic</p>                
            `
    };

    return mail_options_admin;
}


module.exports.template_send_code = template_send_code;
module.exports.template_mail_options = template_mail_options;
module.exports.template_mail_options_admin = template_mail_options_admin;
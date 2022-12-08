let data =  {
  email_admin: "tnngithub525@gmail.com",
  email_sender: "ninhta35@gmail.com",
  request_id: '1zKNbvppWf6SExowFZ5k',
  transaction: {
      "package": {
          "package_type": "small-package",
          "pickup_location": "12 Hutgate California",
          "dropoff_location": "61 New York Times",
          "date_type": "Same Date Delivery"
      },
      "recipient": {
          "firstname": "Brandon",
          "lastname": "Ta",
          "phone": "0123456789",
          "email": "brandon@gmail.com"
      },
      "sender": {
          "firstname": "Chris",
          "lastname": "Nguyen",
          "phone": "0123456789",
          "email": "brandon@gmail.com"
      },
      "payment": {
          "payment_type": "credit card",
          "payment_data": {
              "service_fee": 123,
              "date_type_fee": 3,
              "total": 241
          },
          "date_time": "",
          "payment_status": "Approval"
      }
  }
}


fetch('https://us-central1-test-cloud-function-b16c7.cloudfunctions.net/sendNotify', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then((response) => response)
  .then((data) => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });


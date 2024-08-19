require('dotenv').config()
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// Set up mail transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.log('SMTP connection error:', error);
    } else {
        console.log('SMTP connection successful');
    }
});

app.get('/send', (req, resp) => {
    const { uname, uemail, umessage } = req.query;
    if (!uname || !uemail || !umessage) {
        console.log("Inside this",req)
        if(resp.status(400))
            return resp.send({ message: 'All fields are required' });
    }

    const mailOption = {
        from: process.env.EMAIL_USER,
        to: 'soumikdhar0584@gmail.com',
        subject: 'New message from contact',
        text: `Name : ${uname} \nEmail: ${uemail}\nMessage:${umessage}`,
    };

    transporter.sendMail(mailOption, (error, info) => {
        if (error) {
            console.log('Checking error', error, info);
            if(resp.status(500)){
                return resp.send({ error: 'Failed to send mail' });
            }
        }
        if(resp.status(200))
            return resp.send({ message: 'Email sent successfully' });
    });

});

app.listen(port, () => {
    console.log(`Server running at localhost : ${port}`);
});

require('dotenv').config()
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors')


const app = express()
const port=3001;



app.use(bodyParser.json());
app.use(cors())

//set up mail transporter

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587, // or 465 for SSL
    secure: false, // true for 465, false for other ports
    auth: {
        user:'soumikdhar0584@gmail.com',
        pass:'Science@123'
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


console.log('checking process env',process.env.EMAIL_USER )
app.post('/send',(req,resp)=>{
    const {uname,uemail,umessage} = req.body;
    console.log('insinde', uname,uemail,umessage)
    if(!uname || !uemail || !umessage){
        return resp.status(400).json({error:'All fields are required'});
    }

    const mailOption = {
        from:uemail,
        to:'soumikdhar0584@gmail.com',
        subject:'New message from contact',
        text:`Name : ${uname} \nEmail: ${uemail}\nMessage:${umessage}`,
    };

    transporter.sendMail(mailOption,(error,info)=>{
        if(error){
            console.log('checking error', error, info)
            return resp.status(500).json({error:'Failed to send mail'})
            
        }
        resp.status(200).json({message:'Email sent successfully'})
    });
});

app.listen(port,()=>{
    console.log(`Server running at localhost : ${port}`)
})
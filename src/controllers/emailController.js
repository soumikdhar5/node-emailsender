const transporter = require('../config/transporter');

const sendEmail = async (req, res) => {
    const { uname, uemail, umessage } = req.query;

    if (!uname || !uemail || !umessage) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'soumikdhar0584@gmail.com',
        subject: 'New message from contact',
        text: `Name: ${uname}\nEmail: ${uemail}\nMessage: ${umessage}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Failed to send mail', error);
        return res.status(500).json({ error: 'Failed to send mail' });
    }
};

module.exports = { sendEmail };

const express = require('express');
const { sendEmail } = require('../controllers/emailController');

const router = express.Router();

router.get('/send', sendEmail);

module.exports = router;

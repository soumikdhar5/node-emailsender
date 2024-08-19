const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const emailRoutes = require('./routes/emailRoutes');
require('dotenv').config()

const app = express();
const port = process.env.PORT||3001;

app.use(bodyParser.json());
app.use(cors());

app.use('/api', emailRoutes);  // Prefix all routes with /api


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

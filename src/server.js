const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const router = require('./routes/routes');

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit:'10mb', extended:true, parameterLimit:500000}))

app.use('/', router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('server running port port', port);
})
const express = require('express');
const router = express.Router();

const authRoute = require('./auth.routes');

authRoute(router);

module.exports = router;


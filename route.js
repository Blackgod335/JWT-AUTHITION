const express = require('express');
const route = express.Router();

route.use('/user',require('./router/user'));

module.exports = route;
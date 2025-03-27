const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const commonFunction = require('./common/common_function')

const port = process.env.PORT || 5555;
const mongodb = process.env.MONGO_URL;

mongoose.connect(mongodb)
.then(() => console.log('Database connected successfully'))
.catch(err => console.log('Database connection error:', err));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api',commonFunction.JwtVerification,require('./route'));

app.listen(port,(err)=>{
    if(err) console.log(err);
    console.log(`Server running successfully at http://localhost:${port}`)
})
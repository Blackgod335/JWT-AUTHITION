const express = require('express');
const route = express.Router();
const userController = require('../controller/user');

route.post('/register',(req,res)=>{
    userController.register(req).then((data)=>{
        res.status(200).send(data)
    }).catch(err => res.status(500).send({
        message: err.message
    }))
})

route.post('/login/:userId',(req,res)=>{
    userController.login(req).then((data)=>{
        res.status(200).send(data)
    }).catch(err => res.status(500).send({
        message: err.message
    }))
})

route.get('/get/:userId',(req,res)=>{
    userController.getsingleaddress(req).then((data)=>{
        res.status(200).send(data)
    }).catch(err=>res.status(500).send({
        message: err.message
    }))
})
module.exports = route
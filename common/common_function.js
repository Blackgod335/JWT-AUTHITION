const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.JwtVerification = function (req, res, next) {
    if (process.env.JWT_EXCEPTIONAL_URL.includes(req.path)) {
        next()
    } else {
        console.log("authorization = ",req.headers.authorization)
        jwt.verify(req.headers.authorization, process.env.AUTH_key, (err, result) => {
            if (err) {
                return res.status(401).send({
                    message: "Provide Authorization Token"
                })
            } else {
                console.log("result = ",result);
                
                req.authBody = result
                next()
            }
        })
    }
}
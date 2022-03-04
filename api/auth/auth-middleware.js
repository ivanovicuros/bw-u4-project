const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

const restricted = (req, res, next) => {
    const token = req.headers.authorization 
    if(!token){
        res.status(401).json({message: 'request denied, please login'})
    }else{
        jwt.verify(token, secret, (err, decoded) => {
            if(err){
                res.status(401).json({message: 'invalid token'})
            }else{
                req.decodedJwt = decoded
                next()
            }
        })
    }
}

module.exports = { restricted }
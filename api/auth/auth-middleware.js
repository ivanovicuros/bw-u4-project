const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const Users = require('./auth-model')

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

const checkUsernameExist = async  (req, res, next) => {
    const { username, password } = req.body
    if(!username || !password){
        res.status(401).json({message: 'username and password required'})
    } else {
        const [user] = await Users.findBy({username})
        if(user){
            res.status(401).json({message: 'username taken'})
        } else {
            next()
        }
    }
}

const checkLogin = async (req, res, next) => {
    const { username, password } = req.body
    if(!username || !password){
        res.status(401).json({message: 'username and password required'})
    } else {
        const [user] = await Users.findBy({username})
        if(!user){
            res.status(401).json({message: 'invalid credentials'})
        } else {
            next()
        }
    }
}

module.exports = { restricted, checkLogin, checkUsernameExist }
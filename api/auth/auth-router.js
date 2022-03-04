const router = require('express').Router()
const Users = require('./auth-model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const rounds = process.env.BCRYPT_ROUNDS


router.post('/register', (req, res, next) => {
   let user = req.body
   const hash = bcrypt.hashSync(user.password, parseInt(rounds))
   user.password = hash
   Users.add(user)
   .then(newlyCreated => {
       res.status(201).json(newlyCreated)
   }) 
   .catch(next)
})

router.post('/login', (req, res, next) => {
    let { username, password } = req.body
    Users.findBy({ username })
    .then(([user]) => {
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = tokenCreate(user)
            res.status(200).json({
                message: `welcome back ${user.username}`, token
            })
        }else{
            res.status(401).json({message: 'Invalid credentials'})
        }
    })
    .catch(next)
})

router.get('/users', (req, res, next) => { // created for peace of mind
    Users.findAll()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(next)
})

function tokenCreate(user){
    const payload = {
        subject: user.user_id,
        username: user.username,
    }
    const token = jwt.sign(payload, secret, {expiresIn: '1h'})
    return token
}



module.exports = router
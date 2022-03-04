
const router = require('express').Router()
const Users = require('./auth-model')
const bcrypt = require('bcrypt')


router.post('/register', (req, res, next) => {
   let user = req.body
   const hash = bcrypt.hashSync(user.password, 8)
   user.password = hash
   Users.add(user)
   .then(newlyCreated => {
       res.status(201).json(newlyCreated)
   }) 
   .catch(next)

})









router.post('/login', (req, res, next) => {
    next()
})

router.get('/users', (req, res, next) => { // created for peace of mind
    Users.findAll()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(next)
})

module.exports = router
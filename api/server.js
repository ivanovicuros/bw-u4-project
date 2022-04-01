const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const RecipesRouter = require('./recipes/recipes-router')
const AuthRouter = require('./auth/auth-router')
const { restricted } = require('../api/auth/auth-middleware')
const server = express()
const axios = require('axios')

server.use(express.json())
server.use(helmet())
server.use(cors())

const API_KEY = process.env.API_KEY

server.use('/api/auth', AuthRouter)
server.use('/api/recipes', restricted, RecipesRouter)

server.get('/weather', (req, res) => { // temporary endpoint for the purpose of small weather app
    const location = req.query.q   
    const options = {
        method: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/weather',
        params: {q: location, appid: API_KEY, units:'imperial'} 
    }
    axios.request(options)
    .then(resp => {
      res.json(resp.data)
    }).catch(err => {
        console.log(err)
    })
})



server.use('*', (req, res) => {
    res.send('<h1>hello</h1>')
})

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        message: err.message,
         stack: err.stack})
})

module.exports = server
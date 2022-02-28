const express = require('express')
const helmet = require('helmet')
const cors = require('cors')


const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.get('/api/hello', (req, res) => {
    res.json({message: 'working'})
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
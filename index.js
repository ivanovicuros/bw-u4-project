require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const server = express()

const PORT = process.env.PORT || 9000



server.use(express.json())
server.use(cors())
server.use(helmet())

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

server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`)
})
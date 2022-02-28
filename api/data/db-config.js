const knex = require('knex')
const configs = require('../../knexfile.js')

module.exports = knex(configs[process.env.NODE_ENV])
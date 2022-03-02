const db = require('../data/db-config')

function findAll() {
    return db('recipes as r')
    .select('recipe_id', 'title', 'r.source', 'category')
}


module.exports = { findAll }
const db = require('../data/db-config')

function findAll() {
    return db('users')
}

function findBy(filter) {
    return db('users').where(filter)
}

async function add(user){
   const [newUser]= await db('users').insert(user, ['user_id', 'username', 'password']) 
   return newUser
}

module.exports = { findAll, findBy, add }
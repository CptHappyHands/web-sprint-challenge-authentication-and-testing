const db = require("../../data/dbConfig")

function findBy(filter) {
    return db('users')
    .select('username', 'password')
    .where(filter)
}

module.exports = {
    findBy
}
const { development } = require("../../knexfile")
const knex = require("knex")

const connection = knex(development)

module.exports = connection

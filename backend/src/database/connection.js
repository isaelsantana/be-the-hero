const { development , test } = require("../../knexfile")
const knex = require("knex")

 const config  = process.env.NODE_ENV == 'test' ? test : development

const connection = knex(config)

module.exports = connection

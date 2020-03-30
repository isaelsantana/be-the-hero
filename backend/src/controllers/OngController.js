const connection = require("../database/connection")
const generateUniqueId = require('../utils/generateUniqueId');
const crypto = require("crypto")

module.exports = {
    async create(req, res) {
        const id = generateUniqueId()
        const { nome, email, whatsapp, city, uf } = req.body

        await connection("ongs").insert({
            id,
            nome,
            email,
            whatsapp,
            city,
            uf
        })

        res.json({
            id: id
        })
    },
    async index(req, res) {
        var ongs = await connection("ongs").select("*")
        res.json(ongs)
    }
}

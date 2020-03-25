const connection = require("../database/connection")
const crypto = require("crypto")

module.exports = {
    async create(req, res) {
        const id = crypto.randomBytes(4).toString("HEX")
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

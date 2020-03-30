const connection = require("../database/connection")
module.exports = {
    async create(req, res) {
        var { title, description, value } = req.body
        var ong_id = req.headers.authorization

        var [id] = await connection.table("incidents").insert({
            title,
            description,
            value,
            ong_id
        })

        res.json({
            id
        })
    },
    async index(req, res) {
        const { page = 1 } = req.query

        const [count] = await connection("incidents").count()
        const incidents = await connection("incidents")
            .join("ongs", "ongs.id", "=", "incidents.ong_id")
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                "incidents.*",
                "ongs.nome",
                "ongs.email",
                "ongs.whatsapp",
                "ongs.city",
                "ongs.uf"
            ])

        res.header("X-Total-Count", count["count(*)"])

        res.json(incidents)
    },
    async delete(req, res) {
        var ong_id = req.headers.authorization
        var { id } = req.params

        const incidents = await connection("incidents")
            .where("id", id)
            .select("ong_id")
            .first()

        if (incidents == null || incidents.ong_id != ong_id) {
            res.status(401).json({ error: "Operação negada" })
        }
        await connection("incidents")
            .where("id", id)
            .delete()

        res.status(204).send()
    }
}

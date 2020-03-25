const connection = require("../database/connection")

module.exports = {
    async index(req, res) {
        var ong_id = req.headers.authorization

        var incidents = await connection("incidents")
            .where("ong_id", ong_id)
            .select("*")

        res.json(incidents)
    }
}

const express = require("express")
const routes = require("./routes")
const cors = require("cors")
var app = express()

app.use(express.json())
app.use(routes)
app.use(cors())
const port = 3001

app.listen(port, () => {
    console.log(`rodando servidor porta ${port}`)
})

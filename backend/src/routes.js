const express = require("express")
const {celebrate ,Segments , Joi } = require('celebrate')
const OngController = require("./controllers/OngController")
const IncidentController = require("./controllers/IncidentController")
const ProfileController = require("./controllers/ProfileController")
const SessionController = require("./controllers/SessionController")
const router = express.Router()

router.post("/ongs", OngController.create)
router.get("/ongs",celebrate({
    [Segments.BODY] : Joi.object().keys({
        nome: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(11).max(12),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngController.index)
router.post("/incidents", IncidentController.create)
router.get("/incidents", IncidentController.index)
router.delete("/incidents/:id", celebrate({
    [Segments.PARAMS] : Joi.object().keys({
         id: Joi.number().required()
    })
}), IncidentController.delete)
router.get("/profile",celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), ProfileController.index)
router.post("/session", SessionController.create)
module.exports = router

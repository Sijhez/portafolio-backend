const express =require("express")
const router =express.Router()
const indexController = require("./../controllers/indexController")
//authorization to provide token decoding:
const authorization = require ('../middlewares/authorization')

//routes
router.get("/", indexController.home)
//register super user
router.post("/myRegister", indexController.createSuperUser)
//login super user
router.post('/myLogin', indexController.loginSuperUser)
//verifying token for permanence
router.get('/verifyToken', authorization, indexController.verifyToken)

//exports
module.exports = router
const express = require ("express")
const router = express.Router()
const worksController = require ('../controllers/worksController')

//routes:
//get works
router.get('/myWorks', worksController.getMyWorks)
//get one work
router.get('/myWorks/:idWork', worksController.getOneWork)


module.exports = router
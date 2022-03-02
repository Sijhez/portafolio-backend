const express =require("express")
const router =express.Router()
const profileController = require('../controllers/profileController')

router.get('/profile', profileController.getMyProfile)
//get my id profile:
router.get('/profile/:id', profileController.getMyIdProfile)
//edit my resume:
router.put('/profile/:id/edit', profileController.editMyProfile)

module.exports = router
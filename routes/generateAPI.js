const {createCRUD,deleteCRUD} = require('../controllers/generateAPI')
const {verifyToken} = require('../middleware/auth')
const express = require('express')

const router = express.Router()

router.post('/crud/createcrud',verifyToken,createCRUD)
router.delete('/crud/deletecrud',verifyToken,deleteCRUD)

module.exports = router
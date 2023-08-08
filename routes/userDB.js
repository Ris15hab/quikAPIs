const { getUserDB, getApiById } = require('../controllers/userDB')
const express = require('express')
const { verifyToken } = require('../middleware/auth')

const router = express.Router()

router.get('/userDB/getUserDB', verifyToken, getUserDB)
router.get('/userDB/getApiById', verifyToken, getApiById)

module.exports = router
const { getUserDB, getApiById,getUserDBCollection } = require('../controllers/userDB')
const express = require('express')
const { verifyToken } = require('../middleware/auth')

const router = express.Router()

router.get('/userDB/getUserDB', verifyToken, getUserDB)
router.get('/userDB/getApiById', verifyToken, getApiById)
router.get('/userDB/getUserDBCollection', verifyToken, getUserDBCollection)

module.exports = router
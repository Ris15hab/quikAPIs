const {getData} = require('../controllers/profilePage')
const {verifyToken} = require('../middleware/auth')
const express = require('express')
const router = express.Router();

router.get('/profilePage/getInfo',verifyToken,getData)

module.exports = router
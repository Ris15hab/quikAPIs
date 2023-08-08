const {register,login, verifyOtp} = require('../controllers/user')
const express = require('express')

const router = express.Router()

router.post('/user/register',register)
router.post('/user/login',login)
router.post('/user/verifyOtp',verifyOtp)

module.exports = router
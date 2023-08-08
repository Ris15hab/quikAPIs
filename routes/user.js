const {register,login, verifyOtp,resendOtp,getUserById} = require('../controllers/user')
const express = require('express')

const router = express.Router()

router.post('/user/register',register)
router.post('/user/login',login)
router.post('/user/verifyOtp',verifyOtp)
router.post('/user/resendOtp',resendOtp)
router.get('/user/getUserById',getUserById)

module.exports = router
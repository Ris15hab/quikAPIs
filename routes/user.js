const {register,login, verifyOtp,resendOtp,getUserById,contact} = require('../controllers/user')
const express = require('express')
const {verifyToken} = require('../middleware/auth')

const router = express.Router()

router.post('/user/register',register)
router.post('/user/login',login)
router.post('/user/verifyOtp',verifyOtp)
router.post('/user/resendOtp',resendOtp)
router.get('/user/getUserById',getUserById)
router.post('/user/contact',verifyToken,contact)

module.exports = router
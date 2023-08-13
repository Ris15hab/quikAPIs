const User = require('../models/user')
const Contact = require('../models/contact')
const Otp = require('../models/otp')
const bcrypt = require('bcrypt')
const { createError } = require('../middleware/error')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { SendMail } = require('../utils/Mail')
const { generateOTP } = require('../utils/generateOTP')

const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const emailCheck = await User.findOne({ email, isVerified: true })
        if (emailCheck) {
            if (emailCheck.isVerified) {
                return next(createError(400, 'Email Already Exists'))
            } else {
                await User.deleteOne({ email })
            }
        }
        const user = new User({
            username,
            email,
            password
        })
        await user.save();
        otpnumber = await generateOTP(user._id)
        const body = `<p>Dear ${username},<br>Thank you for signing up with our service! To ensure the security of your account and to complete the registration process, we require OTP verification.<br>Your One-Time Password (OTP) is: <span><b><u>${otpnumber}</u></b></span><br>Please enter this OTP on the verification page to confirm your account. </p>`

        SendMail(email, ' OTP Verification for Your Account', body)
        const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY)
        res.status(201).json({ message: "Otp sent!", token, id: user._id })
    } catch (err) {
        next(err)
    }
}

const verifyOtp = async (req, res, next) => {
    try {
        const { otpnumber, userID } = req.body;
        const otpData = await Otp.findOne({ userID })
        const userData = await User.findOne({ _id: userID })
        const isMatch = await bcrypt.compare(otpnumber, otpData.otp)
        if (isMatch) {
            userData.isVerified = true;
            await userData.save()
            const token = await jwt.sign({ userData }, process.env.SECRET_KEY)
            res.status(200).json({ message: "user registered successfully", user: userData, token })
        } else {
            // return next(createError(400, 'Invalid Otp'))
            res.status(400).json({ message: "Invalid Otp" })
        }
    } catch (err) {
        next(err)
    }
}

const resendOtp = async (req, res, next) => {
    try {
        const { _id } = req.body;
        const userData = await User.findOne({ _id })
        otpnumber = await generateOTP(userData._id)
        const body = `<p>Dear ${userData.username},<br>Thank you for signing up with our service! To ensure the security of your account and to complete the registration process, we require OTP verification.<br>Your One-Time Password (OTP) is: <span><b><u>${otpnumber}</u></b></span><br>Please enter this OTP on the verification page to confirm your account. </p>`

        SendMail(userData.email, ' OTP Verification for Your Account', body)

        res.status(200).json({ message: "Otp sent!", _id })
    } catch (err) {
        next(err)
    }
}

const getUserById = async (req, res, next) => {
    try {
        const { _id } = req.query;
        const userData = await User.findOne({ _id })
        res.status(200).json({ userData })
    } catch (err) {
        next(err)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email })
        if (userData.isVerified === false) {
            // return next(createError(400, 'Invalid Login Credentials'))
            res.status(400).json({ message: "Invalid Login Credentials" })
        }
        if (userData) {
            const isMatch = await bcrypt.compare(password, userData.password)
            if (isMatch) {
                const token = await jwt.sign({ userData }, process.env.SECRET_KEY)
                res.status(200).json({ user: userData, token })
            } else {
                // return next(createError(400, 'Invalid Login Credentials'))
                res.status(400).json({ message: "Invalid Login Credentials" })
            }
        } else {
            // return next(createError(400, 'Invalid Login Credentials'))
            res.status(400).json({ message: "Invalid Login Credentials" })
        }
    } catch (err) {
        next(err)
    }
}

const contact = async (req, res, next) => {
    const { email, subject, message } = req.body
    try {

        const contactData = new Contact({
            email,
            subject,
            message
        })
        const result = await contactData.save()
        res.status(201).json({ message: "Form data successfully added to db!" })
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    register,
    login,
    verifyOtp,
    resendOtp,
    getUserById,
    contact
}
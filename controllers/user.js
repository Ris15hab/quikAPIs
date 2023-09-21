const User = require('../models/user')
const Contact = require('../models/contact')
const Otp = require('../models/otp')
const bcrypt = require('bcrypt')
const { createError } = require('../middleware/error')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { SendMail } = require('../utils/Mail')
const { generateOTP } = require('../utils/generateOTP')
const apiHitCount = require('../models/apiHitCount')
const badges = require('../models/badges')

const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const emailCheck = await User.findOne({ email })
        if (emailCheck) {
            if (emailCheck.isVerified) {
                return next(createError(400, 'Email Already Exists'))
            } else {
                await User.findByIdAndDelete({ _id:emailCheck._id })
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

            //making apicountmodel
            // const currentDate = new Date();
            // const nextWeekDate = new Date(currentDate);
            // nextWeekDate.setDate(currentDate.getDate() + 6);       
            // const options = { year: 'numeric', month: 'short', day: 'numeric', weekday: 'short' };
            // const formattedCurrentDate = currentDate.toLocaleDateString('en-IN', options);
            // const formattedNextWeekDate = nextWeekDate.toLocaleDateString('en-IN', options);
            // console.log(formattedCurrentDate)
            // console.log(formattedNextWeekDate)
            const apiCountModel = new apiHitCount({
                userID: userData._id
            })
            await apiCountModel.save();

            //badges model
            const badgesModel = new badges({
                userID: userData._id
            })
            await badgesModel.save();

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
        const _id = req.user.userData._id
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
    const userID = req.user.userData._id;
    try {
        const contactData = new Contact({
            email,
            subject,
            message,
            userID
        })
        const result = await contactData.save()

        const body = `<p>I wanted to confirm that we've received your message through the "Contact Us" form on our website. Thank you for reaching out to us.<br><br>Our support team is now reviewing your inquiry, and we'll get back to you soon with a response. If you have any additional information to share, feel free to reply to this email.<br><br>We appreciate your interest in quikAPIs and your patience as we work on addressing your questions.<br><br>Best regards,<br>QuikAPIs Support</p>`

        SendMail(email, 'Your Inquiry Received - quikAPIs Support', body)

        const body2 = `<p>User Emails: ${email}<br><br>User Subject: ${subject}<br><br>User message: ${message}</p>`
        SendMail('quikapis@gmail.com', 'New Response Support Update', body2)

        res.status(201).json({ message: "Form data successfully added to db!" })
    }
    catch (err) {
        next(err)
    }
}

const forgotPassword = async (req, res, next) => {
    try {
        const userData = await User.findOne({ email: req.body.email })
        if (userData) {
            otpnumber = await generateOTP(userData._id)
            const body = `<p>Dear ${userData.username},<br><br>Your OTP for password reset is:  <span><b><u>${otpnumber}</u></b></span><br><br>Use this code to verify your email and proceed with the password reset process.<br><br>Best regards,<br>QuikAPIs Support</p>`

            SendMail(userData.email, 'Your OTP for Password Reset', body)
            const token = await jwt.sign({ userData }, process.env.SECRET_KEY)
            res.status(200).json({ message: "otp sent successfully!!", token })
        } else {
            res.status(400).json({ message: "no user with this email" })
        }
    } catch (err) {
        next(err)
    }
}

const forgotPasswordOtpVerify = async (req, res, next) => {
    try {
        const { otpnumber } = req.body
        const userID = req.user.userData._id
        const otpData = await Otp.findOne({ userID })
        const isMatch = await bcrypt.compare(otpnumber, otpData.otp)
        if (isMatch) {
            const token = await jwt.sign({ userData: req.user.userData, isOtpVerified: true }, process.env.SECRET_KEY)
            res.status(200).json({ message: "Otp verified, move on to reset password screen", token })
        } else {
            res.status(401).json({ message: "wrong otp entered" })
        }
    } catch (err) {
        next(err)
    }
}

const forgotPasswordChange = async (req, res, next) => {
    try {
        const isOtpVerified = req.user.isOtpVerified
        if(isOtpVerified){
            const userID = req.user.userData._id
            const userData = await User.findOne({ _id: userID })
            if (userData) {
                userData.password = req.body.password || userData.password;
                userData.save();
                res.status(200).json({ message: "password upadated successfully, move to sign in page" })
            } else {
                res.status(400).json({ message: "oops an error occured" })
            }
        }else{
            res.status(400).json({ message: "otp not verified" })
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    register,
    login,
    verifyOtp,
    resendOtp,
    getUserById,
    contact,
    forgotPassword,
    forgotPasswordOtpVerify,
    forgotPasswordChange
}
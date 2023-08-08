const nodemailer = require('nodemailer');
const { createError } = require('../middleware/error');
require('dotenv').config()

function getCurrentTime() {
    const currentTime = new Date();
    const hours = String(currentTime.getHours()).padStart(2, "0");
    const minutes = String(currentTime.getMinutes()).padStart(2, "0");
    const seconds = String(currentTime.getSeconds()).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
}

const SendMail = async (receiver, subject, body ) => {
    try {
        // console.log("sender");
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.Email,
                pass: process.env.Password,
            }
        })

        const formattedTime = getCurrentTime();
        //console.log(formattedTime); // Output will be in the format "hh:mm:ss"

        let info = await transporter.sendMail({
            from: `quikAPIs <${process.env.Email}>`, // sender address
            to: receiver, // list of receivers
            subject: `${subject} ${formattedTime}` , // Subject line
            html: body, // plain text body
        });

    } catch (error) {
        // return (createError(400, 'email not sent!'))
        throw new Error('email not sent!')
    }
}

module.exports = { SendMail }
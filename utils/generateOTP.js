const Otp = require('../models/otp')

const generateOTP = async(userID)=>{
    try{
        const otpnumber = Math.floor(Math.random() * 900000) + 100000
        const otpData = await Otp.findOne({userID})
        if(otpData){
            otpData.otp = otpnumber;
            await otpData.save()
        }else{
            const otp = new Otp({
                userID,
                otp:otpnumber
            })
            await otp.save()
        }

        return otpnumber
    }catch(err){
        next(err)
    }
}

module.exports = {
    generateOTP
}
const mongoose= require('mongoose')
const Contact=require('../models/contact')
const { createError } = require('../middleware/error')

const contactus=async(req,res,next)=>{
    const {email,subject,message}=req.body
    try{

        const userdata=new Contact({
            email,
            subject,
            message
        })
        const result= await userdata.save()
    }
    catch(err){
        next(err)
    }
}
module.exports={contactus}
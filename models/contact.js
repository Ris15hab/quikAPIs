const mongoose=require('mongoose')

const ContactSchema=mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    subject:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true
    }
})

const Contact= new mongoose.model('Contact',ContactSchema)

module.exports=Contact
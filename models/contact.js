const mongoose=require('mongoose');
const schema= new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            required:true
        }
    }
);
const Contact=mongoose.model('Contact',schema);
module.exports=Contact;

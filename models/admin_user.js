const mongoose=require("mongoose")
const  adminuser_schema= mongoose.Schema({
    username:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:false

    },
    role:{
        type:String,
        required:false,
        default:"admin"
    }
},{versionKey:false})



const  adminuser_model=mongoose.model('admin_users',adminuser_schema)

module.exports=adminuser_model
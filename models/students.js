const mongoose=require("mongoose")
const user_schema= mongoose.Schema({
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



const  student_model=mongoose.model('student',user_schema)

module.exports=student_model
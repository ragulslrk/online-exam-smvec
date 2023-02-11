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
        default:"student"
    },
    batch:{
        type:Number,
        required:false,
        default:0
    }

},{versionKey:false})



const  student_model=mongoose.model('student',user_schema)

module.exports=student_model
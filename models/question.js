const mongoose  =require('mongoose')
const questions_schema=mongoose.Schema({
    batch:{
        required:false,
        type:Number
    },
    quesAndans:[{

        questionNo:Number,
        question:String,
        optionA:String,
        optionB:String,
        optionC:String,
        optionD:String,
        key:{
            type:String,
            enum:["A","B","C","D"]
    }}]
},{versionKey:false})

const questions_model=mongoose.model("questions",questions_schema)
module.exports=questions_model
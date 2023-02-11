const mongoose  =require('mongoose')
const answer_schema=mongoose.Schema({
    username:{
        type:String,
        required:false
    },
    batch:{
        required:false,
        type:Number
    },
 answers:[{

        questionNo:Number,
        question:String,
        q_id:String,
        given_ans:String,
        given_key:{
            type:String,
            enum:["A","B","C","D"]
    },
        status:{
            type:String,
            enum:["answered",'unanswered'],

        },
        key:{
            type:String,
            enum:["A","B","C","D"]
    }
}],
total:{
    type:Number,
    default:0
}
},{versionKey:false})

const answer_model=mongoose.model("studentAns",answer_schema)
module.exports=answer_model
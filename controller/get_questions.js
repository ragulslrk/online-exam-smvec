const route=require("express").Router()
const  student=require('../models/students')
const question=require("../models/question")
//route to get  question based on  the  batch 
route.get('/getques/:username/:batch',(req,res)=>{
    if(req.params.username && req.params.batch)
    {

        student.findOne({username:req.params.username})
        .then((result)=>{
            if(result)
            {
                result.batch=parseInt(req.params.batch)
                question.findOne({batch:parseInt(req.params.batch)},{"batch":0,"quesAndans.key":0,"_id":0})
                .then((ques)=>{
                    result.save()
                    // console.log(ques)
                    res.send(ques)
                })
            }
            else{
                return res.sendStatus(401)

            }
        })
    }
    else{
        return res.sendStatus(401)

    }
})

module.exports=route
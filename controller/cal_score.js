const  route=require("express").Router()
const questions=require("../models/question")
const stu_ans=require('../models/studentAns')
//route to calculate the scores
route.post('/cal_score',(req,res)=>{
    if(req.body)
    {
        console.log(req.body.ans)
        var ans_arr=req.body.ans
        var total=0
        // res.json('recieved')
        questions.findOne({batch:parseInt(req.body.batch)},{quesAndans:1})
        .then(result=>{
            var ques_arr=result.quesAndans
            console.log(ques_arr.length,ans_arr.length);


            for(var i=0;i<ans_arr.length;i++)
            {   console.log('in for loop')
                for(var j=0;j<ques_arr.length;j++)
                {   
                    if(ans_arr[i].questionNo ===ques_arr[j].questionNo )
                    {
                        console.log('found',ques_arr[j])
                        if(ans_arr[i].given_key===ques_arr[j].key)
                        {
                            total=total+1
                            ans_arr[i]['key']=ques_arr[j].key
                        }
                        else{
                            ans_arr[i]['key']=ques_arr[j].key
                        }
                        break
                    }
                }
            }
            console.log(ans_arr,total)
            const new_stu_ans=new stu_ans({
                username:req.body.username,
                batch:req.body.batch,
                answers:ans_arr,
                total:total
            })
            new_stu_ans.save()
            res.json('calculated sucessfully')
            // res.redirect('/finish_exam')

        })

    }
    else{
        return res.sendStatus(401)
        
    }

})


route.get('/finish_exam',(req,res)=>{
    if(req.isAuthenticated()){  
        stu_ans.findOne({username:req.user.username})
        .then(result=>{
            res.render('success',{username:result.username,total:result.total})
        })
        
    }
    else{
        res.redirect('/login')
    }
})
module.exports=route
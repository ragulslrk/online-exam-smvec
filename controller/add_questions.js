const  route =require('express').Router()
const questions_model = require('../models/question')
const question=require('../models/question')
// route  to add question  pages

//batch1
route.get('/batch1',(req,res)=>{
    res.render('batch1')
})

//batch2
route.get('/batch2',(req,res)=>{
    res.render('batch2')
})

//batch3
route.get('/batch3',(req,res)=>{
    res.render('batch3')
})

//batch4
route.get('/batch4',(req,res)=>{
    res.render('batch4')
})


//batch5
route.get('/batch5',(req,res)=>{
    res.render('batch5')
})


//post  route to add question 
route.post('/add_question',(req,res)=>{
    if(req.body)
    {   console.log(req.body)
        //batch no,question,options,key
        question.findOne({batch:req.body.batch_no}).sort({"quesAndans.questionNo":"asc"})
        .then(result=>{
            console.log(result)
            
                const qno=result?result.quesAndans.length+1:1;
                // console.log(qno)
                if (qno===1)
                {
                    const new_question=new question({
                        batch:req.body.batch_no,
                        quesAndans:[
                            {questionNo:qno,
                            question:req.body.question,
                            optionA:req.body.optionA,
                            optionB:req.body.optionB,
                            optionC:req.body.optionC,
                            optionD:req.body.optionD,
                            key:req.body.key


                            }
                        ]
                    })
                    new_question.save()
                res.send('inserted succesfully1')


                }
                else{
                    question.updateOne({batch:req.body.batch_no},{
                        $push:{

                            quesAndans:
                                {questionNo:qno,
                                question:req.body.question,
                                optionA:req.body.optionA,
                                optionB:req.body.optionB,
                                optionC:req.body.optionC,
                                optionD:req.body.optionD,
                                key:req.body.key}
                            
                        }
                    })
                    .then(()=>{
                        res.json('inserted succesfully2')

                    })
                    .catch((err)=>{
                        console.log(err);
                    })

                }


            
        })

        .catch((err)=>{
            console.log(err);
        })

    }
    else{
        return res.sendStatus(401)
    }
})

module.exports=route

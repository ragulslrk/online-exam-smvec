const  route=require("express").Router()

const  jwt =require('jsonwebtoken')
const  admin_user = require('../models/admin_user')

//route  for login 
route.get("/admin_login",(req,res)=>{
    res.render('admin_login')
})


route.post('/admin_login',(req,res)=>{


    if(req.body.username && req.body.password)
    {   console.log(req.body);
        admin_user.findOne({username:req.body.username})
        .then(result=>{
            
            if(result != null){
             if(req.body.password === result.password)
                {
                        const token=jwt.sign({user_id:result._id},process.env.secret_token)
                        console.log(token);
                        return res.json({token:token,username:result.username,role:result.role})
                }
                else{
                      return res.sendStatus(401)
                }
            }   
            else{
             return res.sendStatus(401)
               

                
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    else{
        res.sendStatus(400)
    }
})

module.exports=route
const route =require('express').Router()
const  jwt =require('jsonwebtoken')
const  admin_user = require('../models/admin_user')

//route  to  admin  dashboard
route.get('/dashboard/:token',(req,res)=>{
    console.log(req.params.token)
    if(req.params.token)
    {
    jwt.verify(req.params.token,process.env.secret_token,(err,token)=>{
        if(err)
        {
            console.log('in  err ');
        res.redirect('/admin_login')

            
        }
        else{
        res.render('result')

        console.log(token);

        }

    })
       
    }
    else{
        res.redirect('/admin_login')
    }
    
})

module.exports=route
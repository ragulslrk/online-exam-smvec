const  route=require("express").Router()

route.get('/exam',(req,res)=>{
    if(req.isAuthenticated()){
        console.log('in  login');
        res.render('question',{user:req.user.username})
    }
    else{
        res.redirect('/login')
    }
    
})



module.exports=route
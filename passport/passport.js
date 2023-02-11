const bcrypt = require('bcryptjs');
const passport=require("passport")
const localstrategy=require("passport-local").Strategy
const student= require("../models/students")

module.exports=()=>{
    console.log("ur  in  passport.js ")
    passport.serializeUser((employ,done)=>{
        console.log("inside serialize",employ)
        done(null,employ.id)
    })
    passport.deserializeUser((id,done)=>{
        console.log("inside deserialize",id)
        student.findById(id,(err,employ)=>{
            done(err,employ)
        })
    })
    //passport stratergy
    passport.use("local-login",new localstrategy((username,password,done)=>
    {   
        console.log('got it ');
        
        student.findOne({"username":username},(err,employ)=>{
    
            if(err){return done(err)}
            if(!employ){ 
                console.log('this is in  passport file')
                return done(null,false,{message:"Incorrect Username "})}
                

                
            if(employ.password===password){
                return done(null,employ)
            }
            else{
                console.log(password);
                return done(null,false,{message:"Incorrect Password"})
            }
            // bcrypt.compare(password,employ.password,(err,res)=>{
            //     if(err){return done(err)}
            //     if(res==false){return  done(null,false,{message:"Incorrect Password"})}
            // return done(null,employ)
            // })
        })
    }))
}
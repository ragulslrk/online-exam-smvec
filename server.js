const  express=require('express')
const app= express()
const mongoose=require("mongoose")  
const bcrypt = require('bcryptjs');
const passport=require("passport")
const localstrategy=require("passport-local").Strategy
const  session=require("express-session")
const MongoStore=require("connect-mongo")
const  flash=require("connect-flash")
app.use(express.urlencoded({extended:true}));
app.use(express.json({limit:'1mb'}))
app.use(flash())
app.set("view engine","ejs")
app.use(express.static('views'))
app.use(express.static('assets'))
require("dotenv").config()
const cors = require('cors');
app.use(cors());
mongoose.set('strictQuery', false);
mongoose.connect( process.env.db,{useNewUrlParser: true,useUnifiedTopology: true})
    .then((res)=>{
        app.listen(process.env.PORT ||3232,()=>{
            console.log('this online exam project ')
    })
  
    console.log('success online exam project ')})
    .catch((err)=>{console.log(err)})

    app.get('/',(req,res)=>{
        res.render('login')
    })

    //route for login 
    const  admin_login=require('./controller/admin_login')
    app.use(admin_login)

    //route for login 
    const  admin_dashboard=require('./controller/admin_dashboard')
    app.use(admin_dashboard)


    //route to add questions
    const  add_question=require('./controller/add_questions')
    app.use(add_question)

const  route=require("express").Router()
const passport=require("passport")

route.get('/login',(req,res)=>{
    if(req.isAuthenticated())
    {
        res.redirect('/exam')
    }
    else{
        res.render('login', {message: req.flash('error')})
    }
})


//login post request 
route.post('/login', passport.authenticate('local-login', {
    successRedirect : '/exam',
    failureRedirect : '/login',
    failureFlash : true
}));


route.get('/logout', (req, res) => {
    if(req.isAuthenticated())
    {
        req.logout(function(err) {
            if (err) { return next(err); }
            req.session.destroy();
            res.json('logout');
          });
    }
    else{
        res.redirect('/');
    }
    })



module.exports=route
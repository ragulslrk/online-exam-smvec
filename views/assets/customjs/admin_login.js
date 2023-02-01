const admin_login=()=>{
    var  username=document.getElementById("username").value
    var  password=document.getElementById("password").value
    console.log(username,password)
    if(username && password)
    {
        fetch('http://localhost:3232/admin_login',{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
            // Adding body or contents to send
            body: JSON.stringify({
                username:username,
                password:password
        
            }),
            mode: 'cors'
            // Adding headers to the request
          
            })
            .then(res=>{
                console.log(res);
                if(res.ok && res)
                {
                    return res.json()
                }
                else{
                    var msg=document.getElementById('msg')
                
                    msg.innerHTML='<div class="alert alert-danger" id="succ_msg" role="alert">Incorrect Username or Password</div>'
                    return Promise.reject("My custom message")
                    
                   }
            
            })
            .then((data)=>{
                var msg=document.getElementById('msg')
                msg.innerHTML=``
              
              console.log(data)
              localStorage.setItem('token',data.token)
              localStorage.setItem('username',data.username)
              localStorage.setItem('role',data.role)


             window.location.replace(`/dashboard/${localStorage.getItem('token')}`)

            })
            .catch(err=>{
              console.log(err);
            })
            .catch(err=>{
              console.log(err);
            })

    }
    else{
        var msg=document.getElementById('msg')
        msg.innerHTML=`<div class="alert alert-danger" role="alert">
        Please enter the username and password
    </div>`
    }

}
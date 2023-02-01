
function get_key(){
    var radio=document.getElementsByName('option');
    for(var i=0;i<radio.length;i++)
    {
        if(radio[i].checked)
        {
            return  radio[i].value
        }
    }
}



const add_ques_b1=()=>{
   var question=document.getElementById('question').value
    var optionA=document.getElementById('optionA').value
    var optionB=document.getElementById('optionB').value
    var optionC=document.getElementById('optionC').value
    var optionD=document.getElementById('optionD').value
    var key=get_key()
    var  batch_no=1
    console.log(question,optionA,optionB,optionC,optionD,key)
    if(question && optionA&&optionB&&optionC&&optionD&&key)
    {
        
            var msg=document.getElementById('msg')
            msg.innerHTML=``
            fetch('http://localhost:3232/add_question',{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
            // Adding body or contents to send
            body: JSON.stringify({
                batch_no:batch_no,
                question:question,
                optionA:optionA,
                optionB:optionB,
                optionC:optionC,
                optionD:optionD,
                key:key
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
                
                    msg.innerHTML='<div class="alert alert-danger" id="succ_msg" role="alert">server Error</div>'
                    return Promise.reject("My custom message")
                    
                   }
            
            })
            .then((data)=>{
                var msg=document.getElementById('msg')
                msg.innerHTML=`<div class="alert alert-success" id="succ_msg" role="alert">Question Added Sucessfully</div>`
                document.getElementById('question').value=""
                document.getElementById('optionA').value=""
                document.getElementById('optionB').value=""
                document.getElementById('optionC').value=""
                document.getElementById('optionD').value=""  
              
              console.log(data)

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

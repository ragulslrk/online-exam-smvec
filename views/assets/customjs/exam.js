const set_info=(q_id)=>{
    
//get data for given question id 
var msg1=document.getElementById('msg1')
msg1.innerHTML=``
    var question_data=JSON.parse(localStorage.getItem('questions'))
    var ques=question_data.filter(q=>q._id===q_id)
    console.log(ques);
    if(ques.length==0)
    {
        var msg=document.getElementById('msg')
            
        msg.innerHTML='<div class="alert alert-danger" id="succ_msg" role="alert">Question Not Found</div>'
    }
    else{

        var msg=document.getElementById('msg')
            
        msg.innerHTML=''

        var ques_element=document.getElementById('question')
        ques_element.innerText=`${ques[0].questionNo}) ${ques[0].question} `

        var opA=document.getElementById('A')
        var opB=document.getElementById('B')
        var opC=document.getElementById('C')
        var opD=document.getElementById('D')
     
        
        opA.innerText=`${ques[0].optionA}`
        opB.innerText=`${ques[0].optionB}`
        opC.innerText=`${ques[0].optionC}`
        opD.innerText=`${ques[0].optionD}`  


        // render  the save button  
        var  save_button=document.getElementById('save')
        save_button.innerHTML=`<button class="btn1" style="margin-left: 40px; margin-top: 10px;" onclick="save_ans('${ques[0]._id}')" >Save</button>`
        
        // seetin the  prev and next  button  
        for(var i=0;i<question_data.length;i++)
        {  
            // console.log('in check',question_data.length);
            if(question_data[i]._id===q_id)
            {   
                if(question_data[i].questionNo===1)
                {
                    var button_cont=document.getElementById('button_cont')
                    button_cont.innerHTML=`
                    
                    <button class="btn1"  onclick="set_ques('${question_data[i+1]._id}')">Next</button>`

                }
                else if(question_data[i].questionNo==question_data.length)
                {
                    var button_cont=document.getElementById('button_cont')
                    button_cont.innerHTML=`
                    <button class="btn1" onclick="set_ques('${question_data[i-1]._id}')">Previous</button>
                    <button class="btn1"  onclick="send_ans()">Finish Exam</button>`

                }
                else{
                    var button_cont=document.getElementById('button_cont')
                    button_cont.innerHTML=`
                    <button class="btn1" onclick="set_ques('${question_data[i-1]._id}')">Previous</button>
                    <button class="btn1"  onclick="set_ques('${question_data[i+1]._id}')">Next</button>`
                }
            }
        }
        
        

    }

}




window.onload = () => {

    if(localStorage.getItem('questions')&&localStorage.getItem('q_id') )
    {
            console.log('ok')
            console.log(JSON.parse(localStorage.getItem('questions')),localStorage.getItem('q_id'));
            set_info(localStorage.getItem("q_id"))
            //displaying all 50  question  button
        var question_data=JSON.parse(localStorage.getItem('questions'))

        count=0
        var ques_container=document.getElementById('ques_container')
        var ques_num

        for(i=0;i<question_data.length;i++)
        {   
            // console.log(count,i)
            
            if(count==0)
            {
                ques_num=document.createElement('div')
                ques_num.classList.add('qn');
            }
            else if(count==4)
            {
                count=-1
                ques_container.appendChild(ques_num)
            }
            if(i==(question_data.length-1))
            {
                console.log('in last')
                ques_container.appendChild(ques_num)
            }
            var ques_ele=document.createElement('a')
            ques_ele.innerHTML=`<a href="#" onclick="set_ques('${question_data[i]._id}')"><span class="pagen">${i+1}</span></a>`
            ques_num.appendChild(ques_ele)
            count=count+1
        }
    }
    else{

        console.log('fetch')
        fetch(`http://localhost:3232/getques/${username}/${localStorage.getItem('batch')}`)
        .then(res=>{
            console.log(res);
            if(res.ok && res)
            {
                return res.json()
            }
            else{
                var msg=document.getElementById('msg')
            
                msg.innerHTML='<div class="alert alert-danger" id="succ_msg" role="alert">Un authorized</div>'
                return Promise.reject("My custom message")
                
               }
        
        })
        .then((data)=>{
            console.log(data.quesAndans.length)
            localStorage.setItem('q_id',data.quesAndans[0]._id)
            localStorage.setItem('questions',JSON.stringify(data.quesAndans))
            set_info(localStorage.getItem("q_id"))
            //displaying all 50  question  button
        var question_data=JSON.parse(localStorage.getItem('questions'))

        count=0
        var ques_container=document.getElementById('ques_container')
        var ques_num

        for(i=0;i<question_data.length;i++)
        {   
            // console.log(count,i)
            
            if(count==0)
            {
                ques_num=document.createElement('div')
                ques_num.classList.add('qn');
            }
            else if(count==4)
            {
                count=-1
                ques_container.appendChild(ques_num)
            }
            if(i==(question_data.length-1))
            {
                console.log('in last')
                ques_container.appendChild(ques_num)
            }
            var ques_ele=document.createElement('a')
            ques_ele.innerHTML=`<a href="#" onclick="set_ques('${question_data[i]._id}')"><span class="pagen">${i+1}</span></a>`
            ques_num.appendChild(ques_ele)
            count=count+1
        }
            


        })
        .catch(err=>{
          console.log(err);
        })
        .catch(err=>{
          console.log(err);
        })



    }
}


const  set_ques=(q_id)=>{
    console.log('in set_ques');
    localStorage.setItem('q_id',q_id)
    set_info(localStorage.getItem('q_id'))
}

const save_ans=(q_id)=>{
    console.log(q_id)
    var radio=document.getElementsByName('option');
    var ischecked=false
    var stu_option
    for(var i=0;i<radio.length;i++)
    {
        if(radio[i].checked)
        {   ischecked=true
            stu_option=radio[i].value
            console.log( radio[i].value)    
        }
    }
    if(!ischecked)
    {
        var msg1=document.getElementById('msg1')
        msg1.innerHTML=` <div class="alert success-alert"  style="background-color: #f7a7a3;">
        <h3 >Please select any option  to save</h3>
      </div>`
    }
    else{
        
        var msg1=document.getElementById('msg1')
        msg1.innerHTML=``


                // save the  value  to  local storage 
        if(localStorage.getItem("ans"))
        {
                  var ans_data=JSON.parse(localStorage.getItem('ans')) 
                  console.log(ans_data,ans_data.length)

                  var ans=ans_data.filter(a=>a.q_id===q_id)
                //   console.log(ans,ans.length)
                if(ans.length==1)
                {
                    var stu_ans=document.getElementById(stu_option).textContent
                    var new_ans_data=ans_data.map(function(element){
                                if(element.q_id===q_id){
                                    return{
                                        questionNo:element.questionNo,
                                        question:element.question,
                                        q_id:element.q_id,
                                        given_ans:stu_ans,
                                        given_key:stu_option,
                                        status:"answered"
                                    }
                                }
                                else{
                                    return element
                                }
                    })

                    localStorage.setItem('ans',JSON.stringify(new_ans_data))
                    console.log('in1');
                    var msg1=document.getElementById('msg1')
                    msg1.innerHTML=` <div class="alert success-alert"  style="background-color: #a8f0c6;">
                    <h3 >Successfully Submitted the Answer</h3>
                  </div>`
                }
                else if(ans.length==0){
                    var stu_ans=document.getElementById(stu_option).textContent

                    var question_data=JSON.parse(localStorage.getItem('questions'))
                    var ques=question_data.filter(q=>q._id===q_id)
                    var ques_no=ques[0].questionNo
                    var question=ques[0].question

                    var ans={
                        questionNo:ques_no,
                        question:question,
                        q_id:q_id,
                        given_ans:stu_ans,
                        given_key:stu_option,
                        status:"answered"
                    }
                    ans_data.push(ans)
                    localStorage.setItem('ans',JSON.stringify(ans_data))
                    console.log('in1');

                    var msg1=document.getElementById('msg1')
                    msg1.innerHTML=` <div class="alert success-alert"  style="background-color: #a8f0c6;">
                    <h3 >Successfully Submitted the Answer</h3>
                  </div>`
                }
        }
        else
        {
            console.log('not ok')
            var stu_ans=document.getElementById(stu_option).textContent
            //getting the  question_no and question
            var question_data=JSON.parse(localStorage.getItem('questions'))
            var ques=question_data.filter(q=>q._id===q_id)
            var ques_no=ques[0].questionNo
            var question=ques[0].question
            console.log(ques_no,question,stu_option,stu_ans)
            var ans=[{
                questionNo:ques_no,
                question:question,
                q_id:q_id,
                given_ans:stu_ans,
                given_key:stu_option,
                status:"answered"
            }]
            localStorage.setItem('ans',JSON.stringify(ans))
            var msg1=document.getElementById('msg1')
                    msg1.innerHTML=` <div class="alert success-alert"  style="background-color: #a8f0c6;">
                    <h3 >Successfully Submitted the Answer</h3>
                  </div>`
        }
    }


   
}



const send_ans=()=>{
if(localStorage.getItem('ans'))
{
console.log(' in send',username)

const  ans_all=JSON.parse(localStorage.getItem('ans')) 
fetch('http://localhost:3232/cal_score',{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
            // Adding body or contents to send
            body: JSON.stringify({
                username:username,
                batch:parseInt(localStorage.getItem('batch')),
                ans:ans_all

        
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
                    var msg=document.getElementById('msg1')
                
                    msg.innerHTML='<div class="alert alert-danger" id="succ_msg" role="alert">Incorrect Username or Password</div>'
                    return Promise.reject("My custom message")
                    
                   }
            
            })
            .then((data)=>{
                var msg=document.getElementById('msg')
                msg.innerHTML=``
              
              console.log(data)
              window.location.replace('/finish_exam')
              
             

            })
            .catch(err=>{
              console.log(err);
            })
            .catch(err=>{
              console.log(err);
            })



}
else{
    var msg1=document.getElementById('msg1')
    msg1.innerHTML=` <div class="alert success-alert"  style="background-color: #f7a7a3;">
    <h3 >Please answer atleast one question to finish the  Exam</h3>
  </div>`
}
}
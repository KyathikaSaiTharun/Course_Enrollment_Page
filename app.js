const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({external:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
  const fullName=req.body.fName;
  const rollNumber=req.body.rollNumber;
  const email=req.body.email;
  const courseName=req.body.cName;
  const courseCode=req.body.cCode;

  const data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:fullName,
          LNAME:rollNumber,
          PHONE:courseName

        }
      }
    ]


  };
  const jsonData=JSON.stringify(data);
  const url="https://us8.api.mailchimp.com/3.0/lists/cc68f69550";
  const options={
    method:"POST",
    auth:"tharun3:6506cbaea3688e32f208042a3342b7cb-us8"
  }

  const request= https.request(url,options,function(response){
    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();

});
app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
  console.log("server is running on port 3000");
});
//

//// IDEA:
//cc68f69550

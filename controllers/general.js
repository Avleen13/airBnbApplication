const express = require('express')
const router = express.Router();

const roomModel = require("../models/room");

router.use(express.static('public'));

router.get("/",(req,res)=>{
  console.log(process.env.TWILIO_TOKEN);
  res.render("general/home",{
      title: "Top Rated Places to Stay | Airbnb",
      headingInfo : "Home Page",
      room : roomModel.getallRooms()
  });
});



router.get("/dashboard",(req,res)=>{

res.render("dashboard",{
    title: "Dashboard Page",
    headingInfo : "Dashboard Page"

});


});
router.get("/user-registration",(req,res)=>{

  res.render("userRegistration",{
      title: "User Registration Page",
      headingInfo : "User Registration Page",

  });


});

router.get("/login", (req,res) => {

res.render("login", {
    title:"Log In Page",
   
});

});



router.post("/sendMessage",(req,res)=>{

  const errors= [];

if(req.body.where == "")
{
  errors.push("Sorry, you must enter a place");

}

if(req.body.checkin == "")
{
  errors.push("Sorry, you must enter checkin date")
}

if(req.body.checkout == "")
{
  errors.push("Sorry, you must enter checkout date")
}
if(req.body.guests == "")
{
  errors.push("Sorry, you must enter number of guests")
}

if(errors.length > 0)
{
  res.render("dashboard",{
    messages : errors
  })
}


});

router.post("/validation", (req,res)=>{

const errors=[];

if(req.body.uemail == ""){
    errors.push("Please enter your email address.");  
}

if(req.body.fname == ""){
    errors.push("Please enter your firstname.");
}
if(req.body.lname == ""){
  errors.push("Please enter your lastname.");
}
if(req.body.psw == ""){
  errors.push("Please enter your password.");
}
else if(req.body.psw.length < 9){
  errors.push("Password should be of atleast 8 characters");
}

if(errors.length > 0 )
{
res.render("userRegistration",{
    messages:errors
})
}
else {
  
  const accountSid = process.env.TWILIO_SID;
  const authToken = process.env.TWILIO_TOKEN;
  const client = require('twilio')(accountSid, authToken);
  const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
to: `${req.body.uemail}`,
from: 'test@example.com',
subject: 'Welcome to Airbnb',
text: 'Hope you are doing great. '
};
sgMail.send(msg)
.then(() => {
})
.catch((err)=>{
console.log(err);
})
  
  client.messages
    .create({
       body: `${req.body.fname} ${req.body.lname} Email :${req.body.uemail}`,
       from: '+14805088853',
       to: `${req.body.phone}`
     })
    .then(messages => {
      console.log(messages.sid);
      res.render("dashboard");
    })   
    .catch((err)=>{
      console.log(err);
    })
}
});


router.post("/validation-login", (req,res)=>{

const errors=[];

if(req.body.uname == ""){
    errors.push("Please enter your first name.");
    
}

if(req.body.psw == ""){
  errors.push("Please enter your password.");
}
else if(req.body.psw.length < 9){
  errors.push("Password should be of atleast 8 characters");
}
if(errors.length > 0 )
{
res.render("login",{
    messages:errors
})
}
else {
res.render("dashboard", {
title:"Room List Page",

});
}
});

module.exports=router;
const express = require('express')
const router = express.Router();


//home route
app.get("/",(req,res)=>{
    console.log(process.env.TWILIO_TOKEN);
    res.render("home",{
        title: "Top Rated Places to Stay | Airbnb",
        headingInfo : "Home Page",
        room : roomModel.getallRooms()
    });
});

app.get("/room-listing",(req,res)=>{

    res.render("roomListing",{
        title: "Room Listing",
        headingInfo : "Room Listing Page",
        room : roomModel.getallRooms()

    });


});

app.post("/validation", (req,res)=>{

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
  module.exports=router;
  
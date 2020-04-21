const express = require('express')
const router = express.Router();
const userModel = require("../models/user");
const roomModel = require("../models/room");
const adminRoomModel = require("../models/adminRoom");
const path = require("path");
const bcrypt = require("bcryptjs");
const session = require('express-session');
const isLoggedIn = require("../middleware/auth");
const DashboardLoader = require("../middleware/authorization")


router.use(express.static('public'));

router.get("/",(req,res)=>{
  res.render("general/home",{
      title: "Top Rated Places to Stay | Airbnb",
      headingInfo : "Home Page",
      room : roomModel.getallRooms()
  });
});



router.get("/dashboard",isLoggedIn,DashboardLoader,(req,res)=>{

res.render("dashboards/dashboard",{
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
  res.render("dashboards/dashboard",{
    messages : errors
  })
}


});

router.post("/validation", (req,res)=>{

const errors=[];

if(req.body.email == ""){
    errors.push("Please enter your email address.");  
}

if(req.body.firstname == ""){
    errors.push("Please enter your firstname.");
}
if(req.body.lastname == ""){
  errors.push("Please enter your lastname.");
}
if(req.body.password == ""){
  errors.push("Please enter your password.");
}
else if(req.body.password.length < 9){
  errors.push("Password should be of atleast 8 characters");
}

if(errors.length > 0 )
{
res.render("userRegistration",{
    messages:errors
})
}
else {
  
  const newUser = 
  {
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      email:req.body.email,
      phone:req.body.phone,
      password:req.body.password,
      pic:req.body.pic
  }

  const user = new userModel(newUser);
  user.save()
  .then(()=>{
      console.log("User Created");
      })
    
  .catch(err=>console.log(`Error while inserting into the data ${err}`));


//Email-SMS

  const accountSid = process.env.TWILIO_SID;
  const authToken = process.env.TWILIO_TOKEN;
  const client = require('twilio')(accountSid, authToken);
  const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
to: `${req.body.email}`,
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
       body: `${req.body.firstname} ${req.body.lastname} Email :${req.body.email}`,
       from: '+15672293048',
       to: `${req.body.phone}`
     })
    .then(messages => {
      //console.log(messages.sid);
      // res.render("dashboards/dashboard");
        res.render("../views/login",{
        name:`${req.body.firstname} ${req.body.lastname}`
        });
    })   
    .catch((err)=>{
      console.log(err);
    })
}
});


router.post("/validation-login", (req,res)=>{


  userModel.findOne({email:req.body.email})
  .then(user=>{
      const errors = [];

      if(user == null)
      {
          errors.push("Sorry , you have entered invalid credentials!");
          res.render("../views/login",
               {
                   messages : errors
               })
      }

      else
      {
          bcrypt.compare(req.body.password, user.password)
          .then(isMatched=>{

              if(isMatched)
              {
                  req.session.userInfo = user; 
                  res.redirect('/dashboard');
              }

              else
              {
                  errors.push("Sorry , you have entered invalid credentials!");
                  res.render("../views/login",
               {
                   messages : errors
               }) 
              }
          })
          .catch((err)=>console.log(err));
      }
  })
  .catch((err)=>console.log(err));


// const errors=[];

// if(req.body.email == ""){
//     errors.push("Please enter your email.");
    
// }

// if(req.body.password == ""){
//   errors.push("Please enter your password.");
// }
// else if(req.body.password.length < 9){
//   errors.push("Password should be of atleast 8 characters");
// }
// if(errors.length > 0 )
// {
// res.render("login",{
//     messages:errors
// })
// }
// else {
// res.render("dashboards/dashboard", {
// title:"Dashboard",

// });
// }
});

router.get("/room_pic/:id",(req,res)=>{

  adminRoomModel.findById(req.params.id)
  .then((user)=>{

      const {pic} = user;

      res.render("../views/dashboards/adminDashboard",{
      pic
      }
      )
  })

  .catch(err=>console.log(`Error displaying rooms from the database ${err}`));
});

router.get("/logout",(req,res)=>{

  req.session.destroy();
  res.redirect("/login")
})

module.exports=router;
const express = require('express')
const router = express.Router();

//load productModel 
const productModel = require("../models/room");

//show all products


app.get("/room-listing",(req,res)=>{

    res.render("roomListing",{
        title: "Room Listing",
        headingInfo : "Room Listing Page",
        room : roomModel.getallRooms()

    });


});

app.get("/dashboard",(req,res)=>{

  res.render("dashboard",{
      title: "Dashboard Page",
      headingInfo : "Dashboard Page"

  });


});
app.get("/user-registration",(req,res)=>{

    res.render("userRegistration",{
        title: "User Registration Page",
        headingInfo : "User Registration Page",

    });


});

app.get("/login", (req,res) => {

  res.render("login", {
      title:"Log In Page",
     
  });

});



app.post("/sendMessage",(req,res)=>{

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

module.exports=router;
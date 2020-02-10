const express = require("express");
const exphbs  = require('express-handlebars');
var bodyParser = require('body-parser')


const app = express();

//This allows express to make my static content avialable from the public
app.use(express.static('public'))

//This tells Express to set or register Handlebars as its' Template/View Engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get("/",(req,res)=>{

    res.render("home",{
        title: "Top Rated Places to Stay | Airbnb",
        headingInfo : "Home Page"
    })
});

app.get("/room-listing",(req,res)=>{

    res.render("roomListing",{
        title: "Room Listing",
        headingInfo : "Room Listing Page"

    });


});
app.get("/user-registration",(req,res)=>{

    res.render("userRegistration",{
        title: "User Registration",
        headingInfo : "User Registration Page",

    });


});

app.get("/login", (req,res) => {

  res.render("login", {
      title:"Log In",
     
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
    res.render("home",{
      messages : errors
    })
  }

});

app.post("/validation", (req,res)=>{

  const errors=[];

  if(req.body.uname == ""){
      errors.push("Please enter your first name.");
      
  }

  if(req.body.lst_name == ""){
      errors.push("Please enter your last name.");
  }
  if(req.body.psw == ""){
    errors.push("Please enter your password.");
  }
  if(errors.length > 0 )
  {
  res.render("userRegistration",{
      messages:errors
  })
}
});


const PORT=3000;
app.listen(3000,()=>{

    console.log(`Web server is up and running`)
})
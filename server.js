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
        headingInfo : "Home Page",
        randomContent: "BLAH BLAH BLHA"
    })
});

app.get("/room-listing",(req,res)=>{

    res.render("roomListing",{
        title: "Room Lsting",
        headingInfo : "Room Lsting Page",

    });


});
app.get("/user-registration",(req,res)=>{

    res.render("userRegistration",{
        title: "User Registration",
        headingInfo : "User Registration Page",

    });


});

app.get("/sendMessage",(req,res)=>{
  res.render("home",{
      title:"SMS Page"
  });
  
});




app.post("/sendMessage",(req,res)=>{

    const errors= [];

  if(req.body.where=="")
  {
    errors.push("Sorry, you must enter a phone number");

  }

  if(req.body.checkin=="")
  {
    errors.push("Sorry, youmust enter a  message")
  }

  if(req.body.checkout=="")
  {
    errors.push("Sorry, youmust enter a  message")
  }
  if(req.body.guests=="")
  {
    errors.push("Sorry, youmust enter a  message")
  }

  if(errors.length > 0)
  {
    res.render("home",{
      messages : errors
    })
  }

});


const PORT=3000;
app.listen(3000,()=>{

    console.log(`Web server is up and running`)
})
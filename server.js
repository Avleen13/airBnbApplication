const express = require("express");
const exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');


const app = express();

//This allows express to make my static content avialable from the public
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

//This tells Express to set or register Handlebars as its' Template/View Engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get("/",(req,res)=>{

    res.render("home",{
        title: "Top Rated Places to Stay | Airbnb",
        headingInfo : "Home Page"
    });
});

app.get("/room-listing",(req,res)=>{

    res.render("roomListing",{
        title: "Room Listing",
        headingInfo : "Room Listing Page"

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
    res.render("home",{
      messages : errors
    })
  }

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
  res.render("roomListing", {
  title:"Room List Page",
 
});
}
});


app.post("/validation-login", (req,res)=>{

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
  res.render("roomListing", {
  title:"Room List Page",
 
});
}
});



const PORT=process.env.PORT;
app.listen(PORT,()=>{

    console.log(`Web server is up and running`)
})
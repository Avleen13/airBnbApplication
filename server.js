const express = require("express");
const exphbs  = require('express-handlebars');


const app = express();

//This allows express to make my static content avialable from the public
app.use(express.static('public'))

//This tells Express to set or register Handlebars as its' Template/View Engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get("/",(req,res)=>{

    res.render("home",{
        title: "Home",
        headingInfo : "Home Page",
        randomContent: "BLAH BLAH BLHA"
    })
});

app.get("/room-listing",(req,res)=>{

    res.render("roomLsting",{
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


const PORT=3000;
app.listen(3000,()=>{

    console.log(`Web server is up and running`)
})
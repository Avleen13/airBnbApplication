const express = require("express");
const exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');


require('dotenv').config({path:"./config.env"});

const app = express();

//This tells Express to set or register Handlebars as its' Template/View Engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));

//This allows express to make my static content avialable from the public
app.use(express.static('public'));

 const generalController = require("./controllers/general");
 const roomController = require("./controllers/rooms");

// //map each controller to the app object

 app.use("/",generalController);
 app.use("/room",roomController);




const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{

    console.log(`Web server is up and running`)
})
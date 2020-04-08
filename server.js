const express = require("express");
const exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');


require('dotenv').config({path:"./config/key.env"});

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


 mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
 .then(()=>{
     console.log(`Connected to MongoDB Database`);
 })
 .catch(err=>console.log(`Error occured when connecting to database ${err}`));

const PORT=process.env.PORT;
app.listen(PORT,()=>{

    console.log(`Web server is up and running`)
})
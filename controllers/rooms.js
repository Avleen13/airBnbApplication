const express = require('express')
const router = express.Router();
const adminRoomModel = require("../models/adminRoom");

router.use(express.static('public'));

//load productModel 
const roomModel = require("../models/room");


//show all products

router.get("/room-listing",(req,res)=>{

  res.render("room/roomListing",{
      title: "Room Listing",
      headingInfo : "Room Listing Page",
      room : roomModel.getallRooms()

  });
});

//Route to direct use to Add Task form
router.get("/create-room",(req,res)=>
{
    res.render("room/createRoom");
});

//Route to process user's request and data when the user submits the add task form
router.post("/create-room",(req,res)=>
{
        const newRoom = {
            title : req.body.title,
            price :req.body.price,
            description : req.body.description,
            location: req.body.location,
            featuredroom:req.body.featuredroom
        }

     const room =  new adminModel(newRoom);
     task.save()
     .then(()=>{
         res.redirect("/room/dashboard")
     })
     .catch(err=>console.log(`Error happened when inserting in the database :${err}`));
});

module.exports=router;
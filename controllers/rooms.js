const express = require('express')
const router = express.Router();

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
module.exports=router;
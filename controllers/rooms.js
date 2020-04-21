const express = require('express')
const router = express.Router();
const path = require("path");
const adminRoomModel = require("../models/adminRoom");
const roomModel = require("../models/room");

router.use(express.static('public'));

//load productModel 



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
            featuredroom:req.body.featuredroom,
            pic:req.body.pic
        };

     const room =  new adminRoomModel(newRoom);
     room.save()
    .then((user)=>{

        req.files.pic.name = `pic_${user._id}${path.parse(req.files.pic.name).ext}`;
        req.files.pic.mv(`public/images/${req.files.pic.name}`)
        .then(()=>{

            adminRoomModel.updateOne({_id:user._id},
                {
                    pic:req.files.pic.name
                })
            
                .then(()=>{
                    res.redirect("/room/view-room");
                })
        })
     })
     .catch(err=>console.log(`Error happened when inserting in the database :${err}`));
});



router.get("/view-room",(req,res)=>
{
    adminRoomModel.find()
    .then((allDataRooms)=>{

        const room_data =  allDataRooms.map(allDataRoom=>{

                return {
                    id:allDataRoom._id,
                    title:allDataRoom.title,
                    price:allDataRoom.price,
                    location:allDataRoom.location,
                    description:allDataRoom.description,
                    featuredroom:allDataRoom.featuredroom,
                    pic:allDataRoom.pic
                }
        });

        res.render("room/viewRoom",{
            rooms: room_data
        });

    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));

});


router.get("/edit-rooms/:id",(req,res)=>{

    adminRoomModel.findById(req.params.id)
    .then((task)=>{

        const {_id,title,price,description,location,featuredroom} = task;
        res.render("room/updateRoom",{
            _id,
            title,
            price,
            description,
            location,
            featuredroom
        });

    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));


})



router.put("/updateRoom/:id",(req,res)=>{

    const task =
    {
            title : req.body.title,
            price :req.body.price,
            description : req.body.description,
            location: req.body.location,
            featuredroom:req.body.featuredroom

    }

    adminRoomModel.updateOne({_id:req.params.id},task)
    .then(()=>{
        res.redirect("/room/view-room");
    })
    .catch(err=>console.log(`Error happened when updating data from the database :${err}`));
});


router.delete("/delete/:id",(req,res)=>{
    
    adminRoomModel.deleteOne({_id:req.params.id})
    .then(()=>{
        res.redirect("/room/view-room");
    })
    .catch(err=>console.log(`Error happened when updating data from the database :${err}`));

});

router.get("/room_pic/:id",(req,res)=>{

    adminModel.findById(req.params.id)
    .then((user)=>{

        const {roomPic} = user;

        res.render("../views/dashboards/AdminDash",{
        roomPic
        }
        )
    })

    .catch(err=>console.log(`Error displaying rooms from the database ${err}`));
})


module.exports=router;
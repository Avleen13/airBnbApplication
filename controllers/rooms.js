const express = require('express')
const router = express.Router();

//load productModel 
const productModel = require("../models/room");

//show all products


router.get("/list",(req,res)=>{

    res.render("products/productList",{
        title:"Product Listing Page",
        products: productModel.getAllProducts()

    });
});

//show add product form
router.get("/add",(req,res)=>{

    res.render("products/productAdd",{
        title:"Product Add Form"
    });
});

//when user submits form
router.post("/add",(req,res)=>{

    //res.render();
});


module.exports=router;
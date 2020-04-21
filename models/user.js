const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({

    firstname:
    {
        type:String,
        required:true

    },

    lastname:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true,
    },
    password:
    {
        type:String,
        required:true
    },

    phone:
    {
        type:Number,
        required:true
    },

    type:
    {
        type:String,
        default:"User"
    },
    pic:
    {
        type:String
    }

});

userSchema.pre("save",function(next){

    bcrypt.genSalt(10)
    .then((salt)=>{
        bcrypt.hash(this.password,salt)
        
        .then((encryptedPassword)=>{
            this.password=encryptedPassword;
            next();
        })
    })
    .catch(error=>console.log(`Error occured while salting the password ${error}`));
})

const userModel = mongoose.model('User',userSchema);

module.exports = userModel;
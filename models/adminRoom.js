const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//This indicates the shape of the documents that will be entering the database
  const roomSchema = new Schema({
   
    title:
    {
      type:String,
      //required:true
    },

    price:
    {
        type:String,
        //required:true
    },

    description: 
    {
        type:String,
        //required:true
    },

    location:{
        type: String,
        //required:true
    },
    featuredroom:{
        type: String,
        //required:true
    },
    pic:{
        type:String,
        //required:true
    }
   
  });

  /*
    For every Schema you create(Create a schema per collection), you must also create a model object. 
    The model will allow you to perform CRUD operations on a given collection!!! 
  */

 const adminRoomModel = mongoose.model('Admin rooms', roomSchema);

 module.exports = adminRoomModel;
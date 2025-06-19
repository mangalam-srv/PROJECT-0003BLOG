const {Schema,model}= require('mongoose');
const { applyTimestamps } = require('./user');

const commentschema = new Schema({
    content:{
        type:String,
        required:true,
    },
    blogId :{
         type:Schema.Types.ObjectId,//built in funtion
        ref:"blog",

    },
    createdBy:{
        type:Schema.Types.ObjectId,//built in funtion
        ref:"user",

    },
},{timestamps : true});


 module.exports = model("comment", commentschema);
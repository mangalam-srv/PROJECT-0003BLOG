const {Schema,model} = require('mongoose');

const blogschema = new Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,

    },
    coverimage:{
        type:String,
        required:false,
    },
    createdBy:{
        type:Schema.Types.ObjectId,//built in funtion
        ref:"user",

    },
},{
        timestamps:true
    });

    module.exports = model("Blog", blogschema);
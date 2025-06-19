const mongoose = require('mongoose');
const {Schema,model} = mongoose;
const {
  createHmac,randomBytes
                       } = require('node:crypto');//this is required here for hashing and salting 
const { createtokenforuser } = require('../services/auth');

const userSchema = new Schema({
     fullname:{
        type : String,
        required : true,
     },
     email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
     },
     salt:{//A salt is a random string added to your password before hashing
        type : String,
        
     },
     password:{
        type : String,
        required : true,
     },
     profileimage:{
        type:String,
        default: '/uploads/OIP.jpg',

     },
     role:{
        type:String,
        enum:["USER","ADMIN"],//this is used as if we will use some other value instead of this then mongoose will throw error 
        default:"USER",
     },
},{
    timestamps:true
});

//Hashing is a one-way process that turns your password into a long, scrambled string (hash), using a cryptographic algorithm.
userSchema.pre("save",function(next){   // function that runs before a user document is saved to the MongoDB database
    const user = this;//it means jis user ki baat chal rahi hai wo user me agya
    if(!user.isModified("password"))return; //it means that if it is the last user only then don't rehash the password just return it

    const salt = randomBytes(16).toString();//generates random 16 bytes
    const hashedpassword = createHmac('sha256',salt)//Creates a hash function  Algorithm: sha256 (a secure hashing algorithm)  Key: salt (used to "mix up" the hash)
    .update(user.password)
    .digest("hex");     //Finalizes the hash and returns it as a hexadecimal string

    this.salt = salt;//put it back in the user 
    this.password = hashedpassword;//same 

    next();
 })




userSchema.static("matchpasswordandgeneratetoken",async function(email,password){
   const user = await this.findOne({email});
   if(!user) throw new Error('user not found');

   const salt= user.salt;
   const hashedpassword =user.password;

   const userprohash =  createHmac('sha256',salt)
   .update(password)
    .digest("hex");


    if(hashedpassword !== userprohash)throw new Error ('incorrect password');

    const token = createtokenforuser(user);


    return token;
})







    const user =model("user",userSchema);

    module.exports  = user;
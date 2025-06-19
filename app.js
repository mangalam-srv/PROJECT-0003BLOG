    require("dotenv").config();
    const express = require("express");//this is used so that we can make servers easily
    const app = express();//express() is a function call that creates an instance of an Express application.so that we can use app.get.post...
    const path = require("path");//this is used so that we can use path.resolve for defining the location of the views folder  
    const userroute=require("./routes/user");
    const blogroute=require("./routes/blog");
    const mongoose  = require("mongoose");
    const cookieparser = require("cookie-parser");

    const Blog= require("./models/blog")

    const { checkforauthcookie } = require("./middlewares/auth");


    const PORT =process.env.PORT || 8000;

    mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("mongoDB is connected successfully"))
    .catch(()=>{console.log("error")})


    //apply middleware first then route
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));//if we need to handle form data then we need to have it 
    app.use(cookieparser());
    app.use(checkforauthcookie("token"));

    app.use("/user",userroute);
    app.use("/blog",blogroute);

    app.use(express.static(path.resolve('./public')))//express does not allow us to directly render the image so we use this middleware


    app.set("view engine","ejs");//this is used to tell that our view engine is ejs ,so that we can render html from ejs file 
    app.set("views",path.resolve("./views"));//this is used to tell that our ejs files location
//we will use ejs for server sude rendering 






    app.get('/',async(req,res)=>{
        const allBlogs =  await Blog.find({});
        res.render("home",{
            user:req.user,
            blogs:allBlogs,
        });
    })


    app.listen(PORT,()=>{
        console.log(`server started on Port ${PORT}`);
    })
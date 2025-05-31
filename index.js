    const express = require("express");//this is used so that we can make servers easily
    const app = express();//express() is a function call that creates an instance of an Express application.so that we can use app.get.post...
    const path = require("path");//this is used so that we can use path.resolve for defining the location of the views folder  
    const userroute=require("./routes/user");
    const blogroute=require("./routes/blog");
    const mongoose  = require("mongoose");
    const cookieparser = require("cookie-parser");

    const { checkforauthcookie } = require("./middlewares/auth");


    const PORT =8000;

    mongoose.connect('mongodb://localhost:27017/blogify')
    .then(()=>console.log("mongoDB is connected successfully"))
    .catch(()=>{console.log("error")})


    //apply middleware first then route
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));//if we need to handle form data then we need to have it 
    app.use(cookieparser());
    app.use(checkforauthcookie("token"));

    app.use("/user",userroute);
    app.use("/blog",blogroute);



    app.set("view engine","ejs");//this is used to tell that our view engine is ejs ,so that we can render html form ejs file 
    app.set("views",path.resolve("./views"));//this is used to tell that our ejs files location







    app.get('/',(req,res)=>{
        res.render("home",{
            user:req.user,
        });
    })


    app.listen(PORT,()=>{
        console.log(`server started on Port ${PORT}`);
    })
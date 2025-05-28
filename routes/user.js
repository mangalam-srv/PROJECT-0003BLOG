const {Router} = require("express");
const user = require("../models/user");

const router = Router();

router.get("/signin",(req,res)=>{
    res.render("signin");
})

router.get("/signup",(req,res)=>{
    res.render("signup");
})

router.post("/signup",async(req,res)=>{
    const { fullname,email,password}=req.body;

    await user.create({
        fullname,
        email,
        password,
    });

    return res.redirect("/");

});

router.post("/signin",async(req,res)=>{
    const {email,password}= req.body;
    try {
        const token =await user.matchpasswordandgeneratetoken(email,password);

    console.log("token",token);

     return res.cookie("token",token).redirect("/");
        
    } catch (error) {
        return res.render('signin',{
            error:"incorrect email or password"
        })
        
    }
})


module.exports = router;

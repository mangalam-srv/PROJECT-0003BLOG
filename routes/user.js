const {Router} = require("express");
const user = require("../models/user");
const multer = require('multer');
const path = require('path');
const { createtokenforuser } = require('../services/auth');

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
     const filename = `${Date.now()}-${file.originalname}`;
     cb(null,filename)
    }
})

const upload = multer({ storage: storage })

router.get("/signin",(req,res)=>{
    res.render("signin");
})

router.get("/signup",(req,res)=>{
    res.render("signup");
})

router.post("/signup", upload.single('profileimage'), async(req,res)=>{
    const { fullname,email,password } = req.body || {};

    if (!fullname || !email || !password) {
        return res.status(400).render('signup', { error: 'Full name, email and password are required' });
    }

    const profileimage = req.file ? `/uploads/${req.file.filename}` : undefined;

    try {
        const createdUser = await user.create({
            fullname,
            email,
            password,
            ...(profileimage ? { profileimage } : {})
        });

        // Auto-login after signup by creating token and setting cookie
        const token = createtokenforuser(createdUser);
        return res.cookie('token', token).redirect('/');
    } catch (err) {
        return res.status(500).render('signup', { error: err.message || 'Could not create user' });
    }

});

router.post("/signin",async(req,res)=>{
    const {email,password} = req.body || {};
    if (!email || !password) {
        return res.status(400).render('signin', { error: 'Provide email and password' });
    }
    try {
        const token =await user.matchpasswordandgeneratetoken(email,password);

    // console.log("token",token);

     return res.cookie("token",token).redirect("/");
        
    } catch (error) {
        return res.render('signin',{
            error:"Incorrect email or password"
        })
        
    }
})

router.get("/logout",(req,res)=>{
    res.clearCookie("token");
    res.redirect("/");
})


module.exports = router;

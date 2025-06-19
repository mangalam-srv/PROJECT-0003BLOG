const {Router} = require("express");
const Blog = require("../models/blog"); // now Blog.create() works ✅
const comment = require("../models/comment"); 
const multer = require("multer");//this is used to manage the files we are getting from the frontend 
const router =  Router();
const path = require("path");


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

router.get("/add-new",(req,res)=>{
    return res.render('addblog',{
        user : req.user,
    })
})

router.get('/:id',async(req,res)=>{
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await comment.find({blogId:req.params.id}).populate(
    "createdBy"
  );
  console.log("comments",comments);
  return res.render('blog',{
    user : req.user,
    blog,
    comments,
  })
})


router.post('/comment/:blogId',async(req,res)=>{
  const Comment = await comment.create({
    content:req.body.content,
    blogId : req.params.blogId,
    createdBy: req.user._id,
  })
  return res.redirect(`/blog/${req.params.blogId}`);
})

router.post("/",upload.single('coverimage'), async (req,res)=>{

  const {title,body}= req.body;
    
    console.log(req.body);
    console.log(req.file);
    const blog = await Blog.create({
      body,
      title,
      createdBy:req.user._id,
      coverimage : `/uploads/${req.file.filename}`,
    })

    return res.redirect (`/blog/${blog._id}`);

    return res.redirect("/");
})


module.exports = router;

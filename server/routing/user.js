const router = require("express").Router()
const mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10,
    ObjectId = Schema.ObjectId;

const jwt = require("jsonwebtoken");
const User = require("../models/user")
mongoose.connect("mongodb://localhost:27017/blogApp", {useNewUrlParser: true})

const UserModel = mongoose.model("users",User)

const article = require("../models/article")
const articleModel = mongoose.model("article", article)


    router.post("/register", (req,res)=>{
        bcrypt.genSalt(10, function(err, salt) {
        
        
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                req.body.password = hash;
                UserModel(req.body).save(err => {
                    res.send(err)
                });
            });
            
        })
    })

    router.get("/articles/:username", async(req,res)=> {
        const result = await UserModel.findOne({username: req.params.username})
            .populate("articles", "title")
            .populate("articles", "date")
            .sort({date: 'descending'})
            .exec();
                res.send(result);
    
    })

    router.post("/update/:id", async(req,res)=>{ 
        const result = await UserModel.findByIdAndUpdate({_id: req.params.id}, req.body).exec()
        res.send(result)

    })

    router.get("/delete/:id",(req,res)=>{
        UserModel.findByIdAndRemove(
           {_id: req.params.id} ).exec();
      
       res.send("ok");  
   })

   router.post("/addArticle/:username",async(req,res)=>{

    const u = await UserModel.findOne({username:req.params.username}).exec();

    req.body.author= u._id;

     articleModel(req.body).save(function(err,article){
         console.log(article.id)
        var a = article;
        const result =  UserModel.findOneAndUpdate(
                    {username: req.params.username},
                    {
                        $push: {
                        articles: a.id
                    }
                }
                ).exec();
        
        res.send(a);
    })
  })

  //don't work
  router.get("/deleteArticle/:username/:articleId", async(req,res)=>{
    let index= req.params.index;
    const u = await UserModel.findOne({username:req.params.username}).exec();
    console.log(u)
    const result = await UserModel.findByIdAndUpdate({_id: u.id},
        { $pull : {
           "articles": req.params.articleId
        }
    })

    res.send(result)
  })

    
   module.exports = router;
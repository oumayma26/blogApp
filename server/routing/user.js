const router = require("express").Router()
const mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

const jwt = require("jsonwebtoken");
const User = require("../models/user")
mongoose.connect("mongodb://localhost:27017/blogApp")

const UserModel = mongoose.model("users",User)


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
   .exec();
    res.send(result);
   
    })

router.get("/all", (req,res)=> {
    res.send('ok')
})

module.exports = router;
const router = require("express").Router()
const mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

const jwt = require("jsonwebtoken");
const User = require("../models/user")
mongoose.connect("mongodb://localhost:27017/blogApp", {useNewUrlParser: true})

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
    .populate("articles", "date")
    .sort({date: 'descending'})
    .exec();
        res.send(result);
    
    })

    

module.exports = router;
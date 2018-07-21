
const router = require("express").Router();
const mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

const jwt = require("jsonwebtoken");

mongoose.connect("mongodb://localhost:27017/blogApp", {useNewUrlParser: true})

const User = require("../models/user")
const UserModel = mongoose.model("users", User)


router.post('/login', async (req, res) => {
    const result = await UserModel.findOne({
        username: req.body.username
    }).exec();
    if (result) {
          const res3 = bcrypt.compareSync( req.body.password,result.password);
                  if(res3==true){
                    const token = jwt.sign({data: result},  'oumayma')
                    res.send({message: "User found", token : token});
                  }else {
                    res.send({message: "User not found"});
                  }  
     }
});



module.exports = router;
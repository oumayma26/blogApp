const mongoose = require("mongoose")
const userSchema = require("./user")
var Schema = mongoose.Schema;

const User = require("../models/user")
const UserModel = mongoose.model("user", User)

const article = new mongoose.Schema({

    title: String,
    context: String,
    date : Number,
  
     author: {type : Schema.Types.ObjectId , ref : "user"}
})


module.exports = article;
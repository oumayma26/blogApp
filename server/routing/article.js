const router = require("express").Router()
const mongoose = require("mongoose")



const article = require("../models/article")
const articleModel = mongoose.model("article", article)

mongoose.connect("mongodb://localhost:27017/blogApp")



router.get("/sortByDate", async(req,res)=>{
    const result =await articleModel.find().sort({date: 'descending'}).exec()
    res.send(result)
});



router.post("/save", async(req,res)=> {
    const result = await articleModel(req.body).save().exec()
        res.send(result, async(req,res)=> {
    });
})

module.exports = router;
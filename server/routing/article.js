const router = require("express").Router()
const mongoose = require("mongoose")

const article = require("../models/article")
const articleModel = mongoose.model("article", article)

mongoose.connect("mongodb://localhost:27017/blogApp", {useNewUrlParser: true})



router.get("/sortByDate", async(req,res)=>{
    const result =await articleModel.find()
        .populate("Articles", "Title")
        .sort({date: 'descending'}).exec()
    res.send(result)
});



router.post("/save", async(req,res)=> {
    articleModel(req.body).save(err => {
    
        res.send(err)
    });
})

module.exports = router;
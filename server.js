const express = require("express")
const bodyparser = require("body-parser")
const app = express()

app.use(bodyparser.json())

const auth = require('./server/routing/auth')
app.use("/auth",auth)

const user = require('./server/routing/user')
app.use("/users",user);

const article = require('./server/routing/article')
app.use("/article",article);


app.listen(3000)
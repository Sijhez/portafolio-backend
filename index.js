//imports
const express = require('express')
const app = express()

//browser testing
const cors = require("cors")
require("dotenv").config()
const connectDB = require("./config/db")

// const sessionManager = require('./config/session')




// sessionManager(app)

//middlewares

//midleware for session current user
// app.use((req, res, next) => {
// 	res.locals.currentUser = req.session.currentUser
// 	next()
// })
connectDB()


 app.use(cors())

//response and request to JSON
 app.use(express.json())

//ruters
 app.use("/", require('./routes/user'))
 app.use("/myUser", require('./routes/myProfile'))
 app.use("/myUser", require('./routes/myWorks'))

app.listen(process.env.PORT,()=>{
    console.log(`Servidor conectado en http://localhost:${process.env.PORT}`)
})
// external Module
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.get("/",(req,res,next)=>{
    console.log(`req came in first middleware ${req.url}, ${req.method}`)
    res.sendFile(path.join(__dirname,'./','views','home.html') )
})

app.get("/contact-us",(req,res,next)=>{
    console.log(`req came in first middleware ${req.url}, ${req.method}`)
    res.sendFile(path.join(__dirname,'./','views','contactus.html') )
})

app.use(bodyParser.urlencoded())

app.post("/contact-us",(req,res,next)=>{
    console.log(`req came in first middleware ${req.url}, ${req.method}`, req.body)
    res.sendFile(path.join(__dirname,'./','views','thanks.html') )
})


app.use("/submit",(req,res,next)=>{
    console.log(`req came in first middleware ${req.url}, ${req.method}`)
})

app.use("/",(req,res,next)=>{
    res.sendFile(path.join(__dirname,'./','views','404.html') )
})



const PORT = 3001
app.listen(PORT, ()=>{
    console.log(console.log("listeing on port: ", PORT) )
})
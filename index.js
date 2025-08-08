// import express from "express"
require('dotenv').config()
const express = require('express')
const app = express()
// const port = 4000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/about', (req, res) => {
  res.send('Hello World! you are on about page')
})

app.get('/login', (req,res)=>{
    res.send("<h1>Hello this is login page and please login </h1>")
})

app.get('/youtube', (req,res)=>{
    res.send("<h2>go to my youtube channel</h2>")
})

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
 
 
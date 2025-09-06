require('dotenv').config({
    path: "./.env"
})
const app = require('./app.js')
const connectDB = require('./db/index.js')


// const express = require('express')
// const app = express()

// use try catch or then catch
// async await for database
// IIFE
// ; before

/*

const mongoose = require('mongoose')
const { DB_NAME } = require('./constants')

; (async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("connected to db")

    } catch (err) {
        console.error(err)
        throw err
    }
})()
*/

// connectionInstance.connection.host



connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
    console.log("listening from port: ",process.env.PORT )
})
})
.catch((err) => console.log("connection to db failed ", err))



// use app.use() when using middleware / configurations settings
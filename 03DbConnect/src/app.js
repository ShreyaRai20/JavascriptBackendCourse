const express =  require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

app.use(cookieParser())

//router
const userRouter = require('./routes/user.route.js')

app.use("/api/v1/users", userRouter)

module.exports = app

// check cors definitely!!!

// use app.use() when using middleware / configurations settings


// middleware =>

// 200 =>
// 400 => bad request
// 500 => internal server error
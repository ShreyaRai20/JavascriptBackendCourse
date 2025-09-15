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
const commentRouter = require('./routes/comment.route.js')
const videoRouter  = require('./routes/video.route.js')
const likeRouter = require('./routes/like.route.js')
const tweetRouter = require('./routes/tweet.route.js')
const subscriptionRouter = require('./routes/subscription.route.js')
const dashboardRouter = require('./routes/dashboard.route.js')

app.use("/api/v1/users", userRouter)


// app.use("/api/v1/comments", commentRouter)

app.use("/api/v1/videos", videoRouter)

app.use("/api/v1/likes", likeRouter)

app.use("/api/v1/comments", commentRouter)

app.use("/api/v1/tweets", tweetRouter)

app.use("/api/v1/subscriptions", subscriptionRouter)

app.use("/api/v1/dashboard", dashboardRouter)

module.exports = app

// check cors definitely!!!

// use app.use() when using middleware / configurations settings


// middleware =>

// 200 =>
// 400 => bad request
// 500 => internal server error
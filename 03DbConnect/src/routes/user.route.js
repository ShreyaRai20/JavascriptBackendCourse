const express = require ('express')
const {registerUser} = require('../controllers/user.controller.js')

const userRouter = express.Router()

userRouter.route("/register").post(registerUser)
// userRouter.route("/login").post(loginUser)

module.exports = userRouter
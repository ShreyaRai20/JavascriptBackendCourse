const express = require ('express')
const {registerUser, loginUser} = require('../controllers/user.controller.js')
const {upload} = require('../middleware/multer.middleware.js')
const { verifyJWT } = require('../middleware/auth.middleware.js')

const userRouter = express.Router()

userRouter.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1,
        }
    ]),
    registerUser
)

userRouter.route("/login").post(loginUser)

// secured routes =>

userRouter.route("/logout").post(verifyJWT, loginUser)

module.exports = userRouter
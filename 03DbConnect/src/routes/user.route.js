const express = require ('express')
const {registerUser} = require('../controllers/user.controller.js')
const {upload} = require('../middleware/multer.middleware.js')

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
// userRouter.route("/login").post(loginUser)

module.exports = userRouter
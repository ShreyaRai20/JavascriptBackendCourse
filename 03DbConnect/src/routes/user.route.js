const express = require ('express')
const {registerUser, loginUser, logoutUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails, updateAvatar, updateCoverImage, getUserChannelProfile, getWatchHistory} = require('../controllers/user.controller.js')
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

userRouter.route("/logout").post(verifyJWT, logoutUser)


userRouter.route("/refresh-token").post(refreshAccessToken)

userRouter.route("/change-password").post(changeCurrentPassword)

userRouter.route("/current-user").get(verifyJWT,getCurrentUser)

userRouter.route("/update-account").patch(verifyJWT,updateAccountDetails)

userRouter.route("/update-avatar").patch(verifyJWT, upload.single("avatar"),updateAvatar)

userRouter.route("/update-cover-image").patch(verifyJWT,upload.single("coverImage"), updateCoverImage)

userRouter.route("/c/:username").get(verifyJWT,getUserChannelProfile)

userRouter.route("/watch-history").get(verifyJWT,getWatchHistory)

module.exports = userRouter
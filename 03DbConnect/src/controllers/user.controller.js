const { asyncHandler } = require('../utils/asyncHandler.js') 
const ApiError = require('../utils/ApiError.js')
const { User } = require('../models/user.model.js')
const { uploadOnCloudinary}  = require('../utils/cloudinary.js')
const ApiResponse = require('../utils/ApiResponse.js')
const jwt = require("jsonwebtoken");
const { default: mongoose } = require('mongoose')


const generateAccessAndRefreshTokens = async (userId) => {
    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave:false })

        return {accessToken, refreshToken}

    } catch (err) {
        throw new ApiError(500, "")
    }
}

const registerUser = asyncHandler(
    async (req,res) => {
        /*
        - get user details from frontend
        - validation - check empty
        - check if user already exists: username, email
        - check for images, check for avatar
        - upload to cloudinary, avatar
        - create user object - create entry in db
        - remove passweord and refresh token field from response
        - check for user creation
        - return res
        */

        // get user details from frontend
        const {fullName, email, username, password} = req.body

        // validation - check empty

        if(
            [fullName, email, username, password].some(
                (field) => field?.trim() === ""
            )
        ){
            throw new ApiError(400,"All fields are required")
        }

        // check if user already exists: username, email
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        })

        if(existingUser){
            throw new ApiError(409, "User with email or username exists")
        }

        // check for images, check for avatar

        const avatarLocalPath = req.files?.avatar[0]?.path
        // const coverImageLocalPath = req.files?.coverImage[0]?.path

        let coverImageLocalPath

        if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
            coverImageLocalPath = req.files?.coverImage[0]?.path
        }

        if(!avatarLocalPath){
            throw new ApiError(400, "Avatar file is required!!")
        }

        // upload to cloudinary, avatar

        const avatar = await uploadOnCloudinary(avatarLocalPath)
        const coverImage = await uploadOnCloudinary(coverImageLocalPath)

        if(!avatar){
            throw new ApiError(400, "Avatar file is required!!")
        }

        // create user object - create entry in db

        const user = await User.create(
            {
                fullName,
                avatar: avatar.url,
                coverImage: coverImage?.url || "",
                email,
                password,
                username: username.toLowerCase()
            }
        )

        // checking if user created and remove passweord and refresh token field from response

        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )

        if(!createdUser){
            throw new ApiError(500, "user not created")
        }

        return res.status(200).json(
            new ApiResponse(
                statusCode=201,
                data=createdUser,
                message="Success")
        )


    }
)

const loginUser = asyncHandler(
    async (req,res) => {
        /* 
        - req body => data
        - username or email
        - find user
        - password check
        - access and refresh token
        - send tokens in cookies
        */

        // req body => data


        const { username, email, password } = req.body

        if( ! (username || email) ){
            throw new ApiError(400, "username or email required")
        }

        // find user

        const user = await User.findOne(
            {
                $or: [{username},{email}]
            }
        )

        if (!user){
            throw new ApiError(404, "user does not exist")   
        }

        // password check

        const isPasswordValid = await user.isPasswordCorrect(password)

        if(!isPasswordValid){
            throw new ApiError(404, "password invalid")
        }

        // access and refresh token

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

        const loggedInUser = await User.findById(user._id).select("-passwrod -refreshToken")

        const options = {
            httpOnly: true, // only changable by serve rnot frontend
            secure: true
        }

        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken", refreshToken, options)
        .json( new ApiResponse(
            200,
            {
                user: loggedInUser,
                accessToken:accessToken,
                refreshToken:refreshToken
            },
            "User loggedin successfully"
        ))
    }
)

const logoutUser = asyncHandler(
    async (req, res)=>{
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    refreshToken: 1
                }
            },
            {
                new: true
            }
        )

        const options = {
            httpOnly: true, // only changable by serve rnot frontend
            secure: true
        }

        return res
        .status(200)
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .json(
            new ApiResponse(
                200,
                {},
                "User logged out"
            ))
    }
)

const refreshAccessToken = asyncHandler(
    async (req,res) => {
        const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

        if(!incomingRefreshToken){
            throw new ApiError(401,"no refresh token provided")
        }

try {
            const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
            
            const user = await User.findById(decodedToken?._id)
        
            if (!user) {
                // discuss in frontend
                throw new ApiError(401, "invalid refresh token")
            }
    
            if(incomingRefreshToken !== user.refreshToken){
                throw new ApiError(400,"Refresh token is expired pr used")
            }
    
            const options = {
                httpOnly: true,
                secure: true
            }
    
            const {accessToken, newRefreshToken} = await generateAccessAndRefreshTokens(user._id)
    
            return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                        200,
                        {
                            accessToken: accessToken,
                            refreshToken: newRefreshToken
                        },
                        "Access token refreshed"
                )
            )
} catch (error) {
    throw new ApiError(400,"")
}
    }
)

const changeCurrentPassword = asyncHandler(
    async (req,res) => {
        const { oldPassword, newPassword } = req.body

        const user = await User.findById(req.user?._id)

        // console.log(user)

        const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
        console.log(isPasswordCorrect)

        if(!isPasswordCorrect){
            throw new ApiError(400,"Old password is incorrect")
        }

        user.password = newPassword
        // called the pre hook when saved
        await user.save({validateBeforeSave:false})

        return res
        .status(200)
        .json(
            new ApiResponse (
                200,
                {},
                "password updated"
            )
        )
        }
)

const getCurrentUser = asyncHandler(
    async(req,res) => {
        return res
        .status(200)
        .json(
            new ApiResponse(
                200, 
                req.user, 
                "current user fetched successfully"
            )
        )
    }
)

const updateAccountDetails = asyncHandler(
    async(req,res)=>{

        const {fullName, email} = req.body

        if(!fullName || !email){
            throw new ApiError(400, "All fields are required")
        }

        const user = await User.findByIdAndUpdate(
            req.user?._id,
            {
                $set: {
                    fullName: fullName,
                    email: email,
                }
            },
            { 
                new:true 
            } 
        ).select('-password')

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user,
                "account details updated successfully"
            )
        )

    }
)

const updateAvatar = asyncHandler(
    async (req,res) => {
        const avatarLocalPath = req.file?.path
        if(!avatarLocalPath){
            throw new ApiError(400, "avatar file is missing")
        }
        const avatar = await uploadOnCloudinary(avatarLocalPath)

        if(!avatar.url){
            throw new ApiError(400, "error while uploading file")
        }

        const user = await User.findByIdAndUpdate(
            req.user?._id,
            {
                $set: {
                    avatar:avatar.url
                }
            },
            {new:true}
        ). select("-password")

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user,
                "avatar image updated"
            )
        )

    }
)

const updateCoverImage = asyncHandler(
    async (req,res) => {
        // delete file from cloudinary
        const coverImageLocalPath = req.file?.path
        if(!coverImageLocalPath){
            throw new ApiError(400, "coverImage file is missing")
        }

        const coverImage = await uploadOnCloudinary(coverImageLocalPath)

        if(!coverImage.url){
            throw new ApiError(400, "error while uploading file")
        }

        const user = await User.findByIdAndUpdate(
            req.user?._id,
            {
                $set: {
                    coverImage:coverImage.url
                }
            },
            {new:true}
        ). select("-password")

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user,
                "coverImage image updated"
            )
        )

    }
)

const getUserChannelProfile = asyncHandler(
    async (req,res) => {
        const {username} = req.params

        if(!username?.trim()){
            throw new ApiError(400,"username is missing")
        }
        
        //returns array
        const channel = await User.aggregate([
            {
                $match: {
                    username: username?.toLowerCase()
                }
            },
            {
                $lookup: {
                    from: "subcriptions",
                    localField: "_id",
                    foreignField: "channel",
                    as: "subscribers"
                }
            },
            {
                $lookup: {
                    from: "subscriptions",
                    localField: "_id",
                    foreignField: "subscriber",
                    as: "subscribedTo"
                }
            },
            {
                $addFields: {
                    subscribersCount: {
                        $size: "$subscribers"
                    },
                    channelSubscribedToCount: {
                        $size: "$subscribedTo"
                    },
                    isSubscribed: {
                        $cond: {
                            if: {$in: [req.user?._id, "$subscribers.subscriber"]},
                            then: true,
                            else: false
                        }
                    }
                }
            },
            {
                $project: {
                    fullName: 1,
                    username: 1,
                    subscribersCount: 1,
                    channelSubscribedToCount: 1,
                    isSubscribed: 1,
                    avatar: 1,
                    coverImage: 1,
                    email: 1
                }
            }
        ])

        if(!channel?.length){
            throw new ApiError(404, "channel doesnot exists")
        }

        return res
        .status(200)
        .json(
            new ApiResponse (
                200,
                channel[0],
                "User channel fetched successfully"
            )
        )
    }
)

const getWatchHistory = asyncHandler(
    async (req, res) => {
        // req.user._id // string and mongoose convert it to mongodb id

        const user = await User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(req.user._id)
                }
            },
            {
                $lookup: {
                    from: "videos",
                    localField: "watchHistory",
                    foreignField: "_id",
                    as: "watchHistory",
                    pipeline: [
                        {
                            $lookup: {
                                from: "users",
                                localField: "owner",
                                foreignField: "_id",
                                as: "owner",
                                pipeline: [
                                    {
                                        $project: {
                                            fullName: 1,
                                            username: 1,
                                            avatar: 1
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            $addFields: {
                                owner: {
                                    $first: "$owner"
                                }
                            }
                        }
                    ]
                }
            }
        ]
        )

        return res
        .status(200)
        .json(
            new ApiResponse (
                200,
                user[0].watchHistory,
                "User watch history fetched successfully"
            )
        )

    }
)


module.exports = { 
    registerUser:  registerUser ,
    loginUser: loginUser,
    logoutUser:logoutUser,
    refreshAccessToken:refreshAccessToken,
    changeCurrentPassword:changeCurrentPassword,
    getCurrentUser:getCurrentUser,
    updateAccountDetails:updateAccountDetails,
    updateAvatar:updateAvatar,
    updateCoverImage:updateCoverImage,
    getUserChannelProfile:getUserChannelProfile,
    getWatchHistory:getWatchHistory
}
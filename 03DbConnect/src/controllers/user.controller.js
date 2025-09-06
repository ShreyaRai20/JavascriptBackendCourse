const asyncHandler = require('../utils/asyncHandler.js') 
const ApiError = require('../utils/ApiError.js')
const { User } = require('../models/user.model.js')
const { uploadOnCloudinary}  = require('../utils/cloudinary.js')
const ApiResponse = require('../utils/ApiResponse.js')

const registerUser = asyncHandler.asyncHandler(
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



module.exports = { registerUser:  registerUser }
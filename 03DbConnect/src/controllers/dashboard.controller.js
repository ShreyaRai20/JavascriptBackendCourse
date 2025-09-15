const  mongoose = require( "mongoose")
const {User} = require( "../models/user.model.js")
const {Video} = require( "../models/video.model.js")
const {Subscription} = require("../models/subscription.model.js")
const {Like} = require("../models/like.model.js")
const ApiError = require("../utils/ApiError.js")
const ApiResponse = require( "../utils/ApiResponse.js")
const {asyncHandler} = require("../utils/asyncHandler.js")

const getChannelStatus = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
})

const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel

    const userId = req.user._id

    const videos = await User.aggregate([
        {
            $match:{
                _id:userId
            }
        },
        {
            $lookup:{
                from:"videos",
                localField:"_id",
                foreignField:"owner",
                as:"videos"
            }
        },
        {
            $project: {
                videos:1
            }
        }
    ])
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            videos,
            "fetched all the videos of the channel"
        )
    )



})

module.exports =  {
    getChannelStatus, 
    getChannelVideos
    }
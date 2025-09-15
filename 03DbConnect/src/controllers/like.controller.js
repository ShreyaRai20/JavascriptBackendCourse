const mongoose  = require( "mongoose")
const {isValidObjectId} = require( "mongoose")
const {Like}= require("../models/like.model.js")
const {Comment}= require("../models/comment.model.js")
const {Tweet}= require("../models/tweet.model.js")
const {Video}= require("../models/video.model.js")
const ApiError = require( "../utils/ApiError.js")
const ApiResponse = require("../utils/ApiResponse.js")
const {asyncHandler} = require("../utils/asyncHandler.js")

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    const userId = req.user._id
    //TODO: toggle like on video

    
    const video = await Video.findOne({_id: videoId})


    if(!video) {
        throw new ApiError(404, "video not found")
    }

  
    const existingLike = await Like.findOne({video:videoId, likedBy: userId})
  

    if(existingLike){
        const deletedLike = await Like.findByIdAndDelete(existingLike._id);
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                deletedLike,
                message="like removed"
            )
        )
    } else {
        const newLike = await Like.create(
            {
                video: videoId,
                likedBy: userId
            }
        )
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                newLike,
                message="like removed"
            )
        )
    }
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    //TODO: toggle like on comment

    const userId = req.user._id
    
    const comment = await comment.findOne({ comment: commentId })

    if(!comment) {
        throw new ApiError(404, "comment not found")
    }

    const existingLike = await Like.findOne({comment:commentId, likedBy: userId})

    if(existingLike){
        const deletedLike = await Like.findByIdAndDelete(existingLike._id)
        return res
        .status(200)
        .json(
            ApiResponse(
                200,
                deletedLike,
                message="like removed"
            )
        )
    } else {
        const newLike = await Like.create(
            {
                comment: commentId,
                likedBy: userId
            }
        )
        return res
        .status(200)
        .json(
            ApiResponse(
                200,
                newLike,
                message="like removed"
            )
        )
    }

})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    //TODO: toggle like on tweet

    const userId = req.user._id
    
    const tweet = await Tweet.findOne(videoId)

    if(!tweet) {
        throw new ApiError(404, "tweet not found")
    }

    const existingLike = await Like.findOne({tweet:tweetId, likedBy: userId})

    if(existingLike){
        const deletedLike = await Like.findByIdAndDelete({
            tweetId: IdleDeadline,
            likedBy: userId
        })
        return res
        .status(200)
        .json(
            ApiResponse(
                200,
                deletedLike,
                message="like removed"
            )
        )
    } else {
        const newLike = await Like.create(
            {
                tweet:tweetId,
                likedBy: userId
            }
        )
        return res
        .status(200)
        .json(
            ApiResponse(
                200,
                newLike,
                message="like removed"
            )
        )
    }
}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
    const likedVideo =  await Like.aggregate([
        // {
        //     $lookup: 
        // }
    ])

})

module.exports = {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}
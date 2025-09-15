const mongoose = require( "mongoose")
const{ isValidObjectId } = require( "mongoose")
const {Tweet} = require( "../models/tweet.model.js")
const {User} = require( "../models/user.model.js")
const ApiError = require("../utils/ApiError.js")
const ApiResponse = require( "../utils/ApiResponse.js")
const {asyncHandler} = require("../utils/asyncHandler.js")

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet

    const { content } = req.body
    const userId = req.user._id

    const createdTweet = await Tweet.create({
        content:content,
        owner: userId
    })

    if(!createdTweet) {
        throw new ApiError(400, "tweet not created")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            createdTweet,
            "tweet added"
        )
    )

})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
    const userId = req.user._id

    const allTweets = await Tweet.find(
        {
            owner: userId
        }
    )

    if(!allTweets){
        throw new ApiError(404, "tweets not found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            allTweets,
            "fetched all the tweets"
        )
    )
})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet

    const { tweetId } = req.params
    const { content } = req.body

    console.log("tweets",tweetId, content)

    const updatedTweet = await Tweet.findByIdAndUpdate(
        tweetId,
        {
            content:content
        },
        { 
            new: true
        }
    )

    if(!updatedTweet){
        throw new ApiError(400, "tweet not updated")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            updatedTweet,
            "tweet updated"
        )
    )


})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
    const { tweetId } = req.params

    const deletedTweet = await Tweet.findByIdAndDelete(tweetId)

    if(!deletedTweet){
        throw new ApiError(404, "tweet not found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            deletedTweet,
            "tweet deleted"
        )
    )
})

module.exports = {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}
const mongoose = require( "mongoose")
const{ isValidObjectId } = require( "mongoose")
const {Tweet} = require( "../models/tweet.model.js")
const {User} = require( "../models/user.model.js")
const {ApiError} = require("../utils/ApiError.js")
const {ApiResponse} = require( "../utils/ApiResponse.js")
const {asyncHandler} = require("../utils/asyncHandler.js")

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
})

module.exports = {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}
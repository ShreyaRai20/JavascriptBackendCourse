const  mongoose = require( "mongoose")
const {Video} = require( "../models/video.model.js")
const {Subscription} = require("../models/subscription.model.js")
const {Like} = require("../models/like.model.js")
const {ApiError} = require("../utils/ApiError.js")
const {ApiResponse} = require( "../utils/ApiResponse.js")
const {asyncHandler} = require("../utils/asyncHandler.js")

const getChannelStatus = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
})

const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel
})

module.exports =  {
    getChannelStatus, 
    getChannelVideos
    }
const mongoose = require("mongoose")
const {isValidObjectId} = require("mongoose")
const {User} = require( "../models/user.model.js")
const { Subscription } = require( "../models/subscription.model.js" )
const ApiError = require( "../utils/ApiError.js")
const ApiResponse = require( "../utils/ApiResponse.js")
const{asyncHandler} = require( "../utils/asyncHandler.js")
const { subscribe } = require("../routes/subscription.route.js")


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    const userId = req.user._id
    // TODO: toggle subscription

    const isSubscribed = await Subscription.findOne(
        {
            channel: channelId,
            subscriber: userId
        }
    )

    if(!isSubscribed){
       const createdSubscription = await Subscription.create(
        {
            channel: channelId,
            subscriber: userId
        } 
    )

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            createdSubscription,
            "created subscription"
        )
    )
    }

    const removedSubscription = await Subscription.findByIdAndDelete(isSubscribed._id )


    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            removedSubscription,
            "subscription removed"
        )
    )
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params


    // const subscribers = await Subscription.find({
    //     channel:channelId
    // })

    const subscribers = await Subscription.aggregate([
        {
            $match:{
                channel:new mongoose.Types.ObjectId(channelId)
            }
        },
        {
            $lookup:{
                from:"users",
                localField:"subscriber",
                foreignField: "_id",
                as: "subscriber",
                pipeline:[
                    {
                        $project:{
                            username:1,
                            fullName:1,
                            avatar:1
                        }
                    },
                ]
            },
        },
            {
            $addFields: {
                subscriber: {
                    $first: "$subscriber"
                }
            }
        }
    ])

    console.log(subscribers)

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            subscribers,
            "fetched all subcribers of the channel"
        )
    )


})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const {subscriberId } = req.params

    const channels = await Subscription.aggregate([
        {
            $match:{
                subscriber: new mongoose.Types.ObjectId(subscriberId)
            }
        },
        {
            $lookup:{
                from:"users",
                localField:"channel",
                foreignField: "_id",
                as: "channel",
                pipeline: [
                    {
                        $project:{
                            username:1,
                            fullName:1,
                            avatar:1
                        }
                    }
                ]
            }
        
    },
    ])

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            channels,
            "fetched all channels to which the user has subscribed"
        )
    )
})

module.exports =  {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}
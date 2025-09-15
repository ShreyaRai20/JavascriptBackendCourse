const mongoose = require("mongoose")
const  { Comment } = require("../models/comment.model.js")
const  ApiError = require("../utils/ApiError.js")
const ApiResponse = require("../utils/ApiResponse.js")
const  {asyncHandler} = require("../utils/asyncHandler.js")

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query


   const allComments = await Comment.find({
        video: videoId
    })

    return res
    .status(200)
    .json (
        new ApiResponse (
            200,
            allComments,
            "fetched all comments"
        )
    )
    
})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video

    const {videoId} = req.params
    const {content} = req.body
    const userId = req.user._id

    const addedComment = await Comment.create({
        content:content,
        video:videoId,
        owner: userId
    })
    

    if(!addComment){
        throw new ApiError(400, "comment not added")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            addedComment,
            "comment added"
        )
    )
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const {commentId} = req.params
    const {content} = req.body

    const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        {
            $set: {
                content: content
            }
        },
        {
            new: true
        }       
    )

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            updatedComment,
            "comment updated"
        )
    )

})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment

    const {commentId} = req.params

    const deletedComment = await Comment.findByIdAndDelete(commentId)

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            deletedComment,
            "comment deleted"
        )
    )
})

module.exports =  {
    getVideoComments:getVideoComments, 
    addComment:addComment, 
    updateComment:updateComment,
    deleteComment:deleteComment
    }

const mongoose = require("mongoose")
const {isValidObjectId} = require("mongoose")
const {Video} = require( "../models/video.model.js")
const {User} = require( "../models/user.model.js")
const ApiError = require("../utils/ApiError.js")
const ApiResponse = require("../utils/ApiResponse.js")
const {asyncHandler} = require("../utils/asyncHandler.js")
const {uploadOnCloudinary, deleteOnCloudinary} = require("../utils/cloudinary.js")
const { response } = require("express")


// const getAllVideos = asyncHandler(
//     async (req, res) => {
//     let { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query

//     console.log(page," ", limit, " ", query," ",  sortBy," ",  sortType, " ", userId )

//     //TODO: get all videos based on query, sort, pagination

// })

const getAllVideos = asyncHandler(async (req, res) => {
    let { page = 1, limit = 10, query, sortBy = "createdAt", sortType = "desc", userId } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    // Build filter object
    const filter = {};
    if (query) {
        // Example: search by video title (case-insensitive)
        filter.title = { $regex: query, $options: "i" };
    }
    if (userId) {
        filter.user = userId; // Assuming video has a 'user' field
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortType === "asc" ? 1 : -1;

    // Fetch videos with pagination
    const videos = await Video.find(filter)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit);

    // Total count for pagination
    const totalVideos = await Video.countDocuments(filter);

    res.status(200).json({
        page,
        limit,
        totalVideos,
        totalPages: Math.ceil(totalVideos / limit),
        videos
    });
});


const publishAVideo = asyncHandler(
    async (req, res) => {
    const { title, description} = req.body

    const thumbnailLocalPath = req.files?.thumbnail[0].path
    const videoFileLocalPath = req.files?.videoFile[0].path

    // upload in cloudinary

    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)
    const videoFile = await uploadOnCloudinary(videoFileLocalPath)

    if(!thumbnail){
            throw new ApiError(400, "error while uploading thumbnail file")
        }

    if(!videoFile){
            throw new ApiError(400, "error while uploading video file")
        }

    const video = await Video.create(
        {
            title:title,
            description:description,
            thumbnail:thumbnail.url,
            videoFile:videoFile.url,
            duration:videoFile.duration,
            owner:req.user._id
        }
    )

    return res.status(200).json(
            new ApiResponse(
                statusCode=201,
                data=video,
                message="videoUploaded"
            )
        )


    // TODO: get video, upload to cloudinary, create video
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
    const video = await Video.findById(videoId)

    return res
    .status(200)
    .json(
        new ApiResponse (
            200,
            video,
            "fetched video by id successfully"
        )
    )

})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail

    const thumbnailLocalPath = req.file?.path

    if(!thumbnailLocalPath ){
            throw new ApiError(400, "thumnail file is missing")
        }

    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

    if(!thumbnail.url){
            throw new ApiError(400, "error while uploading file")
        }

    const video = await Video.findByIdAndUpdate(
        videoId,
        {
            $set: {
                thumbnail:thumbnail.url
            }
        },
        {new:true}
    )

    return res
    .status(200)
    .json(
        new ApiResponse (
            200,
            video,
            "thumbnail uploaded by id successfully"
        )
    )
})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    //TODO: delete video

    try {
        const deletedvideoFileFromCloud = await deleteOnCloudinary(video.videoFile)
        const deletedthumbnailFromCloud = await deleteOnCloudinary(video.thumbnail)
        const deletedVideo = await Video.findByIdAndDelete(videoId)
    
        return res
        .status(200)
        .json(
            new ApiResponse (
                200,
                {
                    deletedVideo,
                    deletedvideoFileFromCloud,
                    deletedthumbnailFromCloud
                },
                "fetched video by id successfully"
            )
        )
    } catch (error) {
        throw new ApiError(400, "error while deleting video")
    }
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    const video = await  Video.findById(
        videoId
    
    )

    video.isPublished = !video.isPublished
    await video.save()

    return res
    .status(200)
    .json(
        new ApiResponse (
            200,
            {
                video
            },
            "toggled"
        )
    )

    
})

module.exports =  {
    getAllVideos:getAllVideos,
    publishAVideo:publishAVideo,
    getVideoById:getVideoById,
    updateVideo:updateVideo,
    deleteVideo:deleteVideo,
    togglePublishStatus:togglePublishStatus
}
const { Router } = require('express');
const  {
    deleteVideo,
    getAllVideos,
    getVideoById,
    publishAVideo,
    togglePublishStatus,
    updateVideo,
} = require("../controllers/video.controller.js")
const {verifyJWT} = require("../middlewares/auth.middleware.js")
const  {upload} = require("../middlewares/multer.middleware.js")

const videoRouter = Router();

videoRouter.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

// upload file
videoRouter
    .route("/")
    .get(getAllVideos)
    .post(
        upload.fields([
            {
                name: "videoFile",
                maxCount: 1,
            },
            {
                name: "thumbnail",
                maxCount: 1,
            },
            
        ]),
        publishAVideo
    );

videoRouter
    .route("/:videoId")
    .get(getVideoById)
    .delete(deleteVideo)
    .patch(upload.single("thumbnail"), updateVideo);

videoRouter.route("/toggle/publish/:videoId").patch(togglePublishStatus);

module.exports =  videoRouter
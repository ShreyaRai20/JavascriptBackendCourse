const { Router } = require('express');
const  {
    addComment,
    deleteComment,
    getVideoComments,
    updateComment,
} = require("../controllers/comment.controller.js")
const {verifyJWT} = require("../middlewares/auth.middleware.js")

const commentRouter = Router();

commentRouter.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

commentRouter
.route("/:videoId")
.get(getVideoComments)
.post(addComment);


commentRouter
.route("/c/:commentId")
.delete(deleteComment)
.patch(updateComment);

module.exports = commentRouter 
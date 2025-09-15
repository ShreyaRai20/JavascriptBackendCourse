const { Router } = require('express')
const {
    getChannelStats,
    getChannelVideos,
} = require( "../controllers/dashboard.controller.js")
const {verifyJWT} = require("../middlewares/auth.middleware.js")

const dashboardRouter = Router();

dashboardRouter.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

// dashboardRouter.route("/stats")
// .get(getChannelStats);

dashboardRouter.route("/videos")
.get(getChannelVideos);

module.exports = dashboardRouter

const { Router }  = require( 'express')
const  {
    getSubscribedChannels,
    getUserChannelSubscribers,
    toggleSubscription,
}  = require("../controllers/subscription.controller.js")
const  {verifyJWT}  = require( "../middlewares/auth.middleware.js")

const subscriptionRouter = Router();
subscriptionRouter.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

subscriptionRouter
    .route("/c/:channelId")
    .get(getSubscribedChannels)
    .post(toggleSubscription);

subscriptionRouter.route("/u/:subscriberId")
.get(getUserChannelSubscribers);

module.exports = subscriptionRouter
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
    .post(toggleSubscription)
    .get(getUserChannelSubscribers);

subscriptionRouter.route("/u/:subscriberId")
.get(getSubscribedChannels)

module.exports = subscriptionRouter
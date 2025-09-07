const  { Router }  = require('express')
const  {
    createTweet,
    deleteTweet,
    getUserTweets,
    updateTweet,
}  = require("../controllers/tweet.controller.js")
const {verifyJWT} = require("../middlewares/auth.middleware.js")

const tweetRouter = Router();
tweetRouter.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

tweetRouter.route("/").post(createTweet);
tweetRouter.route("/user/:userId").get(getUserTweets);
tweetRouter.route("/:tweetId").patch(updateTweet).delete(deleteTweet);

module.exports = tweetRouter
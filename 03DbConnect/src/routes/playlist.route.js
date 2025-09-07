const { Router }  = require( 'express')
const  {
    addVideoToPlaylist,
    createPlaylist,
    deletePlaylist,
    getPlaylistById,
    getUserPlaylists,
    removeVideoFromPlaylist,
    updatePlaylist,
}  = require("../controllers/playlist.controller.js")
const {verifyJWT}  = require("../middlewares/auth.middleware.js")

const playlistRouter = Router();

playlistRouter.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

playlistRouter.route("/").post(createPlaylist)

playlistRouter
    .route("/:playlistId")
    .get(getPlaylistById)
    .patch(updatePlaylist)
    .delete(deletePlaylist);

playlistRouter.route("/add/:videoId/:playlistId").patch(addVideoToPlaylist);
playlistRouter.route("/remove/:videoId/:playlistId").patch(removeVideoFromPlaylist);

playlistRouter.route("/user/:userId").get(getUserPlaylists);

module.exports =  playlistRouter
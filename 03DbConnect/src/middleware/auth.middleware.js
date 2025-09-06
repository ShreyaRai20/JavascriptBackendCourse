const { User } = require('../models/user.model.js')
const ApiError = require('../utils/ApiError')
const { asyncHandler } = require('../utils/asyncHandler.js') 


const verifyJWT = asyncHandler(
    async(req,res,next) => {
        try {
            const token = req.cookie?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
            if (!token) {
                throw new ApiError(401, "Unauthorized request")
            }
    
            const decodedToken = jwt.verify(tokem, process.env.accessToken)
    
            const user = await User.findById(decodedToken?._id).select("-password --refreshToken")
    
            if (!user) {
                // discuss in frontend
                throw new ApiError(401, "invalid access token")
            }
    
            req.user = user;
            next()
        } catch (error) {
            throw new ApiError(401, "invalid!!!")
        }
})

module.exports = { verifyJWT }
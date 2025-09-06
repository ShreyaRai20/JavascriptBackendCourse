const { v2: cloudinary } = require('cloudinary')
const fs = require('fs') // to read file

// link and unlinked read learn!!!

cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });


const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null

        //file upload
        const res = await cloudinary.uploader.upload(localFilePath, {
             resource_type: "auto"
        })

        // console.log("file is uploaded on cloudinary", res.url)

        fs.unlinkSync(localFilePath)
        return res

    } catch (err){
        fs.unlinkSync(localFilePath) // remove the locally saved temperory file as the upload got failed
        return null
    }
}


module.exports = {uploadOnCloudinary}


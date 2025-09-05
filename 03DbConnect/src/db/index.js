const mongoose = require('mongoose')
const { DB_NAME } = require('../constants')
// import { DB_NAME }  from '../constants.js'


async function connectDB(){
        try {
            const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
            console.log("connected to db",connectionInstance.connection.host )
    
        } catch (err) {
            console.error(err)
            throw err
        }
        
}


module.exports = connectDB
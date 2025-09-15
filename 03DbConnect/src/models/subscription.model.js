const mongoose = require('mongoose')

const subscriptionSchema = mongoose.Schema(
    {
        channel: { // channel to which subscriber is subscribing
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
        subscriber: { // one who is subscribing subscriber
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
    },
    {
        timestamps: true
    }
)

const Subscription = mongoose.model("Subscription", subscriptionSchema)

module.exports = { Subscription }
const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        required: true,
        min: 1,
    },
    recipient: {
        type: String,
        required: true,
    },
}, {timestamps: true})

module.exports = mongoose.model("Message", MessageSchema)
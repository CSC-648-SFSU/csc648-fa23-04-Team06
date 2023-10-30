const mongoose = require("mongoose")

const FriendSchema = new mongoose.Schema({
    user1: {
        type: String,
        required: true,
    },
    user2: {
        type: String,
        required: true,
    },
},)

module.exports = mongoose.model("Friend", FriendSchema)
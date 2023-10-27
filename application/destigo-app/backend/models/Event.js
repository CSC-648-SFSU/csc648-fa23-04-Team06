const mongoose = require("mongoose")

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 5,
    },
    desc: {
        type: String,
        required: true,
        min: 20,
    },
    photo: {
        type: String,
        required: true,
    },
}, {timestamps: true})

module.exports = mongoose.model("Event", EventSchema)
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "user",
        default: null,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("project", ProjectSchema)

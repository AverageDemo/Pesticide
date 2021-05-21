const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
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

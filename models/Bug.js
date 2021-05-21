const mongoose = require("mongoose")
const Schema = mongoose.Schema

const BugSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
    },
    tag: {
        type: String,
        required: false,
    },
    severity: {
        type: String,
        default: "Low",
        required: false,
    },
    description: {
        type: String,
        required: true,
    },
    reproduction: {
        type: String,
        required: false,
    },
    stackTrace: {
        type: String,
        required: false,
    },
    isResolved: {
        type: Boolean,
        default: false,
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "projects",
        default: null,
        required: true,
    },
    dateUpdated: {
        type: Date,
        default: Date.now,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("bug", BugSchema)

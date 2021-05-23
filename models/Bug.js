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
    severity: {
        type: String,
        default: "Low",
        required: false,
        // Low / Moderate / High / Critical
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
    status: {
        type: Number,
        default: 0,
        // 0 - Inactive / 1 - Active / 2 - Review / 3 - Resolved
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "projects",
        default: null,
        required: true,
    },
    comments: [
        {
            comment: {
                type: String,
                required: true,
            },
            author: {
                type: Schema.Types.ObjectId,
                ref: "user",
                default: "60a99f1fda7a3c043c387445", // Only supplied while authentication is not implemented - will remove this later
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
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

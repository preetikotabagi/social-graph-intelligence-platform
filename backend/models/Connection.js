const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema({

    sourceUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    targetUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Connection", connectionSchema);
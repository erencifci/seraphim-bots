const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MuteSchema = new Schema(
    {
        userID: {
            type: String,
            required: true,
            unique: true,
        },
        reason: {
            type: String,
        },
        expireAt: Date,
    },
    { timestamps: true }
);

const Mute = mongoose.model("Mute", MuteSchema);

module.exports = Mute;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JailSchema = new Schema(
    {
        userID: {
            type: String,
            required: true,
            unique: true,
        },
        oldRoles: {
            type: Array,
            default: [],
        },
        reason: {
            type: String,
        },
        expireAt: Date,
    },
    { timestamps: true }
);

const Jail = mongoose.model("Jail", JailSchema);

module.exports = Jail;

// dependencies/imports
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schemas
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: [true, "Username is already taken"],
    },
    name: String,
    email: String,
    password: String,
    profile_photo: {
        type: Schema.Types.ObjectId,
        ref: "Image"
    },
    favorite_gyms: [{
        type: Schema.Types.ObjectId,
        ref: "Gym"
    }],
    favorite_routes: [{
        type: Schema.Types.ObjectId,
        ref: "Route"
    }],
    created_routes: [{
        type: Schema.Types.ObjectId,
        ref: "Route"
    }],
    created_gyms: [{
        type: Schema.Types.ObjectId,
        ref: "Gym"
    }],
    ticks: [{
        type: Schema.Types.ObjectId,
        ref: "Tick"
    }],
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
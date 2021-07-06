const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true,
});

// export model
const User = mongoose.model("User", userSchema);

module.exports = User;
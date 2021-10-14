// dependencies/imports
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schemas
const imageSchema = new Schema({
    desc: String,
    src: String,
    alt: String,
    height: String,
    width: String,
    created_by: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    gym: {
        type: Schema.Types.ObjectId,
        ref: "Gym"
    },
    route: [{
        type: Schema.Types.ObjectId,
        ref: "Route"
    }]
}, {
    timestamps: true,
});

const Image = mongoose.model("Image", imageSchema);
module.exports = Image;
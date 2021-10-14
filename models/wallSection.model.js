// dependencies/imports
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schemas
const wallSectionSchema = new Schema({
    name: String,
    tags: [String],
    routes: [{
        type: Schema.Types.ObjectId,
        ref: "Route"
    }]
}, {
    timestamps: true,
});

const WallSection = mongoose.model("WallSection", wallSectionSchema);
module.exports = WallSection;
// dependencies/imports
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schemas
const userTickSchema = new Schema({
    comment: String,
    attempt: Boolean,
    tags: [String],
    quality_rating: {
        type: Number,
        min: 1,
        max: 5
    },
    difficulty_grade: {
        type: Number,
        min: 1,
        max: 30
    },
    gym: {
        type: Schema.Types.ObjectId,
        ref: "Gym"
    },
    route: [{
        type: Schema.Types.ObjectId,
        ref: "Route"
    }],
    created_by: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
},
    { timestamps: true }
);

const Tick = mongoose.model("Tick", tickSchema);
module.exports = Tick;
// dependencies/imports
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schemas
const routeSchema = new Schema({
    name: String,
    boulder_route: Boolean,
    top_rope: Boolean,
    auto_belay: Boolean,
    lead_climb: Boolean,
    hold_color: String,
    tags: [String],
    setter_grade: {
        type: Number,
        min: 1,
        max: 30
    },
    wall_section: {
        type: Schema.Types.ObjectId,
        ref: "WallSection"
    },
    setter: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    gym: {
        type: Schema.Types.ObjectId,
        ref: "Gym"
    },
    profile_image: {
        type: Schema.Types.ObjectId,
        ref: "Image"
    },
},
    { timestamps: true }
);

const Route = mongoose.model("Route", routeSchema);
module.exports = Route;
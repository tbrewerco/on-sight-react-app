//////
// dependencies/imports
//////
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//////
// tick schema (userTick)
//////
const userTickSchema = new Schema({
    comment: String,
    quality_rating: { type: Number, min: 1, max: 5 },
    difficulty_grade: { type: Number, min: 1, max: 30 },
    route: [{
        type: Schema.Types.ObjectId,
        ref: "Route"
    }],
    createdBy: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
},
    { timestamps: true }
);

//////
// route schema
//////
const routeSchema = new Schema({
    name: String,
    route_type: String,
    gym_area: String,
    hold_color: String,
    image: String,
    setter_name: String,
    setter_grade: { type: Number, min: 1, max: 30 },
    consensus_grade: { type: Number, min: 1, max: 30 },
    consensus_rating: { type: Number, min: 1, max: 5 },
    user_ticks: [userTickSchema],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
},
    { timestamps: true }
);

const Route = mongoose.model("Route", routeSchema);
module.exports = Route;
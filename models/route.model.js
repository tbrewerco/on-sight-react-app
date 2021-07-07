// dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserTick = require("./userTick.model");

const userTickSchema = new Schema({
    comment: String,
    quality_rating: {type: Number, min: 1, max: 5},
    difficulty_grade: {type: Number, min: 1, max: 30}, // YDS???
    route: [{
        type: Schema.Types.ObjectId,
        ref: "Route"
    }],
    createdBy: [{ 
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
},
    { timestamps: true }
);

// schema
const routeSchema = new Schema({
    name: String,
    route_type: String,
    gym_area: String,
    hold_color: String,
    setter_name: String,
    setter_grade: {type: Number, min: 1, max: 5},
    consensus_grade: {type: Number, min: 1, max: 30}, // Needs to be converted to YDS (1 = 5.4, 30 = 5.15D)
    consensus_rating: {type: Number, min: 1, max: 5},
    user_ticks: [userTickSchema],
    createdBy: { 
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
},
    { timestamps: true }
);

// export model
const Route = mongoose.model("Route", routeSchema);

module.exports = Route;

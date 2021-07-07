// dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserTick = require("./userTick.model");

// schema
const routeSchema = new Schema({
    name: String,
    route_type: String,
    gym_area: String,
    consensus_rating: {type: Number, min: 1, max: 5},
    consensus_grade: {type: Number, min: 1, max: 30}, // Needs to be converted to YDS (1 = 5.4, 30 = 5.15D)
    user_ticks: [{
        type: Schema.Types.ObjectId,
        ref: "UserTick"
    }],
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

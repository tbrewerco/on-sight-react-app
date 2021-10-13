//////
// dependencies/imports
//////
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const routeSchema = require("../models/route.model")

const locationSchema = new Schema({
    type: String,
    coordinates: [Number]
})

const addressSchema = new Schema({
    streetAddress: String,
    city: String,
    state: String,
    zip: Number
})

const gymSchema = new Schema({
    name: String,
    address: [addressSchema],
    location: [locationSchema],
    distanceFromUser: String,
    images: [String],
    climbing_routes: [routeSchema],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
},
    { timestamps: true }
);

const Gym = mongoose.model("Gym", gymSchema);
module.exports = Gym;
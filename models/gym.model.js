// dependencies/imports
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schemas
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
    address: addressSchema,
    location: locationSchema,
    boulders_available: Boolean,
    sport_routes_available: Boolean,
    auto_belays_available: Boolean,
    created_by: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
},
    { timestamps: true }
);

const Gym = mongoose.model("Gym", gymSchema);
module.exports = Gym;
// dependencies/imports
// const router = require("express").Router();
const Gym = require("../models/gym.model");
const router = require("express").Router();
const _ = require("lodash");
const faker = require("faker");

module.exports = {
    name: 'The Phoenix @ West Pines',
    address: {
        streetAddress: '3400 Lutheran Parkway',
        city: 'Wheat Ridge',
        state: 'CO',
        zip: "80033"
    },
    location: {
        type: 'Point',
        coordinates: [-105.08789964641839, 39.764583702594784]
    },
    boulders_available: true,
    sport_routes_available: true,
    auto_belays_available: false,
}

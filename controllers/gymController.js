//////
// dependencies/imports
//////
const router = require("express").Router();
const Gym = require("../models/gym.model");
const Route = require("../models/gym.model")
const _ = require("lodash");
const faker = require("faker");
const haversine = require("haversine-distance");
const zipcodes = require("zipcodes");
const { find } = require("lodash");
//////
// routes index route
//////
router.get("/", async (req, res) => {
    try {
        let gyms = await Gym.find({});
        gyms = gyms.map(gym => {
            if (req.query.zipCode) {
                if (req.query.zipCode && req.query.zipCode.length === 5 && gym.location.length > 0) {
                    // ERROR HANDLING
                    const userLocation = zipcodes.lookup(req.query.zipCode);
                    if (userLocation) {
                        const distance = haversine(userLocation, gym.location[0].coordinates);
                        gym.distanceFromUser = _.round(getMilesFromMeters(distance));
                    }
                    if (!userLocation) {
                        gym.distanceFromUser = "Please Enter a Valid Zip Code"
                        console.error("Please Enter a Valid Zip Code")
                    }
                }
            } else if (!req.query.zipCode) {
                if (req.query.lat && req.query.long && gym.location.length > 0) {
                    const userLocation = { latitude: req.query.lat, longitude: req.query.long }
                    const distance = haversine(userLocation, gym.location[0].coordinates);
                    gym.distanceFromUser = _.round(getMilesFromMeters(distance))
                }
            }
            const climbingRoutes = gym.climbing_routes.map(route => {
                const grades = route.user_ticks.map(tick => {
                    // console.log(tick);
                    return tick.difficulty_grade;
                });
                // combine setter_grade value with grades array and produce average of all numbers in the new array.
                route.consensus_grade = _.round(_.mean(grades.concat(route.setter_grade))) || route.setter_grade;
                const ratings = route.user_ticks.map(tick => {
                    return tick.quality_rating;
                });
                route.consensus_rating = _.round(_.mean(ratings)) || "Not enough ratings for consensus";
                return route;
            });
            return gym;
        })
        res.json(gyms);
    } catch (error) {
        res.status(400).json(error);
    };
});
//////
// gyms delete route
//////
router.delete("/:id", async (req, res) => {
    try {
        res.json(await Gym.findByIdAndRemove(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
});
//////
// routes update route
//////
router.patch("/:id", async (req, res) => {
    try {
        res.json(
            await Gym.findByIdAndUpdate(req.params.id, req.body,
            )
        );
    } catch (error) {
        res.status(400).json(error);
    }
});
//////
// tick create route
//////
router.patch("/:gymId/climbing_routes/:routeId", async (req, res) => {
    try {
        // find gym by id
        let theGym = Gym.findById(req.params.gymId, (err, gym) => {
            // find route by id
            let theRoute = gym.climbing_routes.id(req.params.routeId)
            // add request body as new tick at beginning of user_ticks array 
            theRoute.user_ticks.unshift(req.body);
            gym.markModified('gym.climbing_routes.user_ticks')
            gym.save(function (error) {
                if (error) {
                    return (error)
                } else {
                    res.json(theRoute.user_ticks)
                }
            })
        })
    } catch (error) {
        res.send(error);
    }
})

//////
// ticks delete route
//////

router.patch("/:gymId/climbing_routes/:routeId/ticks/:tickId", async (req, res) => {
    try {
        let theGym = await Gym.findById(req.params.gymId, async (err, gym) => {
            let theRoute = await gym.climbing_routes.id(req.params.routeId)
            let ticksArray = theRoute.user_ticks
            ticksArray.splice(ticksArray.findIndex(tick => tick.id === req.params.tickId), 1)
            gym.markModified('gym.climbing_routes.user_ticks')
            gym.save(function (error) {
                if (error) {
                    return (error)
                } else {
                    res.json(theRoute.user_ticks)
                }
            })
        })
    } catch (error) {
        res.send(error);
    }
})

const getMilesFromMeters = (meters) => {
    return meters * 0.000621371192;
}
module.exports = router;